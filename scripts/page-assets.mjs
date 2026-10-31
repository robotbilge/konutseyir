// Resolve only this page's static dependency graph; never preload other routes.
export function routeSource(path){
 if(path==='/'||path==='/404')return null;
 if(path.startsWith('/rehber/'))return 'app/rehber/[slug]/page.tsx';
 if(path.startsWith('/sehirler/'))return 'app/sehirler/[slug]/page.tsx';
 return 'app'+path.replace(/\/+$/,'')+'/page.tsx';
}
export function pageAssetTags(path,manifest,template=''){
 const source=routeSource(path);if(!source)return '';
 if(!manifest[source])throw Error('Page build entry missing: '+source);
 const seen=new Set(),css=new Set(),modules=new Set();
 function visit(key){if(seen.has(key))return;seen.add(key);const chunk=manifest[key];if(!chunk)throw Error('Missing build dependency: '+key);for(const file of chunk.css||[])if(!template.includes('href="/'+file+'"'))css.add(file);if(chunk.file?.endsWith('.js'))modules.add(chunk.file);for(const item of chunk.imports||[])visit(item)}
 visit(source);
 const safe=file=>{if(!/^assets\/[a-zA-Z0-9_./-]+$/.test(file))throw Error('Invalid build asset');return '/'+file};
 return [...css].map(file=>'<link rel="stylesheet" href="'+safe(file)+'">').join('')+[...modules].map(file=>'<link rel="modulepreload" href="'+safe(file)+'">').join('');
}
