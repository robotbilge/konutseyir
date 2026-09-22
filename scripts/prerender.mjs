import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {render,paths,meta} from '../.render/server.js';
const base='https://konutseyir.com',template=await readFile('dist/index.html','utf8');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const label=part=>decodeURIComponent(part).replaceAll('-',' ').replace(/(^|\s)\S/g,c=>c.toLocaleUpperCase('tr-TR'));
const jsonLd=(path,m)=>{
 const url=`${base}${path==='/'?'':path}`,parts=path.split('/').filter(Boolean),items=[{'@type':'Organization','@id':`${base}/#organization`,name:'KonutSeyir',url:base,email:'iletisim@konutseyir.com',logo:`${base}/icon-512.png`},{'@type':'WebSite','@id':`${base}/#website`,name:'KonutSeyir',url:base,publisher:{'@id':`${base}/#organization`}}];
 if(parts.length)items.push({'@type':'BreadcrumbList',itemListElement:[{position:1,name:'Ana sayfa',item:base},...parts.map((part,index)=>({'@type':'ListItem',position:index+2,name:label(part),item:`${base}/${parts.slice(0,index+1).join('/')}`}))]});
 if(path.startsWith('/rehber/'))items.push({'@type':'Article',headline:m.title,description:m.description,mainEntityOfPage:url,dateModified:'2026-09-22',author:{'@id':`${base}/#organization`},publisher:{'@id':`${base}/#organization`}});
 return JSON.stringify({'@context':'https://schema.org','@graph':items}).replaceAll('<','\\u003c');
};
for(const path of [...paths,'/404']){const m=meta(path),url=`${base}${path==='/'?'':path}`,head=`<title>${esc(m.title)}</title><meta name="description" content="${esc(m.description)}"/><link rel="canonical" href="${url}"/><meta name="robots" content="${m.noindex?'noindex,follow':'index,follow'}"/><meta property="og:title" content="${esc(m.title)}"/><meta property="og:description" content="${esc(m.description)}"/><meta property="og:url" content="${url}"/><meta property="og:type" content="${path.startsWith('/rehber/')?'article':'website'}"/><script type="application/ld+json">${jsonLd(path,m)}</script>`,html=template.replace('<!--app-->',await render(path)).replace('<!--meta-->',head);const dir=path==='/'?'dist':`dist${path}`;if(path==='/404'){await writeFile('dist/404.html',html);continue}await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,html)}
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.filter(p=>!meta(p).noindex).map(p=>`<url><loc>${base}${p==='/'?'':p}</loc></url>`).join('')}</urlset>`);
console.log(`Prerendered ${paths.length} pages plus 404`);
