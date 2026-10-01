import webpush from 'web-push';

export const newsFeeds=[
 {id:'emlakhaberi',name:'Emlak Haberleri',url:'https://www.emlakhaberi.com/rss',hosts:['www.emlakhaberi.com','emlakhaberi.com'],defaultCategory:'Emlak',filter:true},
 {id:'sozcu-emlak',name:'Sözcü Emlak',url:'https://www.sozcu.com.tr/feeds-rss-category-emlak',hosts:['www.sozcu.com.tr','sozcu.com.tr'],defaultCategory:'Emlak',filter:false},
 {id:'cnbce',name:'CNBC-e',url:'https://www.cnbce.com/rss',hosts:['www.cnbce.com','cnbce.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'bloomberght',name:'Bloomberg HT',url:'https://www.bloomberght.com/rss',hosts:['www.bloomberght.com','bloomberght.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'trt-ekonomi',name:'TRT Haber Ekonomi',url:'https://www.trthaber.com/ekonomi_articles.rss',hosts:['www.trthaber.com','trthaber.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'haberturk-ekonomi',name:'Habertürk Ekonomi',url:'https://www.haberturk.com/rss/ekonomi.xml',hosts:['www.haberturk.com','haberturk.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'ekonomi-gazetesi',name:'Ekonomi Gazetesi',url:'https://www.ekonomigazetesi.com/rss.xml',hosts:['www.ekonomigazetesi.com','ekonomigazetesi.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'emlak-konut-kap',name:'Emlak Konut',url:'https://www.kap.org.tr/tr/bildirim-sorgu-sonuc?member=4028e4a2422d9a780142513cda5b232e',hosts:['www.kap.org.tr','kap.org.tr'],defaultCategory:'Resmî Açıklama',filter:false,scheduledOnly:true}
];

const normalizeText=value=>String(value||'').toLocaleLowerCase('tr-TR').normalize('NFKC');
const keywords=/(?<![\p{L}\p{N}])(?:(?:konut|emlak|gayrimenkul|kiracı|tapu|arsa|arazi|imar|toki)[\p{L}]*|dask|mortgage|gyo|kira|ev sahibi|kentsel dönüşüm|konut kredisi|yapı ruhsatı|konut satışı)(?![\p{L}\p{N}])/u;
const titleKeywords=/(?<![\p{L}\p{N}])(?:bina|binalar|binada|binanın|daire|daireler|dairede|dairenin)(?![\p{L}\p{N}])/u;
const hasKeyword=(value,title='')=>keywords.test(normalizeText(value))||titleKeywords.test(normalizeText(title));
const cdata=value=>String(value||'').replace(/^<!\[CDATA\[/,'').replace(/\]\]>$/,'').trim();
const entities=value=>cdata(value).replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;|&#34;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/\s+/g,' ').trim();
const field=(block,name)=>entities(block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`,'i'))?.[1]);
const rawField=(block,name)=>cdata(block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`,'i'))?.[1]);
const slugify=value=>entities(value).toLocaleLowerCase('tr-TR').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,72);
const titleKey=value=>entities(value).toLocaleLowerCase('tr-TR').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const shortHash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).slice(0,5).map(x=>x.toString(16).padStart(2,'0')).join('');
const canonicalUrl=value=>{const url=new URL(value);url.hash='';for(const key of [...url.searchParams.keys()])if(/^utm_|^(fbclid|gclid|ref)$/i.test(key))url.searchParams.delete(key);return url.toString()};
const sourceStatus=(env,id,state)=>env.DB.prepare('INSERT INTO source_status(series,state,attempted_at) VALUES(?,?,?) ON CONFLICT(series) DO UPDATE SET state=excluded.state,attempted_at=excluded.attempted_at').bind(`news:${id}`,state,new Date().toISOString()).run();

export async function parseNewsRSS(xml,source=newsFeeds[0]){
 const blocks=[...String(xml).matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map(m=>m[1]);
 const rows=[];
 for(const block of blocks){
  const title=field(block,'title'),summary=field(block,'description').slice(0,320),rawUrl=rawField(block,'link')||field(block,'guid'),feedCategory=field(block,'category'),category=feedCategory||source.defaultCategory;
  if(!title||!rawUrl||(source.filter&&!hasKeyword(`${title} ${summary} ${feedCategory}`,title)))continue;
  let sourceUrl;try{sourceUrl=canonicalUrl(new URL(entities(rawUrl),source.url).toString())}catch{continue}
  if(!source.hosts.includes(new URL(sourceUrl).hostname))continue;
  const published=new Date(field(block,'pubDate')||field(block,'dc:date')||field(block,'date'));if(Number.isNaN(published.getTime()))continue;
  rows.push({slug:`${slugify(title)}-${await shortHash(sourceUrl)}`,title,summary,sourceName:source.name,sourceId:source.id,sourceUrl,publishedAt:published.toISOString(),category,imageUrl:null});
 }
 return rows.slice(0,40);
}

export const isRelevantNews=item=>hasKeyword(`${item?.title||''} ${item?.summary||''} ${item?.category||''}`,item?.title||'');

const emlakKonutDisclosureSource=newsFeeds.find(source=>source.id==='emlak-konut-kap');
const cleanHtml=value=>entities(String(value||'').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,' '));

