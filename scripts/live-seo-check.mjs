// Read-only production/preview smoke checks. No subscriptions or notifications are created.
import assert from 'node:assert/strict';
const site=process.argv[2];
assert.ok(['altinseyir','konutseyir'].includes(site),'Choose altinseyir or konutseyir');
const origin=`https://${site}.com`,base=(process.argv[3]||origin).replace(/\/$/,'');
const preview=base!==origin;
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1].toLowerCase(),m[2]]));
const robots=html=>[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>attrs(m[0])).filter(a=>a.name?.toLowerCase()==='robots').map(a=>a.content?.toLowerCase()||'').join(',');
const canonical=html=>[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>attrs(m[0])).find(a=>a.rel==='canonical')?.href;
const noindex=value=>/\bnoindex\b/i.test(value||'')&&/\bfollow\b/i.test(value||'')&&!/\bnofollow\b/i.test(value||'');
async function get(path,{news=false,canonicalUrl,allowPreviewHeader=true}={}){
 const url=path.startsWith('https://')?path:base+path;
 const r=await fetch(url,{redirect:'manual',cache:'no-store',signal:AbortSignal.timeout(30000)});
 assert.equal(r.status,200,`${url}: HTTP ${r.status}; redirects are not accepted`);
 const body=await r.text();
 if(news){assert.ok(noindex(r.headers.get('x-robots-tag')),`${url}: missing HTTP noindex, follow`);assert.ok(noindex(robots(body)),`${url}: missing HTML noindex,follow`)}
 if(canonicalUrl){assert.equal(canonical(body),canonicalUrl,`${url}: canonical mismatch`);assert.ok(!/\bnoindex\b/.test(robots(body)),`${url}: indexable page has noindex`);if(!preview||!allowPreviewHeader)assert.ok(!/\bnoindex\b/.test(r.headers.get('x-robots-tag')||''),`${url}: unexpected HTTP noindex`)}
 console.log(JSON.stringify({url,status:r.status,noindex:news||undefined,canonical:canonicalUrl||undefined}));return {body,headers:r.headers};
}
const main=await get('/',{canonicalUrl:origin+'/'});
assert.match(main.body,/ca-pub-1047230012085801/,'Publisher ID must remain unchanged');
const ads=await get('/ads.txt');assert.match(ads.body,/^google\.com, pub-1047230012085801, DIRECT, f08c47fec0942fa0\s*$/);
const map=await get('/sitemap.xml');assert.match(map.body,/<urlset\b/);assert.match(map.body,/<\/urlset>/);
const urls=[...map.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);assert.ok(urls.length>40);assert.equal(new Set(urls).size,urls.length);
for(const url of urls){const u=new URL(url);assert.equal(u.origin,origin);assert.ok(!u.pathname.startsWith('/haber'),'News must not occur in the main sitemap')}
const rules=await get('/robots.txt');assert.doesNotMatch(rules.body,/Disallow:\s*\/haber/i);assert.match(rules.body,new RegExp('Sitemap: '+origin.replaceAll('.','\\.')+'/sitemap\\.xml'));
if(site==='altinseyir'){
 for(const path of ['/haberler','/haberler/','/haberler.html','/haberler/index.html','/haber','/haber.html?slug=test','/haber/test'])await get(path,{news:true});
 for(const path of ['/gram-altin','/banka-altin-fiyatlari','/kuyumcu-fiyatlari','/grafikler','/altin-maliyet-ortalamasi','/gunluk-altin-yorumu','/resmi-piyasa-takvimi'])await get(path,{canonicalUrl:origin+path});
 const news=JSON.parse((await get('https://api.altinseyir.com/api/news?limit=1')).body);assert.ok(news.articles?.[0]?.slug,'News feed must remain available');
 await get('https://api.altinseyir.com/haber/'+encodeURIComponent(news.articles[0].slug),{news:true});
 const oldMap=await get('https://api.altinseyir.com/haber-sitemap.xml');assert.match(oldMap.body,/<urlset\b/);assert.doesNotMatch(oldMap.body,/<url>/);assert.ok(noindex(oldMap.headers.get('x-robots-tag')));
 const prices=JSON.parse((await get('https://api.altinseyir.com/api/prices')).body);assert.ok(prices&&typeof prices==='object');
 await get('https://api.altinseyir.com/api/alerts/public-key');
}else{
 for(const path of ['/haberler','/haberler/','/haberler.html','/haberler/index.html','/haberler/haber','/haberler/haber/','/haberler/haber/index.html','/haberler/haber.html','/haberler/legacy-path?slug=test'])await get(path,{news:true});
 for(const path of ['/ev-analizi/','/hesaplama/emlak-komisyonu/','/hesaplama/kira-artis-orani/','/hesaplama/tapu-harci/','/hesaplama/kira-getirisi/','/hesaplama/mevduat/','/hesaplama/altin-bazli-konut/','/sehir-karsilastir/','/rehber/'])await get(path,{canonicalUrl:origin+path});
 const news=JSON.parse((await get('/api/news?limit=1')).body);assert.ok(news.items?.[0]?.slug,'News feed must remain available');
 await get('/haberler/haber?slug='+encodeURIComponent(news.items[0].slug),{news:true});
 const push=JSON.parse((await get('/api/push/config')).body);assert.equal(push.configured,true,'Push configuration must stay active');
 const market=JSON.parse((await get('/api/market-data')).body);assert.ok(Array.isArray(market.data),'Market data shape must stay intact');
}
console.log(JSON.stringify({site,preview,status:'passed',sitemapUrls:urls.length}));
