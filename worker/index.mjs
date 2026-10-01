import {definitions,cityHousingSeries,goldPrice,parseFX,parseEVDS,observation,yearChange} from './data.mjs';
import {selectorConfig,getProvider,parseListingData,extractHtml,analyzeListing,fetchListing} from './listing-analyzer.mjs';
import {isRelevantNews,newsFeeds,refreshNews,refreshEmlakKonut} from './news.mjs';
import {discoverGroups,resolveProvinceSeries,parseQuarterlyObservations,calculateTcmc,validateListingInput,readEvdsJson} from './tcmb-listing.mjs';

const json=(data,status=200,cache='public, max-age=300')=>Response.json(data,{status,headers:{'Cache-Control':cache,'X-Content-Type-Options':'nosniff'}});
async function fetchText(url,headers={}){const r=await fetch(url,{headers,signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('Upstream unavailable');return r.text()}
async function save(env,rows){if(!rows.length)throw Error('No valid observations');const now=new Date().toISOString();await env.DB.batch(rows.map(r=>env.DB.prepare('INSERT INTO observations(series,period,value,retrieved_at) VALUES(?,?,?,?) ON CONFLICT(series,period) DO UPDATE SET value=excluded.value,retrieved_at=excluded.retrieved_at').bind(r.series,r.period,r.value,now)))}
async function status(env,series,state){await env.DB.prepare('INSERT INTO source_status(series,state,attempted_at) VALUES(?,?,?) ON CONFLICT(series) DO UPDATE SET state=excluded.state,attempted_at=excluded.attempted_at').bind(series,state,new Date().toISOString()).run()}
async function refreshNewsTracked(env,notify=true){
 return refreshNews(env,{notify});
}
const fmt=d=>`${String(d.getUTCDate()).padStart(2,'0')}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${d.getUTCFullYear()}`;

async function fetchEVDS(env,code,series,frequency=5){
 if(!tcmbKey(env)||!code)throw Error('EVDS not configured');
 if(!/^[A-Za-z0-9.]+$/.test(code))throw Error('Invalid series');
 const end=new Date(),start=new Date(Date.UTC(end.getUTCFullYear()-2,end.getUTCMonth(),1));
 const url=`https://evds3.tcmb.gov.tr/igmevdsms-dis/series=${code}&startDate=${fmt(start)}&endDate=${fmt(end)}&type=json&frequency=${frequency}`;
 return parseEVDS(JSON.parse(await fetchText(url,{key:tcmbKey(env)})),code,series);
}

async function refreshSeries(env,series,code,frequency=5){
 try{await save(env,await fetchEVDS(env,code,series,frequency));await status(env,series,'available');return true}
 catch{await status(env,series,tcmbKey(env)&&code?'error':'not_configured');return false}
}

export async function refresh(env){
 try{await save(env,parseFX(await fetchText(definitions.usd.url)));await status(env,'usd','available');await status(env,'eur','available')}catch{await status(env,'usd','error');await status(env,'eur','error')}
 await refreshSeries(env,'cpi',env.EVDS_CPI_SERIES);
 await refreshSeries(env,'housing',env.EVDS_HOUSING_SERIES);
 await refreshSeries(env,'deposit',env.EVDS_DEPOSIT_SERIES,3);
 await refreshSeries(env,'deposit1m',env.EVDS_DEPOSIT_1M_SERIES,3);
 await refreshSeries(env,'policy',env.EVDS_POLICY_SERIES,1);
 for(const [slug,item] of Object.entries(cityHousingSeries))await refreshSeries(env,`housing:${slug}`,item.code);
}

async function cityMarket(env,slug){
 const item=cityHousingSeries[slug];if(!item)return null;
 const series=`housing:${slug}`;
 let {results=[]}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 400').bind(series).all();
 if(!results.length&&tcmbKey(env)){await refreshSeries(env,series,item.code);({results=[]}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 400').bind(series).all())}
 const sourceStatus=await env.DB.prepare('SELECT state,attempted_at FROM source_status WHERE series=?').bind(series).first();
 const last=results[0];
 return {slug,region:item.region,value:last?.value??null,period:last?.period??null,retrievedAt:last?.retrieved_at??null,annualChange:yearChange(results),history:results.slice(0,24).reverse().map(row=>({period:row.period,value:row.value})),status:last?(sourceStatus?.state==='error'?'cached':'available'):(sourceStatus?.state||'unavailable'),source:'TCMB EVDS',sourceUrl:'https://evds3.tcmb.gov.tr/'};
}

async function citySales(env,slug){
 if(!Object.hasOwn(cityHousingSeries,slug))return null;
 const {results=[]}=await env.DB.prepare('SELECT period,total,mortgaged,first_sale firstSale,second_hand secondHand,retrieved_at retrievedAt FROM city_sales WHERE city_slug=? ORDER BY period DESC LIMIT 25').bind(slug).all();
 const latest=results[0];if(!latest)return {slug,status:'unavailable',source:'TÜİK',sourceUrl:'https://veriportali.tuik.gov.tr/tr/databrowser/tuik/categories/9/9_4/TR,DF_SATIS_SEKLI_DURUMU_ILILCE_V3,1.0'};
 const priorMonth=results[1],priorYear=results.find(row=>row.period===`${Number(latest.period.slice(0,4))-1}${latest.period.slice(4)}`),change=base=>base?.total>0?(latest.total/base.total-1)*100:null;
 return {...latest,slug,status:'available',monthlyChange:change(priorMonth),annualChange:change(priorYear),history:results.slice(0,13).reverse().map(row=>({period:row.period,total:row.total,mortgaged:row.mortgaged,firstSale:row.firstSale,secondHand:row.secondHand})),source:'TÜİK',sourceUrl:'https://veriportali.tuik.gov.tr/tr/databrowser/tuik/categories/9/9_4/TR,DF_SATIS_SEKLI_DURUMU_ILILCE_V3,1.0'};
}

async function districtSalesRanking(env,city,requestedLimit=20){
 const allowed=new Set(['istanbul','ankara','izmir','adana','antalya','bursa','kocaeli','konya','gaziantep','trabzon','balikesir','mugla']);if(!allowed.has(city))return null;
 const limit=Math.max(1,Math.min(50,Number(requestedLimit)||20));
 try{const {results=[]}=await env.DB.prepare('SELECT district_name districtName,period,total FROM district_sales WHERE city_slug=? AND period=(SELECT MAX(period) FROM district_sales WHERE city_slug=?) ORDER BY total DESC LIMIT ?').bind(city,city,limit).all();return {city,period:results[0]?.period??null,items:results,status:results.length?'available':'unavailable',source:'TÜİK',sourceUrl:'https://veriportali.tuik.gov.tr/'};}catch(error){console.error('district-sales query failed',error);return {city,period:null,items:[],status:'error',message:'İlçe satış verisi sorgulanamadı.',source:'TÜİK',sourceUrl:'https://veriportali.tuik.gov.tr/'};}
}

async function listNews(env,url){
 const count=(await env.DB.prepare('SELECT COUNT(*) count FROM news').first())?.count||0;
 let {results:states=[]}=await env.DB.prepare("SELECT series,state,attempted_at attemptedAt FROM source_status WHERE series LIKE 'news:%'").all();
 const attempted=Math.max(0,...states.filter(x=>x.series!=='news:emlak-konut-kap').map(x=>new Date(x.attemptedAt).getTime()).filter(Number.isFinite)),regularNewsCount=newsFeeds.filter(feed=>!feed.scheduledOnly).length,stale=states.filter(x=>x.series!=='news:emlak-konut-kap').length<regularNewsCount||!attempted||Date.now()-attempted>55*60*1000;
 let refreshResult=null;
 if(!count||stale){try{refreshResult=await refreshNewsTracked(env,true)}catch{}({results:states=[]}=await env.DB.prepare("SELECT series,state,attempted_at attemptedAt FROM source_status WHERE series LIKE 'news:%'").all())}
 const date=url.searchParams.get('date');
 const validDate=date&&/^\d{4}-\d{2}-\d{2}$/.test(date)?date:null;
 const source=url.searchParams.get('source'),validSource=newsFeeds.some(x=>x.id===source)?source:null,limit=Math.min(Math.max(Number.parseInt(url.searchParams.get('limit')||'100',10)||100,1),100),clauses=[],params=[];
 if(validDate){clauses.push('substr(published_at,1,10)=?');params.push(validDate)}
 if(validSource){clauses.push('source_name=?');params.push(newsFeeds.find(x=>x.id===validSource).name)}
 const query=`SELECT slug,title,summary,source_name sourceName,source_url sourceUrl,published_at publishedAt,category,NULL imageUrl FROM news${clauses.length?` WHERE ${clauses.join(' AND ')}`:''} ORDER BY published_at DESC LIMIT ?`;
 params.push(Math.min(limit*4,400));
 const {results=[]}=await env.DB.prepare(query).bind(...params).all(),filteredSourceNames=new Set(newsFeeds.filter(feed=>feed.filter).map(feed=>feed.name)),items=results.filter(item=>!filteredSourceNames.has(item.sourceName)||isRelevantNews(item)).slice(0,limit);
 const sources=newsFeeds.map(feed=>({id:feed.id,name:feed.name,...(states.find(x=>x.series===`news:${feed.id}`)||{state:'pending',attemptedAt:null})}));
 return {date:validDate,source:validSource,items,sources,refresh:refreshResult};
}

async function subscribe(request,env){
 let body;try{body=await request.json()}catch{return json({error:'Geçersiz istek'},400,'no-store')}
 const endpoint=String(body?.endpoint||''),p256dh=String(body?.keys?.p256dh||''),auth=String(body?.keys?.auth||'');
 if(!endpoint.startsWith('https://')||endpoint.length>2048||!p256dh||p256dh.length>512||!auth||auth.length>512)return json({error:'Geçersiz bildirim aboneliği'},400,'no-store');
 const now=new Date().toISOString();
 await env.DB.prepare('INSERT INTO push_subscriptions(endpoint,p256dh,auth,created_at,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(endpoint) DO UPDATE SET p256dh=excluded.p256dh,auth=excluded.auth,updated_at=excluded.updated_at').bind(endpoint,p256dh,auth,now,now).run();
 return json({ok:true},200,'no-store');
}

function corsOrigin(request){
 const origin=request.headers.get("Origin")||"";
 if(origin==="https://konutseyir.com"||origin==="https://www.konutseyir.com"||/^chrome-extension:\/\/[a-p]{32}$/.test(origin))return origin;
 return null;
}
function corsify(response,request){
 const origin=corsOrigin(request);
 if(!origin)return response;
 const headers=new Headers(response.headers);
 headers.set("Access-Control-Allow-Origin",origin);
 headers.set("Access-Control-Allow-Methods","GET, POST, OPTIONS");
 headers.set("Access-Control-Allow-Headers","Content-Type");
 headers.set("Vary","Origin");
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
function calculatorLink(listing){
 const params=new URLSearchParams();
 if(listing.price)params.set("price",String(Math.round(listing.price)));
 if(listing.area)params.set("area",String(Math.round(listing.area)));
 if(listing.monthlyRent)params.set("rent",String(Math.round(listing.monthlyRent)));
 return "https://konutseyir.com/?"+params.toString()+"#analiz";
}
async function analyzeRequest(request){
 if(Number(request.headers.get("Content-Length")||0)>20000)return json({error:"İstek boyutu çok büyük."},413,"no-store");
 let body;
 try{body=await request.json()}catch{return json({error:"Geçersiz JSON isteği."},400,"no-store")}
 const target=typeof body?.url==="string"?body.url:"";
 const provider=getProvider(target);
 if(!provider)return json({error:"Yalnızca desteklenen ilan sitelerinin HTTPS bağlantıları analiz edilebilir."},400,"no-store");
 let listing=parseListingData(body.listingData);
 let fetchState="not_requested";
 if(!body?.listingData){
  try{
   const html=await fetchListing(target);
   const serverData=await extractHtml(html,provider);
   const merged={...serverData};
   for(const [key,value] of Object.entries(listing))if(value!==null&&value!==undefined)merged[key]=value;
   listing=parseListingData(merged);
   fetchState="fetched";
  }catch(error){
   fetchState=error?.name==="TimeoutError"?"timeout":error?.message||"unavailable";
  }
 }
 const analysis=analyzeListing(listing);
 const message=analysis.valuation
  ? "İlanın m² fiyatı bölge referansının %"+Math.abs(analysis.valuation.differencePercent).toLocaleString("tr-TR",{maximumFractionDigits:2})+" "+(analysis.valuation.differencePercent>=0?"üzerinde":"altında")+"."
  : analysis.currentM2
    ? "İlanın m² fiyatı hesaplandı; sayfada karşılaştırılabilir bölge endeksi bulunamadığı için değer etiketi oluşturulmadı."
    : fetchState==="fetched"
      ? "İlan sayfası açıldı ancak fiyat veya alan bilgisi otomatik olarak ayıklanamadı. Güncel seçici yapılandırması veya eklenti gerekebilir."
      : "İlan sitesine sunucu erişimi olmadı. Sayfa açıkken Chrome eklentisini deneyin.";
 return corsify(json({
  provider,
  status:analysis.status,
  message,
  analysis,
  calculatorUrl:calculatorLink(analysis.listing),
  extraction:{serverFetch:fetchState,source:body?.listingData?"page_and_server":"server_page"},
  note:"Karşılaştırma yalnızca ilan sayfasında erişilebilen verilerle yapılır; bölge endeksi her ilanda bulunmayabilir."
 },200,"no-store"),request);
}


let tcmbMetadataCache=null,tcmbMetadataExpires=0,tcmbSeriesMetadataCache=new Map();
const tcmbKey=env=>env.TCMB_EVDS_API_KEY||env.EVDS_API_KEY||'';
async function evdsJson(url,key){return readEvdsJson(fetch,url,key)}
async function evdsGroups(env){
 if(tcmbMetadataCache&&Date.now()<tcmbMetadataExpires)return tcmbMetadataCache;
 const key=tcmbKey(env);if(!key)throw new Error('tcmb_not_configured');
 const payload=await evdsJson('https://evds3.tcmb.gov.tr/igmevdsms-dis/datagroups/mode=0&type=json',key);
 const groups=discoverGroups(payload);
 tcmbMetadataCache=groups;tcmbMetadataExpires=Date.now()+6*60*60*1000;
 return groups;
}
function quarterDate(date){
 const match=String(date||'').match(/^(\d{4})-(\d{2})/);if(!match)return String(date||'');
 const q=Math.ceil(Number(match[2])/3);return `${match[1]}-Q${q}`;
}
async function tcmbProvinceValue(env,province,kind,groupCode){
 const key=tcmbKey(env);if(!key)throw new Error('tcmb_not_configured');
 const id=String(province).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ı/g,'i').replace(/[^a-z0-9]+/g,'-');
 const dbKey=`tcmb:${kind}:${id}`;
 const negative=await env.DB.prepare('SELECT state,attempted_at attemptedAt FROM source_status WHERE series=?').bind(dbKey).first();
 if(negative?.state==='unavailable'&&Date.now()-Date.parse(negative.attemptedAt)<7*86400000)return null;
 const metaCacheKey=`${groupCode}:${kind}:${id}`;
 let cachedMeta=tcmbSeriesMetadataCache.get(metaCacheKey);
 let meta=cachedMeta&&Date.now()<cachedMeta.expiresAt?cachedMeta.value:null;
 if(!meta){
  const metadataPayload=await evdsJson(`https://evds3.tcmb.gov.tr/igmevdsms-dis/serieList/type=json&code=${encodeURIComponent(groupCode)}`,key);
  try{meta=resolveProvinceSeries(metadataPayload,province,kind)}catch(error){if(kind==='rent'&&error?.message==='metadata_mismatch'){await status(env,dbKey,'unavailable');return null}throw error}
  if(!meta){await status(env,dbKey,'unavailable');return null;}
  tcmbSeriesMetadataCache.set(metaCacheKey,{value:meta,expiresAt:Date.now()+6*60*60*1000});
 }
 const sourceUrl=kind==='price'?'https://evds3.tcmb.gov.tr/tumSeriler/2003/bie_birimfiyat':'https://evds3.tcmb.gov.tr/charts/portlet/Njk5NDEzNTFjNjAxMWY0MDU2MDdmZjJm/tr';
 let cached=await env.DB.prepare('SELECT period,value,retrieved_at retrievedAt FROM observations WHERE series=? ORDER BY period DESC LIMIT 1').bind(dbKey).first();
 if(cached&&Date.now()-Date.parse(cached.retrievedAt)<7*86400000){
  return {value:Number(cached.value),period:quarterDate(cached.period),retrievedAt:cached.retrievedAt,seriesCode:meta.code,seriesName:meta.name,unit:meta.unit,frequency:meta.frequency,sourceUrl};
 }
 const end=new Date(),start=new Date(Date.UTC(end.getUTCFullYear()-4,0,1));
 const format=d=>`${String(d.getUTCDate()).padStart(2,'0')}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${d.getUTCFullYear()}`;
 const dataUrl=`https://evds3.tcmb.gov.tr/igmevdsms-dis/series=${encodeURIComponent(meta.code)}&startDate=${format(start)}&endDate=${format(end)}&type=json`;
 const payload=await evdsJson(dataUrl,key);
 let rows;try{rows=parseQuarterlyObservations(payload,meta.code,dbKey)}catch(error){if(error?.message==='empty_data'){await status(env,dbKey,'unavailable');return null}throw error}
 if(!rows.length){await status(env,dbKey,'unavailable');return null}
 const now=new Date().toISOString();
 const latest=[...rows].sort((a,b)=>b.period.localeCompare(a.period))[0];
 if(latest.value==null){await status(env,dbKey,'unavailable');return null}
 const observations=rows.filter(row=>row.value!=null);
 await env.DB.batch(observations.map(row=>env.DB.prepare('INSERT INTO observations(series,period,value,retrieved_at) VALUES(?,?,?,?) ON CONFLICT(series,period) DO UPDATE SET value=excluded.value,retrieved_at=excluded.retrieved_at').bind(dbKey,row.period,row.value,now)));
 await status(env,dbKey,'available');
 return {value:latest.value,period:latest.displayPeriod,retrievedAt:now,seriesCode:meta.code,seriesName:meta.name,unit:meta.unit,frequency:meta.frequency,sourceUrl};
}
async function tcmbListingRequest(request,env){
 if(Number(request.headers.get('Content-Length')||0)>20000)return json({error:'İstek boyutu çok büyük.'},413,'no-store');
 let body;try{body=await request.json()}catch{return json({error:'Geçersiz JSON isteği.'},400,'no-store')}
 let scraped={},fetchState='not_requested';
 const target=typeof body?.url==='string'?body.url.trim():'';
 if(target){
  const provider=getProvider(target);
  if(!provider)return json({error:'Yalnızca Sahibinden, Hepsiemlak veya Emlakjet ilan bağlantıları kullanılabilir.'},400,'no-store');
  try{scraped=await extractHtml(await fetchListing(target),provider);fetchState='fetched'}
  catch(error){fetchState=error?.name==='TimeoutError'?'timeout':'unavailable'}
 }
 const areaType=body.areaType|| (scraped.netArea?'net':scraped.grossArea?'gross':'');
 const listing={
  city:typeof body.city==='string'&&body.city.trim()?body.city.trim():scraped.city||'',
  price:body.price!==undefined&&body.price!==null&&body.price!==''?body.price:scraped.price,
  area:body.area!==undefined&&body.area!==null&&body.area!==''?body.area:body.netArea!==undefined&&body.netArea!==null&&body.netArea!==''?body.netArea:body.grossArea!==undefined&&body.grossArea!==null&&body.grossArea!==''?body.grossArea:scraped.netArea??scraped.area??scraped.grossArea,
  areaType,
  monthlyRent:body.monthlyRent??''
 };
 const checked=validateListingInput(listing);
 if(checked.missing.length)return json({status:'needs_input',listing,missing:checked.missing,extraction:{serverFetch:fetchState},message:'İlandan alınabilen bilgiler forma aktarıldı. Eksik alanları ve net/brüt m² bilgisini tamamlayın.'},200,'no-store');
 if(!env.DB)return json({status:'unavailable',error:'Veri hizmeti şu anda kullanılamıyor.'},503,'no-store');
 try{
  const groups=await evdsGroups(env);
  const [housePrice,rent]=await Promise.all([
   tcmbProvinceValue(env,checked.city,'price',groups.price),
   tcmbProvinceValue(env,checked.city,'rent',groups.rent).catch(()=>null)
  ]);
  if(!housePrice){
   return json({status:'no_data',message:'Bu il için karşılaştırılabilir TCMB verisi bulunamadı.',listing:checked,extraction:{serverFetch:fetchState},source:{name:'TCMB EVDS',url:'https://evds3.tcmb.gov.tr/'}},200,'no-store');
  }
  const threshold=Number(env.TCMB_COMPARISON_THRESHOLD_PERCENT);
  const result=calculateTcmc({...listing,thresholdPercent:Number.isFinite(threshold)&&threshold>0?threshold:20},{housePrice,rent});
  return json({...result,extraction:{serverFetch:fetchState}},200,'no-store');
 }catch(error){
  const message=error?.message==='tcmb_not_configured'
   ?'TCMB veri bağlantısı şu anda yapılandırılmamış.'
   :'TCMB verisi şu anda alınamıyor. Lütfen daha sonra yeniden deneyin.';
  return json({status:'unavailable',error:message,listing:checked},503,'no-store');
 }
}

export default {
 async scheduled(event,env,ctx){
  const tasks=[];
  if(event.cron==='30 13 * * 1-5')tasks.push(refresh(env));
  if(event.cron==='0 5-20 * * *'){
   tasks.push(refreshNewsTracked(env,true));
   const scheduledHour=new Date(event.scheduledTime).getUTCHours();
   if(scheduledHour===8||scheduledHour===13)tasks.push(refreshEmlakKonut(env,{notify:true}));
  }
  ctx.waitUntil(Promise.allSettled(tasks));
 },
 async fetch(request,env){
  const url=new URL(request.url),path=url.pathname;
  if(path==='/api/analyze'||path==='/api/selectors'||path==='/api/tcmb-listing'){
   if(request.method==='OPTIONS')return corsify(new Response(null,{status:204,headers:{'Access-Control-Max-Age':'86400'}}),request);
   if(path==='/api/selectors'&&request.method==='GET')return corsify(json(selectorConfig,200,'public, max-age=300'),request);
   if(path==='/api/tcmb-listing'&&request.method==='POST')return corsify(await tcmbListingRequest(request,env),request);
   if(path==='/api/analyze'&&request.method==='POST'){
    try{return corsify(await analyzeRequest(request),request)}
    catch(error){console.error('Listing analysis failed',error);return corsify(json({error:'İlan analizi sırasında geçici bir hata oluştu.'},500,'no-store'),request)}
   }
  }
  const pushMutation=path==='/api/push/subscribe'&&(request.method==='POST'||request.method==='DELETE');
  if(request.method!=='GET'&&!pushMutation)return json({error:'Method not allowed'},405,'no-store');
  if(!env.DB)return json({status:'not_configured',error:'D1 binding missing'},503);
  try{
   if(path==='/api/push/subscribe'&&request.method==='POST')return subscribe(request,env);
   if(path==='/api/push/subscribe'&&request.method==='DELETE'){let body;try{body=await request.json()}catch{return json({error:'Geçersiz istek'},400,'no-store')}await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint=?').bind(String(body?.endpoint||'')).run();return json({ok:true},200,'no-store')}
   if(path==='/api/health'){await env.DB.prepare('SELECT 1 FROM observations LIMIT 1').first();const {results:newsSources=[]}=await env.DB.prepare("SELECT series,state,attempted_at attemptedAt FROM source_status WHERE series LIKE 'news:%'").all(),newsLatest=await env.DB.prepare('SELECT MAX(published_at) latestPublishedAt,MAX(created_at) lastImportedAt FROM news').first();return json({service:'KonutSeyir',status:'ok',configured:{fx:true,evds:!!tcmbKey(env),tuik:!!env.TUIK_API_KEY,news:true,push:!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY)},news:{sources:newsSources,...newsLatest},note:'Service health does not guarantee source freshness'})}
   if(path==='/api/gold-price'){
    try{
     const upstream=await fetch('https://api.altinseyir.com/api/prices',{headers:{Accept:'application/json','User-Agent':'KonutSeyir/1.0'},signal:AbortSignal.timeout(12000)});
     if(!upstream.ok)throw new Error('UPSTREAM_'+upstream.status);
     const price=goldPrice(await upstream.json());
     return json({...price,source:'AltınSeyir',sourceUrl:'https://altinseyir.com/',apiSource:'https://api.altinseyir.com/api/prices'},200,'public, max-age=60');
    }catch{return json({status:'unavailable',error:'Altın fiyatı geçici olarak alınamıyor'},503,'no-store')}
   }
   if(path==='/api/push/config')return json({publicKey:env.VAPID_PUBLIC_KEY||null,configured:!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY)},200,'no-store');
   if(path==='/api/news')return json(await listNews(env,url));
   if(path.startsWith('/api/news/')){const slug=decodeURIComponent(path.slice('/api/news/'.length));const item=await env.DB.prepare('SELECT slug,title,summary,source_name sourceName,source_url sourceUrl,published_at publishedAt,category,NULL imageUrl FROM news WHERE slug=?').bind(slug).first();return item?json(item):json({error:'Haber bulunamadı'},404)}
   if(path==='/api/city-market'){const item=await cityMarket(env,url.searchParams.get('slug')||'');return item?json(item):json({error:'Bilinmeyen şehir'},404)}
   if(path==='/api/city-sales'){const item=await citySales(env,url.searchParams.get('slug')||'');return item?json(item):json({error:'Bilinmeyen şehir'},404)}
   if(path==='/api/district-sales'){const item=await districtSalesRanking(env,url.searchParams.get('city')||'',url.searchParams.get('limit')||20);return item?json(item):json({error:'Bilinmeyen şehir'},404)}
   if(path==='/api/history'){const series=url.searchParams.get('series');if(!Object.hasOwn(definitions,series))return json({error:'Unknown series'},400);const {results}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 60').bind(series).all();return json({series,source:definitions[series],observations:results.reverse()})}
   if(path==='/api/market-data'){const data=[];for(const series of Object.keys(definitions)){let {results}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 400').bind(series).all();if(!results.length&&series==='policy'&&tcmbKey(env)){await refreshSeries(env,'policy',env.EVDS_POLICY_SERIES,1);({results}=await env.DB.prepare('SELECT period,value,retrieved_at FROM observations WHERE series=? ORDER BY period DESC LIMIT 400').bind(series).all())}const s=await env.DB.prepare('SELECT state,attempted_at FROM source_status WHERE series=?').bind(series).first();data.push(observation(series,results,s))}return json({generatedAt:new Date().toISOString(),data})}
   return json({error:'Not found'},404);
  }catch{return json({status:'unavailable',error:'Data store unavailable'},503,'no-store')}
 }
};
