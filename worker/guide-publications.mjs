import webpush from 'web-push';
import {guideOrigin,guideManifestPath,validateGuideManifest} from '../lib/guide-publication.mjs';

const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const esc=text=>text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const equal=(a,b)=>{if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0};
async function liveText(path,fetcher){
 // Workers supports manual/follow, but rejects redirect:'error' before fetching.
 // Manual mode plus the status check fails closed on redirects without following them.
 const response=await fetcher(guideOrigin+path,{redirect:'manual',cache:'no-store',signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error('guide_not_live');
 return response.text();
}

export async function syncGuidePublications(env,{expectedBuildId,fetcher=fetch,now=new Date().toISOString()}={}){
 const manifest=validateGuideManifest(JSON.parse(await liveText(guideManifestPath,fetcher)));
 if(expectedBuildId&&manifest.buildId!==expectedBuildId)throw Error('guide_deployment_not_live');
 const index=await liveText('/rehber/',fetcher);
 for(const guide of manifest.guides){if(!index.includes(`href="${guide.path}"`)&&!index.includes(`href="${guide.path.slice(0,-1)}"`))throw Error('guide_missing_from_index')}
 const state=await env.DB.prepare('SELECT id FROM guide_publication_state WHERE id=1').first();
 if(!state){
  // Initialize atomically: old articles are recorded without broadcasting them.
  await env.DB.batch([
   ...manifest.guides.map(g=>env.DB.prepare('INSERT OR IGNORE INTO guide_publications(path,title,summary,seen_at,baseline) VALUES(?,?,?,?,1)').bind(g.path,g.title,g.summary,now)),
   env.DB.prepare('INSERT OR IGNORE INTO guide_publication_state(id,initialized_at,build_id,checked_at) VALUES(1,?,?,?)').bind(now,manifest.buildId,now)
  ]);
  return {initialized:true,newGuides:0,baseline:manifest.guides.length};
 }
 const known=new Set(((await env.DB.prepare('SELECT path FROM guide_publications').all()).results||[]).map(g=>g.path));
 const fresh=manifest.guides.filter(g=>!known.has(g.path));
 // A manifest/card alone is insufficient: verify each real article first.
 for(const guide of fresh){
  const html=await liveText(guide.path,fetcher);
  if(!html.includes(`<link rel="canonical" href="${guideOrigin+guide.path}"`)||!html.includes(`<title>${esc(guide.title)}</title>`)||!html.includes('"@type":"Article"')||!/<h1[ >]/.test(html)||/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html))throw Error('guide_page_not_verified');
 }
 if(fresh.length)await env.DB.batch(fresh.map(g=>env.DB.prepare('INSERT OR IGNORE INTO guide_publications(path,title,summary,seen_at,baseline) VALUES(?,?,?,?,0)').bind(g.path,g.title,g.summary,now)));
 // INSERT OR IGNORE makes re-deploys and concurrent calls idempotent.
 await env.DB.prepare("INSERT OR IGNORE INTO guide_push_deliveries(path,endpoint) SELECT g.path,s.endpoint FROM guide_publications g CROSS JOIN push_subscriptions s WHERE g.baseline=0 AND g.seen_at>=? AND s.created_at<=g.seen_at").bind(new Date(Date.parse(now)-6*3600000).toISOString()).run();
 await env.DB.prepare('UPDATE guide_publication_state SET build_id=?,checked_at=? WHERE id=1').bind(manifest.buildId,now).run();
 return {initialized:false,newGuides:fresh.length};
}

export async function drainGuidePush(env,{now=new Date().toISOString(),send=webpush.sendNotification.bind(webpush)}={}){
 if(!env.VAPID_PUBLIC_KEY||!env.VAPID_PRIVATE_KEY)return {configured:false,sent:0,failed:0};
 webpush.setVapidDetails('mailto:bildirim@konutseyir.com',env.VAPID_PUBLIC_KEY,env.VAPID_PRIVATE_KEY);
 const cutoff=new Date(Date.parse(now)-6*3600000).toISOString(),lease=new Date(Date.parse(now)-5*60000).toISOString();
 await env.DB.prepare("DELETE FROM guide_push_deliveries WHERE path IN (SELECT path FROM guide_publications WHERE seen_at<?)").bind(cutoff).run();
 const rows=(await env.DB.prepare("SELECT d.path,d.endpoint,g.title,g.summary,s.p256dh,s.auth FROM guide_push_deliveries d JOIN guide_publications g ON g.path=d.path JOIN push_subscriptions s ON s.endpoint=d.endpoint WHERE d.state IN ('pending','sending') AND d.attempts<3 AND (d.attempted_at IS NULL OR d.attempted_at<?) ORDER BY g.seen_at LIMIT 10").bind(lease).all()).results||[];
 let sent=0,failed=0;
 // Small batches bound network concurrency and Worker memory use.
 for(let offset=0;offset<rows.length;offset+=5)await Promise.all(rows.slice(offset,offset+5).map(async row=>{
  const claim=await env.DB.prepare("UPDATE guide_push_deliveries SET state='sending',attempts=attempts+1,attempted_at=? WHERE path=? AND endpoint=? AND state IN ('pending','sending') AND attempts<3 AND (attempted_at IS NULL OR attempted_at<?)").bind(now,row.path,row.endpoint,lease).run();
  if(!claim.meta?.changes)return;
  const payload=JSON.stringify({title:row.title.replace(/ \| KonutSeyir$/,''),body:`Yeni konut rehberi · ${row.summary}`.slice(0,240),url:row.path,tag:`guide-${row.path.split('/')[2]}`});
  try{
   await send({endpoint:row.endpoint,keys:{p256dh:row.p256dh,auth:row.auth}},payload,{TTL:21600,urgency:'normal',timeout:10000});
   await env.DB.prepare("UPDATE guide_push_deliveries SET state='sent' WHERE path=? AND endpoint=?").bind(row.path,row.endpoint).run();sent++;
  }catch(error){
   failed++;
   if(error?.statusCode===404||error?.statusCode===410){
    await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint=?').bind(row.endpoint).run();
    await env.DB.prepare('DELETE FROM guide_push_deliveries WHERE endpoint=?').bind(row.endpoint).run();
   }else await env.DB.prepare("UPDATE guide_push_deliveries SET state=? WHERE path=? AND endpoint=?").bind(!error?.statusCode||error.statusCode===429||error.statusCode>=500?'pending':'failed',row.path,row.endpoint).run();
  }
 }));
 const pending=await env.DB.prepare("SELECT COUNT(*) count FROM guide_push_deliveries WHERE state IN ('pending','sending') AND attempts<3").first();
 const unsuccessful=await env.DB.prepare("SELECT COUNT(*) count FROM guide_push_deliveries WHERE state='failed' OR (state!='sent' AND attempts>=3)").first();
 return {configured:true,sent,failed,pending:Number(pending?.count)||0,undelivered:Number(unsuccessful?.count)||0};
}

export async function guidePublicationRequest(request,env,deps={}){
 if(request.method!=='POST')return json({error:'Method not allowed'},405);
 if(!env.NEWS_ADMIN_PASSWORD||!env.DB)return json({error:'guide_publication_not_configured'},503);
 const supplied=request.headers.get('X-Admin-Password')||'';
 if(!equal(supplied,String(env.NEWS_ADMIN_PASSWORD)))return json({error:'unauthorized'},401);
 try{
  if(Number(request.headers.get('Content-Length'))>1024)return json({error:'invalid_request'},400);
  const text=await request.text();if(text.length>1024)return json({error:'invalid_request'},400);
  let body;try{body=JSON.parse(text)}catch{return json({error:'invalid_request'},400)}
  if(typeof body.buildId!=='string'||body.buildId.length>80)return json({error:'invalid_build_id'},400);
  const publication=await syncGuidePublications(env,{...deps,expectedBuildId:body.buildId});
  const push=await drainGuidePush(env,deps);
  return json({ok:true,...publication,push},push.configured&&push.failed===0&&push.pending===0&&push.undelivered===0?200:503);
 }catch(error){
  const message=String(error?.message||''),known=['invalid_guide_manifest','guide_not_live','guide_deployment_not_live','guide_missing_from_index','guide_page_not_verified'];
  const errorCode=known.includes(message)?message:/D1_READ_LIMIT/.test(message)?'database_read_limit':/no such table/i.test(message)?'guide_schema_unavailable':/vapid/i.test(message)?'push_keys_invalid':/1042|loop/i.test(message)?'guide_fetch_routing_error':'guide_publication_internal_error';
  console.error('Guide publication failed',message||'unknown');return json({error:'guide_publication_unavailable',errorCode},503);
 }
}
