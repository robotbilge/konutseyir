import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {setTimeout as delay} from 'node:timers/promises';
import {guideOrigin,validateGuideManifest} from '../lib/guide-publication.mjs';

export async function notifyGuidePublications({buildId,password,fetcher=fetch,pause=delay,clock=Date.now,report=console.log}){
 if(!password)throw Error('NEWS_ADMIN_PASSWORD is required');
 let failures=0,previousPending=Infinity,accepted=0;
 const deadline=clock()+240000;
 while(failures<6&&clock()<deadline){
  try{
   const response=await fetcher(guideOrigin+'/api/admin/guide-publications',{method:'POST',redirect:'manual',headers:{'Content-Type':'application/json','X-Admin-Password':password},body:JSON.stringify({buildId}),signal:AbortSignal.timeout(90000)});
   let result={};try{result=await response.json()}catch{}
   accepted+=Number(result.push?.sent)||0;
   if(response.ok&&result.ok&&result.push?.configured&&result.push.failed===0&&result.push.pending===0&&result.push.undelivered===0){
    report(JSON.stringify({guidePublications:result,acceptedByPushService:accepted}));return result;
   }
   // Continue while bounded batches make progress, including above 60 subscribers.
   const pending=result.push?.pending;
   if(result.ok&&result.push?.configured&&result.push.failed===0&&result.push.undelivered===0&&Number.isSafeInteger(pending)&&pending>0&&pending<previousPending){
    previousPending=pending;report(`Guide push delivery queue: ${pending} remaining`);await pause(250);continue;
   }
   failures++;
   const code=typeof result.errorCode==='string'&&/^[a-z_]{1,80}$/.test(result.errorCode)?result.errorCode:'delivery_incomplete';
   const upstream=Number.isInteger(result.upstreamStatus)?` upstream HTTP ${result.upstreamStatus}`:'';
   report(`Guide publication verification attempt ${failures}: HTTP ${response.status} (${code})${upstream}`);
  }catch{failures++;report(`Guide publication verification attempt ${failures}: request failed`)}
  if(failures<6)await pause(5000);
 }
 throw Error('Pages deployment completed, but guide publication/push verification failed. Inspect the production workflow; do not claim notification delivery.');
}

// Run only after successful production deployment. Never print credentials.
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const manifest=validateGuideManifest(JSON.parse(await readFile('dist/guide-publications.json','utf8')));
 await notifyGuidePublications({buildId:manifest.buildId,password:process.env.NEWS_ADMIN_PASSWORD});
}
