import webpush from 'web-push';

const feed={name:'Emlak Haberleri',url:'https://www.emlakhaberi.com/rss',host:'www.emlakhaberi.com'};
const normalizeText=value=>String(value||'').toLocaleLowerCase('tr-TR').normalize('NFKC');
const keywords=/(?<![\p{L}\p{N}])(?:(?:konut|emlak|gayrimenkul|kiracı|tapu|arsa|arazi|imar|toki|bina|daire)[\p{L}]*|kira|kentsel dönüşüm)(?![\p{L}\p{N}])/u;
const hasKeyword=value=>keywords.test(normalizeText(value));
const cdata=value=>String(value||'').replace(/^<!\[CDATA\[/,'').replace(/\]\]>$/,'').trim();
const entities=value=>cdata(value).replace(/<[^>]*>/g,' ').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/\s+/g,' ').trim();
const field=(block,name)=>entities(block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`,'i'))?.[1]);
const rawField=(block,name)=>cdata(block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`,'i'))?.[1]);
const slugify=value=>entities(value).toLocaleLowerCase('tr-TR').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,72);
const shortHash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).slice(0,5).map(x=>x.toString(16).padStart(2,'0')).join('');

export async function parseNewsRSS(xml){
 const blocks=[...String(xml).matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(m=>m[1]);
 const rows=[];
 for(const block of blocks){
  const title=field(block,'title'),summary=field(block,'description').slice(0,320),sourceUrl=rawField(block,'link'),category=field(block,'category');
  if(!title||!sourceUrl||!hasKeyword(`${title} ${summary} ${category}`))continue;
  let url;try{url=new URL(sourceUrl)}catch{continue}if(url.hostname!==feed.host)continue;
  const published=new Date(field(block,'pubDate'));if(Number.isNaN(published.getTime()))continue;
  const imageUrl=block.match(/<enclosure\b[^>]*url="([^"]+)"/i)?.[1]||null;
  rows.push({slug:`${slugify(title)}-${await shortHash(sourceUrl)}`,title,summary,sourceName:feed.name,sourceUrl,publishedAt:published.toISOString(),category:category||'Emlak',imageUrl});
 }
 return rows.slice(0,40);
}

export const isRelevantNews=item=>hasKeyword(`${item?.title||''} ${item?.summary||''} ${item?.category||''}`);

export async function refreshNews(env,{notify=true}={}){
 const response=await fetch(feed.url,{headers:{'User-Agent':'KonutSeyir/1.0 (+https://konutseyir.com/haberler)'},signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error('News feed unavailable');
 const rows=await parseNewsRSS(await response.text());
 if(!rows.length)throw Error('No relevant news');
 const existing=new Set((await env.DB.prepare(`SELECT source_url FROM news WHERE source_url IN (${rows.map(()=>'?').join(',')})`).bind(...rows.map(x=>x.sourceUrl)).all()).results.map(x=>x.source_url));
 const now=new Date().toISOString();
 await env.DB.batch(rows.map(x=>env.DB.prepare('INSERT OR IGNORE INTO news(slug,title,summary,source_name,source_url,published_at,category,image_url,created_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(x.slug,x.title,x.summary,x.sourceName,x.sourceUrl,x.publishedAt,x.category,x.imageUrl,now)));
 const fresh=rows.filter(x=>!existing.has(x.sourceUrl));
 const push=notify&&fresh.length?await sendNewsPush(env,fresh.slice(0,3)):{sent:0,subscribers:0,failed:0,configured:!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY)};
 return {saved:rows.length,newCount:fresh.length,push};
}

export async function sendNewsPush(env,items){
 if(!env.VAPID_PUBLIC_KEY||!env.VAPID_PRIVATE_KEY)return {sent:0,subscribers:0,failed:0,configured:false};
 webpush.setVapidDetails('mailto:bildirim@konutseyir.com',env.VAPID_PUBLIC_KEY,env.VAPID_PRIVATE_KEY);
 const {results=[]}=await env.DB.prepare('SELECT endpoint,p256dh,auth FROM push_subscriptions').all();
 let sent=0,failed=0;
 for(const item of items){
  const payload=JSON.stringify({title:item.title,body:item.summary||'Yeni emlak haberi',url:`/haberler/haber?slug=${encodeURIComponent(item.slug)}`,tag:`news-${item.slug}`});
  await Promise.allSettled(results.map(async sub=>{try{await webpush.sendNotification({endpoint:sub.endpoint,keys:{p256dh:sub.p256dh,auth:sub.auth}},payload,{TTL:21600,urgency:'normal'});sent++}catch(error){failed++;if(error?.statusCode===404||error?.statusCode===410)await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint=?').bind(sub.endpoint).run()}}));
 }
 return {sent,subscribers:results.length,failed,configured:true};
}
