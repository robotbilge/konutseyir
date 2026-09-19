import {definitions,parseFX,parseEVDS,observation} from './data.mjs';
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'public, max-age=300','X-Content-Type-Options':'nosniff'}});
async function fetchText(url,headers={}){const r=await fetch(url,{headers,signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('Upstream unavailable');return r.text()}
async function save(env,rows){if(!rows.length)throw Error('No valid observations');const now=new Date().toISOString();await env.DB.batch(rows.map(r=>env.DB.prepare('INSERT INTO observations(series,period,value,retrieved_at) VALUES(?,?,?,?) ON CONFLICT(series,period) DO UPDATE SET value=excluded.value,retrieved_at=excluded.retrieved_at').bind(r.series,r.period,r.value,now)))}
async function status(env,series,state){await env.DB.prepare('INSERT INTO source_status(series,state,attempted_at) VALUES(?,?,?) ON CONFLICT(series) DO UPDATE SET state=excluded.state,attempted_at=excluded.attempted_at').bind(series,state,new Date().toISOString()).run()}
export async function refresh(env){
 try{await save(env,parseFX(await fetchText(definitions.usd.url)));await status(env,'usd','available');await status(env,'eur','available')}catch{await status(env,'usd','error');await status(env,'eur','error')}
 for(const series of ['cpi','housing','deposit']){const code=env[`EVDS_${series.toUpperCase()}_SERIES`];if(!env.EVDS_API_KEY||!code){await status(env,series,'not_configured');continue}
 try{if(!/^[A-Za-z0-9.]+$/.test(code))throw Error('Invalid series');const end=new Date(),start=new Date(Date.UTC(end.getUTCFullYear()-2,end.getUTCMonth(),1)),fmt=d=>`${String(d.getUTCDate()).padStart(2,'0')}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${d.getUTCFullYear()}`;
 // EVDS3 requires the user-specific API key in the HTTP request header.
 const frequency=series==='deposit'?3:5;
 const url=`https://evds3.tcmb.gov.tr/igmevdsms-dis/series=${code}&startDate=${fmt(start)}&endDate=${fmt(end)}&type=json&frequency=${frequency}`;
 await save(env,parseEVDS(JSON.parse(await fetchText(url,{key:env.EVDS_API_KEY})),code,series));await status(env,series,'available')
 }catch{await status(env,series,'error')}}
}
export default {async scheduled(event,env,ctx){ctx.waitUntil(refresh(env))},async fetch(request,env){const url=new URL(request.url);if(request.method!=='GET')return json({error:'Method not allowed'},405);if(!['/api/health','/api/market-data','/api/history'].includes(url.pathname))return json({error:'Not found'},404);if(!env.DB)return json({status:'not_configured',error:'D1 binding missing'},503);
 try{if(url.pathname==='/api/health'){await env.DB.prepare('SELECT 1 FROM observations LIMIT 1').first();return json({service:'KonutSeyir',status:'ok',configured:{fx:true,evds:!!env.EVDS_API_KEY},note:'Service health does not guarantee source freshness'})}
 if(url.pathname==='/api/history'){const series=url.searchParams.get('series');if(!Object.hasOwn(definitions,series))return json({error:'Unknown series'},400);const {results}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 60').bind(series).all();return json({series,source:definitions[series],observations:results.reverse()})}
 const data=[];for(const series of Object.keys(definitions)){const {results}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 400').bind(series).all();const s=await env.DB.prepare('SELECT state,attempted_at FROM source_status WHERE series=?').bind(series).first();data.push(observation(series,results,s))}return json({generatedAt:new Date().toISOString(),data})
 }catch{return json({status:'unavailable',error:'Data store unavailable'},503)}}};
