import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
test('installment campaign guide has consistent publication metadata and one notification identity',()=>{
 const path='/rehber/sabit-taksit-konut-kampanyasi-ara-odeme/',html=readFileSync(`dist${path}index.html`,'utf8');
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1])['@graph'];
 const article=graph.find(x=>x['@type']==='Article');
 assert.equal(article.datePublished,'2026-11-02');assert.equal(article.dateModified,'2026-11-02');assert.equal(article.mainEntityOfPage,`https://konutseyir.com${path}`);
 assert.ok(graph.some(x=>x['@type']==='BreadcrumbList'));
 assert.ok(readFileSync('dist/rehber/index.html','utf8').includes(path.slice(0,-1)));
 assert.ok(readFileSync('dist/sitemap.xml','utf8').includes(`<loc>https://konutseyir.com${path}</loc><lastmod>2026-11-02</lastmod>`));
 const manifest=JSON.parse(readFileSync('dist/guide-publications.json','utf8'));assert.equal(manifest.guides.filter(x=>x.path===path).length,1);
 assert.match(html,/href="\/hesaplama\/alim-maliyeti"/);
 const old=readFileSync('dist/rehber/enerji-kimlik-belgesi-isinma-gideri/index.html','utf8');assert.match(old,/"datePublished":"2026-11-01"/);assert.match(old,/"dateModified":"2026-11-01"/);
});
