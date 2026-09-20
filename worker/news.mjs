import webpush from 'web-push';

export const newsFeeds=[
 {id:'emlakhaberi',name:'Emlak Haberleri',url:'https://www.emlakhaberi.com/rss',hosts:['www.emlakhaberi.com','emlakhaberi.com'],defaultCategory:'Emlak',filter:true},
 {id:'sozcu-emlak',name:'Sözcü Emlak',url:'https://www.sozcu.com.tr/feeds-rss-category-emlak',hosts:['www.sozcu.com.tr','sozcu.com.tr'],defaultCategory:'Emlak',filter:false},
 {id:'cnbce',name:'CNBC-e',url:'https://www.cnbce.com/rss',hosts:['www.cnbce.com','cnbce.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'bloomberght',name:'Bloomberg HT',url:'https://www.bloomberght.com/rss',hosts:['www.bloomberght.com','bloomberght.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'trt-ekonomi',name:'TRT Haber Ekonomi',url:'https://www.trthaber.com/ekonomi_articles.rss',hosts:['www.trthaber.com','trthaber.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'haberturk-ekonomi',name:'Habertürk Ekonomi',url:'https://www.haberturk.com/rss/ekonomi.xml',hosts:['www.haberturk.com','haberturk.com'],defaultCategory:'Ekonomi',filter:true},
 {id:'ekonomi-gazetesi',name:'Ekonomi Gazetesi',url:'https://www.ekonomigazetesi.com/rss.xml',hosts:['www.ekonomigazetesi.com','ekonomigazetesi.com'],defaultCategory:'Ekonomi',filter:true}
];

const normalizeText=value=>String(value||'').toLocaleLowerCase('tr-TR').normalize('NFKC');
const keywords=/(?<![\p{L}\p{N}])(?:(?:konut|emlak|gayrimenkul|kiracı|tapu|arsa|arazi|imar|toki|bina|daire|dask|mortgage|gyo)[\p{L}]*|kira|ev sahibi|kentsel dönüşüm|konut kredisi|yapı ruhsatı|konut satışı)(?![\p{L}\p{N}])/u;
const hasKeyword=value=>keywords.test(normalizeText(value));
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
  if(!title||!rawUrl||(source.filter&&!hasKeyword(`${title} ${summary} ${feedCategory}`)))continue;
  let sourceUrl;try{sourceUrl=canonicalUrl(new URL(entities(rawUrl),source.url).toString())}catch{continue}
  if(!source.hosts.includes(new URL(sourceUrl).hostname))continue;
  const published=new Date(field(block,'pubDate')||field(block,'dc:date')||field(block,'date'));if(Number.isNaN(published.getTime()))continue;
  rows.push({slug:`${slugify(title)}-${await shortHash(sourceUrl)}`,title,summary,sourceName:source.name,sourceId:source.id,sourceUrl,publishedAt:published.toISOString(),category,imageUrl:null});
 }
 return rows.slice(0,40);
}

export const isRelevantNews=item=>hasKeyword(`${item?.title||''} ${item?.summary||''} ${item?.category||''}`);

async function fetchFeed(source){
 const response=await fetch(source.url,{headers:{'User-Agent':'KonutSeyir/1.0 (+https://konutseyir.com/haberler)','Accept':'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.5'},signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error(`HTTP ${response.status}`);
 return parseNewsRSS(await response.text(),source);
}

export async function refreshNews(env,{notify=true}={}){
 const settled=await Promise.allSettled(newsFeeds.map(async source=>{try{const rows=await fetchFeed(source);await sourceStatus(env,source.id,'available');return {source,rows}}catch(error){await sourceStatus(env,source.id,'error');throw error}}));
 const successful=settled.filter(x=>x.status==='fulfilled').map(x=>x.value);if(!successful.length)throw Error('All news feeds unavailable');
 const candidates=successful.flatMap(x=>x.rows).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
 const recent=(await env.DB.prepare('SELECT source_url,title FROM news ORDER BY published_at DESC LIMIT 1000').all()).results||[],knownUrls=new Set(recent.map(x=>x.source_url)),knownTitles=new Set(recent.map(x=>titleKey(x.title))),fresh=[];
 for(const item of candidates){const key=titleKey(item.title);if(knownUrls.has(item.sourceUrl)||knownTitles.has(key))continue;knownUrls.add(item.sourceUrl);knownTitles.add(key);fresh.push(item)}
 const now=new Date().toISOString();if(fresh.length)await env.DB.batch(fresh.map(x=>env.DB.prepare('INSERT OR IGNORE INTO news(slug,title,summary,source_name,source_url,published_at,category,image_url,created_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(x.slug,x.title,x.summary,x.sourceName,x.sourceUrl,x.publishedAt,x.category,x.imageUrl,now)));
 const cutoff=Date.now()-8*60*60*1000,notifiable=fresh.filter(x=>Date.parse(x.publishedAt)>=cutoff).slice(0,3),push=notify&&notifiable.length?await sendNewsPush(env,notifiable):{sent:0,subscribers:0,failed:0,configured:!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY)};
 return {saved:fresh.length,newCount:fresh.length,push,sources:newsFeeds.map((source,index)=>({id:source.id,name:source.name,status:settled[index].status==='fulfilled'?'available':'error',items:settled[index].status==='fulfilled'?settled[index].value.rows.length:0}))};
}

export async function sendNewsPush(env,items){
 if(!env.VAPID_PUBLIC_KEY||!env.VAPID_PRIVATE_KEY)return {sent:0,subscribers:0,failed:0,configured:false};
 webpush.setVapidDetails('mailto:bildirim@konutseyir.com',env.VAPID_PUBLIC_KEY,env.VAPID_PRIVATE_KEY);
 const {results=[]}=await env.DB.prepare('SELECT endpoint,p256dh,auth FROM push_subscriptions').all();let sent=0,failed=0;
 for(const item of items){const payload=JSON.stringify({title:item.title,body:`${item.sourceName} · ${item.summary||'Yeni konut haberi'}`,url:`/haberler/haber?slug=${encodeURIComponent(item.slug)}`,tag:`news-${item.slug}`});await Promise.allSettled(results.map(async sub=>{try{await webpush.sendNotification({endpoint:sub.endpoint,keys:{p256dh:sub.p256dh,auth:sub.auth}},payload,{TTL:21600,urgency:'normal'});sent++}catch(error){failed++;if(error?.statusCode===404||error?.statusCode===410)await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint=?').bind(sub.endpoint).run()}}))}
 return {sent,subscribers:results.length,failed,configured:true};
}
