import {readFile} from 'node:fs/promises';
import {setTimeout as delay} from 'node:timers/promises';
import {guideOrigin,validateGuideManifest} from '../lib/guide-publication.mjs';

// Run only after successful production Pages deployment. Never print credentials.
const manifest=validateGuideManifest(JSON.parse(await readFile('dist/guide-publications.json','utf8')));
if(!process.env.NEWS_ADMIN_PASSWORD)throw Error('NEWS_ADMIN_PASSWORD is required');
let success=false;
for(let attempt=0;attempt<6;attempt++){
 try{
  const response=await fetch(guideOrigin+'/api/admin/guide-publications',{method:'POST',headers:{'Content-Type':'application/json','X-Admin-Password':process.env.NEWS_ADMIN_PASSWORD},body:JSON.stringify({buildId:manifest.buildId}),signal:AbortSignal.timeout(90000)});
  if(response.ok){const result=await response.json();console.log(JSON.stringify({guidePublications:result}));success=true;break}
  console.error(`Guide publication verification attempt ${attempt+1}: HTTP ${response.status}`);
 }catch{console.error(`Guide publication verification attempt ${attempt+1}: request failed`)}
 if(attempt<5)await delay(5000);
}
if(!success)throw Error('Pages deployment completed, but guide publication/push verification failed. Inspect the production workflow; do not claim notification delivery.');
