import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {paths,meta} from '../.render/server.js';

const origin='https://konutseyir.com';
const canonicalPath=path=>path==='/'?'/':path.replace(/\/+$/,'')+'/';
const htmlFile=path=>path==='/'?'dist/index.html':`dist${path}/index.html`;
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(match=>[match[1].toLowerCase(),match[2]]));
const tags=(html,name)=>[...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match=>attrs(match[0]));
const canonical=html=>tags(html,'link').find(tag=>tag.rel==='canonical')?.href;
const robots=html=>tags(html,'meta').find(tag=>tag.name?.toLowerCase()==='robots')?.content?.toLowerCase();
const description=html=>tags(html,'meta').find(tag=>tag.name?.toLowerCase()==='description')?.content?.trim();
const title=html=>html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();

test('sitemap is the exact set of canonical indexable routes',()=>{
 const sitemap=readFileSync('dist/sitemap.xml','utf8');
 assert.match(sitemap,/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
 const actual=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
 const expected=paths.filter(path=>!meta(path).noindex).map(path=>origin+canonicalPath(path));
 assert.deepEqual(actual,expected);
 assert.equal(new Set(actual).size,actual.length,'sitemap contains duplicate URLs');
 for(const value of actual){
  const url=new URL(value);
  assert.equal(url.origin,origin);
  assert.equal(url.search,'');
  assert.equal(url.hash,'');
  assert.ok(url.pathname==='/'||url.pathname.endsWith('/'),`${value}: canonical slash missing`);
 }
});

test('every sitemap route has complete unique metadata in first HTML',()=>{
 const titles=new Map(),descriptions=new Map();
 for(const path of paths.filter(path=>!meta(path).noindex)){
  const expectedCanonical=origin+canonicalPath(path);
  const html=readFileSync(htmlFile(path),'utf8');
  assert.equal(canonical(html),expectedCanonical,`${path}: canonical mismatch`);
  assert.equal(tags(html,'meta').find(tag=>tag.property==='og:url')?.content,expectedCanonical,`${path}: og:url mismatch`);
  assert.equal(robots(html),'index,follow',`${path}: robots mismatch`);
  assert.ok(title(html),`${path}: title missing`);
  assert.ok(description(html),`${path}: description missing`);
  assert.match(html,/<h1\b/i,`${path}: h1 missing`);
  titles.set(title(html),[...(titles.get(title(html))||[]),path]);
  descriptions.set(description(html),[...(descriptions.get(description(html))||[]),path]);
 }
 assert.deepEqual([...titles].filter(([,routePaths])=>routePaths.length>1),[],'duplicate titles');
 assert.deepEqual([...descriptions].filter(([,routePaths])=>routePaths.length>1),[],'duplicate descriptions');
});

test('noindex routes stay crawlable but remain outside the sitemap',()=>{
 const sitemap=readFileSync('dist/sitemap.xml','utf8');
 const robotsFile=readFileSync('dist/robots.txt','utf8');
 for(const path of paths.filter(path=>meta(path).noindex)){
  const html=readFileSync(htmlFile(path),'utf8');
  assert.equal(robots(html),'noindex,follow',`${path}: noindex,follow missing`);
  assert.doesNotMatch(sitemap,new RegExp(`<loc>${origin.replaceAll('.','\\.')}${canonicalPath(path)}`));
 }
 assert.doesNotMatch(robotsFile,/Disallow:\s*\/haberler/i,'noindex pages must stay crawlable');
 assert.match(robotsFile,new RegExp(`Sitemap: ${origin.replaceAll('.','\\.')}\/sitemap\\.xml`));
});
