import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const slug='enerji-kimlik-belgesi-isinma-gideri',path=`/rehber/${slug}/`;
test('energy guide publication identity, dates and discovery agree',()=>{
 const html=readFileSync(`dist${path}index.html`,'utf8');
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
 const article=graph.find(item=>item['@type']==='Article');
 assert.equal(article.datePublished,'2026-11-01');
 assert.equal(article.dateModified,'2026-11-01');
 assert.equal(article.mainEntityOfPage,`https://konutseyir.com${path}`);
 assert.ok(graph.some(item=>item['@type']==='BreadcrumbList'));
 assert.match(html,/<meta name="robots" content="index,follow"/);
 assert.ok(readFileSync('dist/rehber/index.html','utf8').includes(`href="${path.slice(0,-1)}"`));
 assert.equal(JSON.parse(readFileSync('dist/guide-publications.json','utf8')).guides.filter(g=>g.path===path).length,1);
 assert.ok(readFileSync('dist/sitemap.xml','utf8').includes(`<loc>https://konutseyir.com${path}</loc><lastmod>2026-11-01</lastmod>`));
 // Existing publication metadata must remain untouched by a new daily guide.
 const previous=readFileSync('dist/rehber/kira-carpani-nedir/index.html','utf8');
 assert.match(previous,/"dateModified":"2026-10-16"/);
 assert.doesNotMatch(previous,/"datePublished":"2026-11-01"/);
});
