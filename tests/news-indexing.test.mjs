import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {onRequest} from '../functions/_middleware.js';
import {isNewsDetailPath} from '../lib/news-policy.mjs';
import worker from '../worker/index.mjs';
import {netRentMetrics} from '../lib/finance.mjs';
test('all news detail path forms get noindex follow while lists stay indexable',async()=>{
 for(const path of ['/haberler/haber','/haberler/haber/','/haberler/haber/index.html','/haberler/haber.html','/haberler/eski-haber']){
  assert.equal(isNewsDetailPath(path),true);
  const response=await onRequest({request:new Request('https://konutseyir.com'+path+'?slug=ornek'),next:()=>new Response('<html>detail</html>',{headers:{'Content-Type':'text/html','X-Test':'kept'}})});
  assert.equal(response.headers.get('X-Robots-Tag'),'noindex, follow');assert.equal(response.headers.get('X-Test'),'kept');assert.equal(await response.text(),'<html>detail</html>');
 }
 for(const path of ['/haberler','/haberler/','/haberler/index.html','/haberlerim','/rehber/tapu-kontrolu']){
  assert.equal(isNewsDetailPath(path),false);const response=await onRequest({request:new Request('https://konutseyir.com'+path),next:()=>new Response('list')});assert.equal(response.headers.get('X-Robots-Tag'),null);
 }
});
test('news item API sends noindex both for existing and missing items',async()=>{
 for(const item of [{title:'Test',slug:'test'},null]){
  const DB={prepare(){return {bind(){return this},async first(){return item}}}};
  const response=await worker.fetch(new Request('https://test/api/news/test'),{DB});assert.equal(response.headers.get('X-Robots-Tag'),'noindex, follow');assert.equal(response.status,item?200:404);
 }
});
test('robots allows crawlers to see noindex and sitemap excludes details but includes news list',()=>{
 const robots=readFileSync('dist/robots.txt','utf8'),sitemap=readFileSync('dist/sitemap.xml','utf8');assert.doesNotMatch(robots,/Disallow:\s*\/haberler/);assert.doesNotMatch(robots,/^Noindex:/mi);assert.match(robots,/Sitemap: https:\/\/konutseyir.com\/sitemap.xml/);assert.match(sitemap,/<loc>https:\/\/konutseyir.com\/haberler\/<\/loc>/);assert.doesNotMatch(sitemap,/\/haberler\/haber/);
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
