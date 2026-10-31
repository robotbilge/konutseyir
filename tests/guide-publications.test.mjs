import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import webpush from 'web-push';
const vapid=webpush.generateVAPIDKeys();
import {guideOrigin,validateGuideManifest,randomGuidePublicationAt} from '../lib/guide-publication.mjs';
import {syncGuidePublications,drainGuidePush,guidePublicationRequest} from '../worker/guide-publications.mjs';

const now='2026-11-01T10:00:00.000Z',old={path:'/rehber/eski-yazi/',title:'Eski rehber',summary:'Eski içerik'},fresh={path:'/rehber/yeni-yazi/',title:'Yeni rehber',summary:'Yeni özgün içerik'};
function database(){
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec(readFileSync('migrations/0002_news_push.sql','utf8'));
 sqlite.exec(readFileSync('migrations/0007_guide_publications.sql','utf8'));
 const DB={prepare(sql){const statement=sqlite.prepare(sql);let params=[];const wrap={bind(...args){params=args;return wrap},async first(){return statement.get(...params)||null},async all(){return {results:statement.all(...params)}},async run(){const r=statement.run(...params);return {meta:{changes:r.changes}}}};return wrap},async batch(statements){sqlite.exec('BEGIN');try{const results=[];for(const s of statements)results.push(await s.run());sqlite.exec('COMMIT');return results}catch(e){sqlite.exec('ROLLBACK');throw e}}};
 return {DB,sqlite};
}
function live(guides,{badArticle=false,badIndex=false,buildId=now}={}){return async url=>{
 if(url===guideOrigin+'/guide-publications.json')return Response.json({version:1,buildId,guides});
 if(url===guideOrigin+'/rehber/')return new Response(badIndex?'':guides.map(g=>`<a href="${g.path.slice(0,-1)}">${g.title}</a>`).join(''));
 const guide=guides.find(g=>url===guideOrigin+g.path);
 return guide?new Response(badArticle?'<h1>Not deployed</h1>':`<title>${guide.title}</title><link rel="canonical" href="${url}"/><script>{"@type":"Article"}</script><h1>${guide.title}</h1>`):new Response('',{status:404});
}}
async function setup(){const db=database();await db.DB.prepare('INSERT INTO push_subscriptions VALUES(?,?,?,?,?)').bind('https://push.test/sub','key','auth','2026-10-01','2026-10-01').run();const env={DB:db.DB,VAPID_PUBLIC_KEY:vapid.publicKey,VAPID_PRIVATE_KEY:vapid.privateKey,NEWS_ADMIN_PASSWORD:'password'};await syncGuidePublications(env,{now,fetcher:live([old])});return {...db,env}}

