import {definitions,cityHousingSeries,parseFX,parseEVDS,observation,yearChange} from './data.mjs';
import {newsFeeds,refreshNews} from './news.mjs';

const json=(data,status=200,cache='public, max-age=300')=>Response.json(data,{status,headers:{'Cache-Control':cache,'X-Content-Type-Options':'nosniff'}});
async function fetchText(url,headers={}){const r=await fetch(url,{headers,signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('Upstream unavailable');return r.text()}
async function save(env,rows){if(!rows.length)throw Error('No valid observations');const now=new Date().toISOString();await env.DB.batch(rows.map(r=>env.DB.prepare('INSERT INTO observations(series,period,value,retrieved_at) VALUES(?,?,?,?) ON CONFLICT(series,period) DO UPDATE SET value=excluded.value,retrieved_at=excluded.retrieved_at').bind(r.series,r.period,r.value,now)))}
async function status(env,series,state){await env.DB.prepare('INSERT INTO source_status(series,state,attempted_at) VALUES(?,?,?) ON CONFLICT(series) DO UPDATE SET state=excluded.state,attempted_at=excluded.attempted_at').bind(series,state,new Date().toISOString()).run()}
async function refreshNewsTracked(env,notify=true){
 return refreshNews(env,{notify});
}
const fmt=d=>`${String(d.getUTCDate()).padStart(2,'0')}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${d.getUTCFullYear()}`;

async function fetchEVDS(env,code,series,frequency=5){
 if(!env.EVDS_API_KEY||!code)throw Error('EVDS not configured');
 if(!/^[A-Za-z0-9.]+$/.test(code))throw Error('Invalid series');
 const end=new Date(),start=new Date(Date.UTC(end.getUTCFullYear()-2,end.getUTCMonth(),1));
 const url=`https://evds3.tcmb.gov.tr/igmevdsms-dis/series=${code}&startDate=${fmt(start)}&endDate=${fmt(end)}&type=json&frequency=${frequency}`;
 return parseEVDS(JSON.parse(await fetchText(url,{key:env.EVDS_API_KEY})),code,series);
}

async function refreshSeries(env,series,code,frequency=5){
 try{await save(env,await fetchEVDS(env,code,series,frequency));await status(env,series,'available');return true}
 catch{await status(env,series,env.EVDS_API_KEY&&code?'error':'not_configured');return false}
}

export async function refresh(env){
 try{await save(env,parseFX(await fetchText(definitions.usd.url)));await status(env,'usd','available');await status(env,'eur','available')}catch{await status(env,'usd','error');await status(env,'eur','error')}
 await refreshSeries(env,'cpi',env.EVDS_CPI_SERIES);
 await refreshSeries(env,'housing',env.EVDS_HOUSING_SERIES);
 await refreshSeries(env,'deposit',env.EVDS_DEPOSIT_SERIES,3);
 for(const [slug,item] of Object.entries(cityHousingSeries))await refreshSeries(env,`housing:${slug}`,item.code);
}

async function cityMarket(env,slug){
 const item=cityHousingSeries[slug];if(!item)return null;
 const series=`housing:${slug}`;
 let {results=[]}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 400').bind(series).all();
 if(!results.length&&env.EVDS_API_KEY){await refreshSeries(env,series,item.code);({results=[]}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 400').bind(series).all())}
 const sourceStatus=await env.DB.prepare('SELECT state,attempted_at FROM source_status WHERE series=?').bind(series).first();
 const last=results[0];
 return {slug,region:item.region,value:last?.value??null,period:last?.period??null,retrievedAt:last?.retrieved_at??null,annualChange:yearChange(results),status:last?(sourceStatus?.state==='error'?'cached':'available'):(sourceStatus?.state||'unavailable'),source:'TCMB EVDS',sourceUrl:'https://evds3.tcmb.gov.tr/'};
}

async function citySales(env,slug){
 if(!Object.hasOwn(cityHousingSeries,slug))return null;
 const {results=[]}=await env.DB.prepare('SELECT period,total,mortgaged,first_sale firstSale,second_hand secondHand,retrieved_at retrievedAt FROM city_sales WHERE city_slug=? ORDER BY period DESC LIMIT 25').bind(slug).all();
 const latest=results[0];if(!latest)return {slug,status:'unavailable',source:'TÜİK',sourceUrl:'https://veriportali.tuik.gov.tr/tr/databrowser/tuik/categories/9/9_4/TR,DF_SATIS_SEKLI_DURUMU_ILILCE_V3,1.0'};
 const priorMonth=results[1],priorYear=results.find(row=>row.period===`${Number(latest.period.slice(0,4))-1}${latest.period.slice(4)}`),change=base=>base?.total>0?(latest.total/base.total-1)*100:null;
 return {...latest,slug,status:'available',monthlyChange:change(priorMonth),annualChange:change(priorYear),source:'TÜİK',sourceUrl:'https://veriportali.tuik.gov.tr/tr/databrowser/tuik/categories/9/9_4/TR,DF_SATIS_SEKLI_DURUMU_ILILCE_V3,1.0'};
}

async function listNews(env,url){
 const count=(await env.DB.prepare('SELECT COUNT(*) count FROM news').first())?.count||0;
 let {results:states=[]}=await env.DB.prepare("SELECT series,state,attempted_at attemptedAt FROM source_status WHERE series LIKE 'news:%'").all();
 const attempted=Math.max(0,...states.map(x=>new Date(x.attemptedAt).getTime()).filter(Number.isFinite)),stale=states.length<newsFeeds.length||!attempted||Date.now()-attempted>55*60*1000;
 let refreshResult=null;
 if(!count||stale){try{refreshResult=await refreshNewsTracked(env,true)}catch{}({results:states=[]}=await env.DB.prepare("SELECT series,state,attempted_at attemptedAt FROM source_status WHERE series LIKE 'news:%'").all())}
 const date=url.searchParams.get('date');
 const validDate=date&&/^\d{4}-\d{2}-\d{2}$/.test(date)?date:null;
 const source=url.searchParams.get('source'),validSource=newsFeeds.some(x=>x.id===source)?source:null,limit=Math.min(Math.max(Number.parseInt(url.searchParams.get('limit')||'100',10)||100,1),100),clauses=[],params=[];
 if(validDate){clauses.push('substr(published_at,1,10)=?');params.push(validDate)}
 if(validSource){clauses.push('source_name=?');params.push(newsFeeds.find(x=>x.id===validSource).name)}
 const query=`SELECT slug,title,summary,source_name sourceName,source_url sourceUrl,published_at publishedAt,category,image_url imageUrl FROM news${clauses.length?` WHERE ${clauses.join(' AND ')}`:''} ORDER BY published_at DESC LIMIT ?`;
 params.push(limit);
 const {results=[]}=await env.DB.prepare(query).bind(...params).all();
 const sources=newsFeeds.map(feed=>({id:feed.id,name:feed.name,...(states.find(x=>x.series===`news:${feed.id}`)||{state:'pending',attemptedAt:null})}));
 return {date:validDate,source:validSource,items:results,sources,refresh:refreshResult};
}

async function subscribe(request,env){
 let body;try{body=await request.json()}catch{return json({error:'Geçersiz istek'},400,'no-store')}
 const endpoint=String(body?.endpoint||''),p256dh=String(body?.keys?.p256dh||''),auth=String(body?.keys?.auth||'');
 if(!endpoint.startsWith('https://')||endpoint.length>2048||!p256dh||p256dh.length>512||!auth||auth.length>512)return json({error:'Geçersiz bildirim aboneliği'},400,'no-store');
 const now=new Date().toISOString();
 await env.DB.prepare('INSERT INTO push_subscriptions(endpoint,p256dh,auth,created_at,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(endpoint) DO UPDATE SET p256dh=excluded.p256dh,auth=excluded.auth,updated_at=excluded.updated_at').bind(endpoint,p256dh,auth,now,now).run();
 return json({ok:true},200,'no-store');
}

export default {
 async scheduled(event,env,ctx){
  const tasks=[];
  if(event.cron==='30 13 * * 1-5')tasks.push(refresh(env));
  if(event.cron==='0 5-20 * * *')tasks.push(refreshNewsTracked(env,true));
  ctx.waitUntil(Promise.allSettled(tasks));
 },
 async fetch(request,env){
  const url=new URL(request.url),path=url.pathname;
  const pushMutation=path==='/api/push/subscribe'&&(request.method==='POST'||request.method==='DELETE');
  if(request.method!=='GET'&&!pushMutation)return json({error:'Method not allowed'},405,'no-store');
  if(!env.DB)return json({status:'not_configured',error:'D1 binding missing'},503);
  try{
   if(path==='/api/push/subscribe'&&request.method==='POST')return subscribe(request,env);
   if(path==='/api/push/subscribe'&&request.method==='DELETE'){let body;try{body=await request.json()}catch{return json({error:'Geçersiz istek'},400,'no-store')}await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint=?').bind(String(body?.endpoint||'')).run();return json({ok:true},200,'no-store')}
   if(path==='/api/health'){await env.DB.prepare('SELECT 1 FROM observations LIMIT 1').first();const {results:newsSources=[]}=await env.DB.prepare("SELECT series,state,attempted_at attemptedAt FROM source_status WHERE series LIKE 'news:%'").all(),newsLatest=await env.DB.prepare('SELECT MAX(published_at) latestPublishedAt,MAX(created_at) lastImportedAt FROM news').first();return json({service:'KonutSeyir',status:'ok',configured:{fx:true,evds:!!env.EVDS_API_KEY,tuik:!!env.TUIK_API_KEY,news:true,push:!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY)},news:{sources:newsSources,...newsLatest},note:'Service health does not guarantee source freshness'})}
   if(path==='/api/push/config')return json({publicKey:env.VAPID_PUBLIC_KEY||null,configured:!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY)},200,'no-store');
   if(path==='/api/news')return json(await listNews(env,url));
   if(path.startsWith('/api/news/')){const slug=decodeURIComponent(path.slice('/api/news/'.length));const item=await env.DB.prepare('SELECT slug,title,summary,source_name sourceName,source_url sourceUrl,published_at publishedAt,category,image_url imageUrl FROM news WHERE slug=?').bind(slug).first();return item?json(item):json({error:'Haber bulunamadı'},404)}
   if(path==='/api/city-market'){const item=await cityMarket(env,url.searchParams.get('slug')||'');return item?json(item):json({error:'Bilinmeyen şehir'},404)}
   if(path==='/api/city-sales'){const item=await citySales(env,url.searchParams.get('slug')||'');return item?json(item):json({error:'Bilinmeyen şehir'},404)}
   if(path==='/api/history'){const series=url.searchParams.get('series');if(!Object.hasOwn(definitions,series))return json({error:'Unknown series'},400);const {results}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 60').bind(series).all();return json({series,source:definitions[series],observations:results.reverse()})}
   if(path==='/api/market-data'){const data=[];for(const series of Object.keys(definitions)){const {results}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 400').bind(series).all();const s=await env.DB.prepare('SELECT state,attempted_at FROM source_status WHERE series=?').bind(series).first();data.push(observation(series,results,s))}return json({generatedAt:new Date().toISOString(),data})}
   return json({error:'Not found'},404);
  }catch{return json({status:'unavailable',error:'Data store unavailable'},503,'no-store')}
 }
};
