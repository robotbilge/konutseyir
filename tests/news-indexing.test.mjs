import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {onRequest} from '../functions/_middleware.js';
import {isNewsDetailPath,isNewsPath,isNewsListPath} from '../lib/news-policy.mjs';
import worker from '../worker/index.mjs';
import {netRentMetrics} from '../lib/finance.mjs';
test('all news detail and list path forms get noindex follow without redirects',async()=>{
 for(const path of ['/haberler/haber','/haberler/haber/','/haberler/haber/index.html','/haberler/haber.html','/haberler/eski-haber']){
  assert.equal(isNewsDetailPath(path),true);
  const response=await onRequest({request:new Request('https://konutseyir.com'+path+'?slug=ornek'),next:()=>new Response('<html>detail</html>',{headers:{'Content-Type':'text/html','X-Test':'kept'}})});
  assert.equal(response.headers.get('X-Robots-Tag'),'noindex, follow');assert.equal(response.headers.get('X-Test'),'kept');assert.equal(await response.text(),'<html>detail</html>');
 }
 for(const path of ['/haberler','/haberler/','/haberler.html','/haberler/index.html']){
  assert.equal(isNewsListPath(path),true);assert.equal(isNewsPath(path),true);let target;const response=await onRequest({request:new Request('https://konutseyir.com'+path+'?date=2026-10-31'),env:{ASSETS:{fetch:async request=>{target=new URL(request.url);return new Response('list')}}},next:()=>assert.fail('news must use the asset server')});assert.equal(response.status,200);assert.equal(response.headers.get('X-Robots-Tag'),'noindex, follow');assert.equal(response.headers.get('Location'),null);assert.equal(target.pathname,'/haberler/');assert.equal(target.search,'?date=2026-10-31');
 }
 for(const path of ['/haberlerim','/rehber/tapu-kontrolu']){assert.equal(isNewsPath(path),false);const response=await onRequest({request:new Request('https://konutseyir.com'+path),next:()=>new Response('normal')});assert.equal(response.headers.get('X-Robots-Tag'),null)}
});
test('news item API sends noindex both for existing and missing items',async()=>{
 for(const item of [{title:'Test',slug:'test'},null]){
  const DB={prepare(){return {bind(){return this},async first(){return item}}}};
  const response=await worker.fetch(new Request('https://test/api/news/test'),{DB});assert.equal(response.headers.get('X-Robots-Tag'),'noindex, follow');assert.equal(response.status,item?200:404);
 }
});
test('browser rendering recognizes every news alias without hydrating a 404 page',async()=>{
 const {render}=await import('../.render/server.js');
 const list=await render('/haberler');for(const path of ['/haberler/','/haberler.html','/haberler/index.html'])assert.equal(await render(path),list,path);
 const detail=await render('/haberler/haber');for(const path of ['/haberler/haber/','/haberler/haber.html','/haberler/legacy-path'])assert.equal(await render(path),detail,path);
});
test('all breadcrumb items and source-backed sitemap dates remain valid',()=>{
 const manifest=JSON.parse(readFileSync('dist/guide-publications.json','utf8')),map=readFileSync('dist/sitemap.xml','utf8');
 for(const guide of manifest.guides){
  const html=readFileSync('dist'+guide.path+'index.html','utf8'),schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  const crumb=schema['@graph'].find(x=>x['@type']==='BreadcrumbList');for(const [i,item]of crumb.itemListElement.entries()){assert.equal(item['@type'],'ListItem');assert.equal(item.position,i+1)}
  const article=schema['@graph'].find(x=>x['@type']==='Article'),entry=[...map.matchAll(/<url>(.*?)<\/url>/gs)].find(m=>m[1].includes('https://konutseyir.com'+guide.path));assert.ok(entry[1].includes('<lastmod>'+article.dateModified+'</lastmod>'));
 }
});
test('robots permits news crawling and sitemap excludes all news URLs',()=>{
 const robots=readFileSync('dist/robots.txt','utf8'),sitemap=readFileSync('dist/sitemap.xml','utf8');assert.doesNotMatch(robots,/Disallow:\s*\/haberler/);assert.doesNotMatch(robots,/^Noindex:/mi);assert.match(robots,/Sitemap: https:\/\/konutseyir.com\/sitemap.xml/);assert.doesNotMatch(sitemap,/<loc>https:\/\/konutseyir.com\/haberler(?:\/|<)/);assert.doesNotMatch(sitemap,/\/haberler\/haber/);
});
test('publisher integration and existing news destinations are preserved',()=>{
 const home=readFileSync('dist/index.html','utf8'),ads=readFileSync('dist/ads.txt','utf8');assert.match(home,/ca-pub-1047230012085801/);assert.match(home,/adsbygoogle\.js/);assert.match(ads,/google.com, pub-1047230012085801, DIRECT, f08c47fec0942fa0/);
 for(const path of ['app/haberler/page.tsx','components/live-data.tsx','worker/news.mjs'])assert.ok(readFileSync(path,'utf8').includes('/haberler/haber?slug='),path);
});
test('core pages provide distinct decision methods and complete worked examples in prerendered HTML',()=>{
 const expected={'hesaplama':['data-core-editorial="tools"','268.000','220.000','%5,32','%4,44'],'karsilastir':['data-core-editorial="comparison"','1.040.000','satın alma gücü','aynı dönem'],'sehirler':['data-core-editorial="cities"','120’den 150’ye','Coğrafya','il toplamından eskiyse'],'veri':['data-core-editorial="data"','Gözlem dönemi','Yayım tarihi','Son çekim','24 aylık'],'hakkimizda':['data-core-editorial="about"','Hangi karar boşluğunu','Yayın sorumluluğu','yapay zekâ']};
 for(const [path,fragments] of Object.entries(expected)){const html=readFileSync(`dist/${path}/index.html`,'utf8');for(const text of fragments)assert.ok(html.includes(text),path+': '+text);assert.ok(html.includes('dateTime="2026-10-31"'));assert.match(html,/name="robots" content="index,follow"/)}
 const a=netRentMetrics(4800000,240000,28000,1,24000,16000),b=netRentMetrics(4500000,450000,27000,2,32000,18000);assert.equal(a.net,268000);assert.equal(b.net,220000);assert.equal(a.netYield.toFixed(2),'5.32');assert.equal(b.netYield.toFixed(2),'4.44');
});
