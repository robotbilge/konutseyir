import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {render,paths,meta} from '../.render/server.js';
const base='https://konutseyir.com',template=await readFile('dist/index.html','utf8');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const path of [...paths,'/404']){const m=meta(path),html=template.replace('<!--app-->',await render(path)).replace('<!--meta-->',`<title>${esc(m.title)}</title><meta name="description" content="${esc(m.description)}"/><link rel="canonical" href="${base}${path==='/'?'':path}"/><meta name="robots" content="${m.noindex?'noindex,follow':'index,follow'}"/><meta property="og:title" content="${esc(m.title)}"/><meta property="og:description" content="${esc(m.description)}"/><meta property="og:url" content="${base}${path==='/'?'':path}"/><meta property="og:type" content="website"/>`);const dir=path==='/'?'dist':`dist${path}`;if(path==='/404'){await writeFile('dist/404.html',html);continue}await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,html)}
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.filter(p=>!meta(p).noindex).map(p=>`<url><loc>${base}${p==='/'?'':p}</loc></url>`).join('')}</urlset>`);
console.log(`Prerendered ${paths.length} pages plus 404`);
