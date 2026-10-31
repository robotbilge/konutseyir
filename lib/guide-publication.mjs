export const guideOrigin='https://konutseyir.com';
export const guideManifestPath='/guide-publications.json';

export function validateGuideManifest(input){
 if(input?.version!==1||typeof input.buildId!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(input.buildId)||!Array.isArray(input.guides)||!input.guides.length||input.guides.length>2000)throw Error('invalid_guide_manifest');
 const seen=new Set();
 const guides=input.guides.map(item=>{
  if(typeof item.path!=='string'||!/^\/rehber\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(item.path)||seen.has(item.path)||typeof item.title!=='string'||!item.title.trim()||item.title.length>240||typeof item.summary!=='string'||item.summary.length>1200)throw Error('invalid_guide_manifest');
  seen.add(item.path);return {path:item.path,title:item.title,summary:item.summary};
 });
 return {version:1,buildId:input.buildId,guides};
}

// Uniform minute selection in Turkey's [09:00,18:00) publication window.
// The scheduler must actually execute at the returned time; this is not a timer.
export function randomGuidePublicationAt(day,randomInt){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||new Date(day+'T00:00:00Z').toISOString().slice(0,10)!==day)throw Error('invalid_publication_day');
 const minute=randomInt(540);
 if(!Number.isInteger(minute)||minute<0||minute>=540)throw Error('invalid_random_minute');
 return new Date(Date.parse(day+'T06:00:00Z')+minute*60000).toISOString();
}