export async function parseEmlakKonutDisclosures(html){
 const rows=[...String(html).matchAll(/<tr\b[^>]*id=[\"']notification\d+[\"'][^>]*>([\s\S]*?)<\/tr>/gi)].map(match=>match[1]);
 const items=[];
 for(const row of rows){
  const cells=[...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(match=>cleanHtml(match[1]));
  const company='EMLAK KONUT GAYRİMENKUL YATIRIM ORTAKLIĞI A.Ş.';
  if(!cells.some(cell=>cell.toLocaleUpperCase('tr-TR').includes(company)))continue;
  const dateIndex=cells.findIndex(cell=>/\b\d{2}\.\d{2}\.\d{4}\b/.test(cell));
  if(dateIndex<0)continue;
  const dateMatch=cells[dateIndex].match(/(\d{2})\.(\d{2})\.(\d{4})(?:\s+(\d{2}:\d{2}))?/);
  if(!dateMatch)continue;
  const disclosureType=cells[dateIndex+3]||'Şirket Duyurusu';
  const subject=cells[dateIndex+4]||'';
  const summary=cells[dateIndex+5]||'';
  const headline=summary&&summary!=='-'?summary:subject;
  if(!headline||headline==='-')continue;
  const href=row.match(/(?:href|routerLink|ng-reflect-router-link)=[\"']([^\"']*\/Bildirim\/\d+[^\"']*)[\"']/i)?.[1];
  const hrefId=href?.match(/\/Bildirim\/(\d+)/i)?.[1];
  const numericAttrs=[...row.matchAll(/(?:id|value|data-id)=[\"'](\d{5,})[\"']/gi)].map(match=>match[1]);
  const disclosureId=hrefId||numericAttrs[0];
  if(!disclosureId)continue;
  const [,day,month,year,time='12:00']=dateMatch;
  const publishedAt=new Date(`${year}-${month}-${day}T${time}:00+03:00`);
  if(Number.isNaN(publishedAt.getTime()))continue;
  const sourceUrl=`https://www.kap.org.tr/tr/Bildirim/${disclosureId}`;
  items.push({slug:`${slugify(headline)}-${await shortHash(sourceUrl)}`,title:headline,summary:disclosureType==='-'?'Emlak Konut’un KAP bildirimi':disclosureType.slice(0,320),sourceName:emlakKonutDisclosureSource.name,sourceId:emlakKonutDisclosureSource.id,sourceUrl,publishedAt:publishedAt.toISOString(),category:'Resmî Açıklama',imageUrl:null});
 }
 return items.slice(0,200);
}

export async function refreshEmlakKonut(env,{notify=true}={}){
 let response;
 try{
  response=await fetch(emlakKonutDisclosureSource.url,{headers:{'User-Agent':'KonutSeyir/1.0 (+https://konutseyir.com/haberler)','Accept':'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8','Accept-Language':'tr-TR,tr;q=0.9'},signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw Error(`HTTP ${response.status}`);
  const html=await response.text(),items=await parseEmlakKonutDisclosures(html);
  if(!items.length)throw Error('No Emlak Konut disclosures parsed');
  await sourceStatus(env,emlakKonutDisclosureSource.id,'available');
  const known=(await env.DB.prepare('SELECT source_url FROM news WHERE source_name=? ORDER BY published_at DESC LIMIT 1000').bind(emlakKonutDisclosureSource.name).all()).results||[];
  const knownUrls=new Set(known.map(item=>item.source_url)),fresh=items.filter(item=>!knownUrls.has(item.sourceUrl));
  const now=new Date().toISOString();
  if(fresh.length)await env.DB.batch(fresh.map(item=>env.DB.prepare('INSERT OR IGNORE INTO news(slug,title,summary,source_name,source_url,published_at,category,image_url,created_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(item.slug,item.title,item.summary,item.sourceName,item.sourceUrl,item.publishedAt,item.category,item.imageUrl,now)));
  const isBootstrap=known.length===0,cutoff=Date.now()-24*60*60*1000,notifiable=isBootstrap?[]:fresh.filter(item=>Date.parse(item.publishedAt)>=cutoff).slice(0,3);
  const push=notify&&notifiable.length?await sendNewsPush(env,notifiable):{sent:0,subscribers:0,failed:0,configured:!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY)};
  return {saved:fresh.length,newCount:fresh.length,push,source:{id:emlakKonutDisclosureSource.id,name:emlakKonutDisclosureSource.name,status:'available',items:items.length}};
 }catch(error){
  await sourceStatus(env,emlakKonutDisclosureSource.id,'error');
  throw error;
 }
}

async function fetchFeed(source){
 const response=await fetch(source.url,{headers:{'User-Agent':'KonutSeyir/1.0 (+https://konutseyir.com/haberler)','Accept':'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.5'},signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error(`HTTP ${response.status}`);
 return parseNewsRSS(await response.text(),source);
}

export async function refreshNews(env,{notify=true}={}){
 const activeFeeds=newsFeeds.filter(source=>!source.scheduledOnly),settled=await Promise.allSettled(activeFeeds.map(async source=>{try{const rows=await fetchFeed(source);await sourceStatus(env,source.id,'available');return {source,rows}}catch(error){await sourceStatus(env,source.id,'error');throw error}}));
 const successful=settled.filter(x=>x.status==='fulfilled').map(x=>x.value);if(!successful.length)throw Error('All news feeds unavailable');
 const filteredNames=successful.filter(x=>x.source.filter).map(x=>x.source.name),stale=[];
 if(filteredNames.length){const placeholders=filteredNames.map(()=>'?').join(','),stored=(await env.DB.prepare(`SELECT slug,title,summary,category FROM news WHERE source_name IN (${placeholders}) ORDER BY published_at DESC LIMIT 1000`).bind(...filteredNames).all()).results||[];stale.push(...stored.filter(item=>!isRelevantNews(item)).map(item=>item.slug))}
 if(stale.length)await env.DB.batch(stale.map(slug=>env.DB.prepare('DELETE FROM news WHERE slug=?').bind(slug)));
 const candidates=successful.flatMap(x=>x.rows).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
 const recent=(await env.DB.prepare('SELECT source_url,title FROM news ORDER BY published_at DESC LIMIT 1000').all()).results||[],knownUrls=new Set(recent.map(x=>x.source_url)),knownTitles=new Set(recent.map(x=>titleKey(x.title))),fresh=[];
 for(const item of candidates){const key=titleKey(item.title);if(knownUrls.has(item.sourceUrl)||knownTitles.has(key))continue;knownUrls.add(item.sourceUrl);knownTitles.add(key);fresh.push(item)}
 const now=new Date().toISOString();if(fresh.length)await env.DB.batch(fresh.map(x=>env.DB.prepare('INSERT OR IGNORE INTO news(slug,title,summary,source_name,source_url,published_at,category,image_url,created_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(x.slug,x.title,x.summary,x.sourceName,x.sourceUrl,x.publishedAt,x.category,x.imageUrl,now)));
 const cutoff=Date.now()-8*60*60*1000,notifiable=fresh.filter(x=>Date.parse(x.publishedAt)>=cutoff).slice(0,3),push=notify&&notifiable.length?await sendNewsPush(env,notifiable):{sent:0,subscribers:0,failed:0,configured:!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY)};
 return {saved:fresh.length,newCount:fresh.length,removed:stale.length,push,sources:newsFeeds.map(source=>{const index=activeFeeds.indexOf(source);return {id:source.id,name:source.name,status:index<0?'scheduled':settled[index].status==='fulfilled'?'available':'error',items:index>=0&&settled[index].status==='fulfilled'?settled[index].value.rows.length:0}})};
}

export async function sendNewsPush(env,items){
 if(!env.VAPID_PUBLIC_KEY||!env.VAPID_PRIVATE_KEY)return {sent:0,subscribers:0,failed:0,configured:false};
 webpush.setVapidDetails('mailto:bildirim@konutseyir.com',env.VAPID_PUBLIC_KEY,env.VAPID_PRIVATE_KEY);
 const {results=[]}=await env.DB.prepare('SELECT endpoint,p256dh,auth FROM push_subscriptions').all();let sent=0,failed=0;
 for(const item of items){const externalUrl=item.sourceId==='emlak-konut-kap'&&item.sourceUrl&&['kap.org.tr','www.kap.org.tr'].includes(new URL(item.sourceUrl).hostname)?item.sourceUrl:null,payload=JSON.stringify({title:item.title,body:`${item.sourceName} · ${item.summary||'Yeni konut haberi'}`,url:externalUrl||`/haberler/haber?slug=${encodeURIComponent(item.slug)}`,tag:`news-${item.slug}`});await Promise.allSettled(results.map(async sub=>{try{await webpush.sendNotification({endpoint:sub.endpoint,keys:{p256dh:sub.p256dh,auth:sub.auth}},payload,{TTL:21600,urgency:'normal'});sent++}catch(error){failed++;if(error?.statusCode===404||error?.statusCode===410)await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint=?').bind(sub.endpoint).run()}}))}
 return {sent,subscribers:results.length,failed,configured:true};
}