test('first deployment baselines old guides without notifying subscribers',async()=>{
 const {env,sqlite}=await setup();let calls=0;
 const result=await drainGuidePush(env,{now,send:async()=>{calls++}});
 assert.equal(result.sent,0);assert.equal(calls,0);assert.equal(sqlite.prepare('SELECT baseline FROM guide_publications').get().baseline,1);
});
test('verified new guide sends its own URL once; redeploys and edits do not repeat',async()=>{
 const {env}=await setup();await syncGuidePublications(env,{now,fetcher:live([old,fresh])});const payloads=[];
 const send=async(_,payload)=>payloads.push(JSON.parse(payload));
 assert.equal((await drainGuidePush(env,{now,send})).sent,1);
 await syncGuidePublications(env,{now,fetcher:live([old,{...fresh,title:'Updated title'}])});
 assert.equal((await drainGuidePush(env,{now,send})).sent,0);
 assert.equal(payloads.length,1);assert.equal(payloads[0].url,fresh.path);assert.equal(payloads[0].tag,'guide-yeni-yazi');
});
test('concurrent drains claim each subscriber only once',async()=>{
 const {env}=await setup();await syncGuidePublications(env,{now,fetcher:live([old,fresh])});let calls=0;
 await Promise.all([drainGuidePush(env,{now,send:async()=>{calls++}}),drainGuidePush(env,{now,send:async()=>{calls++}})]);
 assert.equal(calls,1);
});
test('fanout is bounded and remaining subscribers are drained without duplicate delivery',async()=>{
 const {env}=await setup();
 for(let i=0;i<10;i++)await env.DB.prepare('INSERT INTO push_subscriptions VALUES(?,?,?,?,?)').bind(`https://push.test/sub-${i}`,'key','auth','2026-10-01','2026-10-01').run();
 await syncGuidePublications(env,{now,fetcher:live([old,fresh])});
 const delivered=new Set(),send=async sub=>{assert.ok(!delivered.has(sub.endpoint));delivered.add(sub.endpoint)};
 const first=await drainGuidePush(env,{now,send});assert.equal(first.sent,10);assert.equal(first.pending,1);
 const second=await drainGuidePush(env,{now,send});assert.equal(second.sent,1);assert.equal(second.pending,0);assert.equal(delivered.size,11);
});
test('permanent failures and exhausted retries remain visible to the deployment verifier',async()=>{
 const {env}=await setup();await syncGuidePublications(env,{now,fetcher:live([old,fresh])});
 const result=await drainGuidePush(env,{now,send:async()=>{throw {statusCode:400}}});
 assert.equal(result.undelivered,1);
 assert.equal((await drainGuidePush(env,{now,send:async()=>assert.fail('permanent retry')})).undelivered,1);
});
test('missing live article or list card prevents enqueue',async()=>{
 for(const option of [{badArticle:true},{badIndex:true}]){
  const {env,sqlite}=await setup();await assert.rejects(syncGuidePublications(env,{now,fetcher:live([old,fresh],option)}));
  assert.equal(sqlite.prepare('SELECT COUNT(*) n FROM guide_push_deliveries').get().n,0);
 }
});
test('stale deployment manifest cannot trigger push',async()=>{
 const {env}=await setup();await assert.rejects(syncGuidePublications(env,{now,expectedBuildId:'2026-11-02T00:00:00.000Z',fetcher:live([old,fresh])}),/deployment_not_live/);
});
test('invalid manifests reject duplicate paths, off-site URLs and empty collections',()=>{
 for(const guides of [[],[old,old],[{...fresh,path:'https://evil.test/rehber/a/'}],[{...fresh,path:'/rehber/../a/'}]])assert.throws(()=>validateGuideManifest({version:1,buildId:now,guides}));
});
test('temporary push errors retry after a lease; a successful retry is not replayed',async()=>{
 const {env}=await setup();await syncGuidePublications(env,{now,fetcher:live([old,fresh])});
 assert.equal((await drainGuidePush(env,{now,send:async()=>{throw {statusCode:503}}})).failed,1);
 assert.equal((await drainGuidePush(env,{now,send:async()=>assert.fail('lease ignored')})).sent,0);
 const later='2026-11-01T10:06:00.000Z';
 assert.equal((await drainGuidePush(env,{now:later,send:async()=>{}})).sent,1);
 assert.equal((await drainGuidePush(env,{now:later,send:async()=>assert.fail('duplicate')})).sent,0);
});
test('expired subscriptions are removed; late subscribers do not receive old publications',async()=>{
 const {env,sqlite}=await setup();await syncGuidePublications(env,{now,fetcher:live([old,fresh])});
 await drainGuidePush(env,{now,send:async()=>{throw {statusCode:410}}});
 assert.equal(sqlite.prepare('SELECT COUNT(*) n FROM push_subscriptions').get().n,0);
 await env.DB.prepare('INSERT INTO push_subscriptions VALUES(?,?,?,?,?)').bind('https://push.test/new','key','auth','2026-11-01T10:01:00.000Z',now).run();
 await syncGuidePublications(env,{now:'2026-11-01T10:02:00.000Z',fetcher:live([old,fresh])});
 assert.equal((await drainGuidePush(env,{now,send:async()=>assert.fail('old article')})).sent,0);
});
test('delivery records expire after six hours; missing VAPID keys never claim success',async()=>{
 const {env,sqlite}=await setup();await syncGuidePublications(env,{now,fetcher:live([old,fresh])});
 assert.equal((await drainGuidePush({...env,VAPID_PRIVATE_KEY:''},{now})).configured,false);
 await drainGuidePush(env,{now:'2026-11-01T16:01:00.000Z',send:async()=>assert.fail('expired')});
 assert.equal(sqlite.prepare('SELECT COUNT(*) n FROM guide_push_deliveries').get().n,0);
});
test('publication endpoint requires authentication, POST and a matching deployment ID',async()=>{
 const {env}=await setup();
 const req=(method,password,body)=>new Request(guideOrigin+'/api/admin/guide-publications',{method,headers:{'X-Admin-Password':password},...(method==='POST'?{body:JSON.stringify(body)}:{})});
 assert.equal((await guidePublicationRequest(req('GET','password'),env)).status,405);
 assert.equal((await guidePublicationRequest(req('POST','wrong',{}),env)).status,401);
 assert.equal((await guidePublicationRequest(req('POST','password',{}),env)).status,400);
 const response=await guidePublicationRequest(req('POST','password',{buildId:now}),env,{now,fetcher:live([old,fresh]),send:async()=>{}});
 assert.equal(response.status,200);assert.equal((await response.json()).push.sent,1);
});
test('random publication minute covers 09:00–17:59 Istanbul including day/year boundaries',()=>{
 assert.equal(randomGuidePublicationAt('2026-12-31',()=>0),'2026-12-31T06:00:00.000Z');
 assert.equal(randomGuidePublicationAt('2026-12-31',()=>539),'2026-12-31T14:59:00.000Z');
 for(let minute=0;minute<540;minute++){
  const value=new Date(randomGuidePublicationAt('2026-11-01',()=>minute));
  assert.ok(value.getUTCHours()>=6&&value.getUTCHours()<15);
 }
 assert.throws(()=>randomGuidePublicationAt('2026-02-30',()=>0));assert.throws(()=>randomGuidePublicationAt('2026-01-01',()=>540));
});
test('built publication manifest matches real guide routes and deployment notification runs last',()=>{
 const manifest=validateGuideManifest(JSON.parse(readFileSync('dist/guide-publications.json','utf8')));
 for(const g of manifest.guides){const html=readFileSync('dist'+g.path+'index.html','utf8');assert.ok(html.includes(`<title>${g.title.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')}</title>`))}
 const workflow=readFileSync('.github/workflows/deploy.yml','utf8');assert.ok(workflow.indexOf('node scripts/notify-guide-publications.mjs')>workflow.indexOf('wrangler pages deploy'));
});
test('guide retries reuse an existing cron slot and preserve the original hourly feed window',async()=>{
 const config=JSON.parse(readFileSync('worker/wrangler.jsonc','utf8'));
 assert.deepEqual(config.triggers.crons,['30 13 * * 1-5','*/5 * * * *']);
 const {default:worker}=await import('../worker/index.mjs');
 // Empty D1 tables allow the guide drain; feed attempts are visible via source status writes.
 const env={DB:{prepare(){const statement={bind(){return statement},first:async()=>null,all:async()=>({results:[]}),run:async()=>({meta:{changes:0}})};return statement}}};
 // Five-minute ticks outside the original hourly news times must not fetch any sources.
 const originalFetch=globalThis.fetch;let fetches=0;
 globalThis.fetch=async()=>{fetches++;throw Error('Unexpected feed request')};
 try{
  for(const time of ['2026-11-01T05:05:00Z','2026-11-01T21:00:00Z']){
   const tasks=[];await worker.scheduled({cron:'*/5 * * * *',scheduledTime:Date.parse(time)},env,{waitUntil:p=>tasks.push(p)});await Promise.all(tasks);
  }
  assert.equal(fetches,0);
 }finally{globalThis.fetch=originalFetch}
});
