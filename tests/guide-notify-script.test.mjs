import test from 'node:test';
import assert from 'node:assert/strict';
import {notifyGuidePublications} from '../scripts/notify-guide-publications.mjs';

test('production verifier drains more than six bounded batches without false failure or following redirects',async()=>{
 let calls=0;const messages=[];
 const result=await notifyGuidePublications({buildId:'build',password:'test-only',pause:async()=>{},report:m=>messages.push(m),fetcher:async(url,init)=>{
  calls++;assert.equal(init.redirect,'manual');assert.equal(JSON.parse(init.body).buildId,'build');
  const pending=Math.max(0,100-calls*10);
  return Response.json({ok:true,push:{configured:true,sent:10,failed:0,pending,undelivered:0}},{status:pending?503:200});
 }});
 assert.equal(calls,10);assert.equal(result.push.pending,0);
 assert.equal(JSON.parse(messages.at(-1)).acceptedByPushService,100);
 assert.ok(!messages.some(m=>m.includes('test-only')));
});
test('production verifier reports routing status but never claims an unverified publication',async()=>{
 let calls=0;const messages=[];
 await assert.rejects(notifyGuidePublications({buildId:'build',password:'test-only',pause:async()=>{},report:m=>messages.push(m),fetcher:async()=>{
  calls++;return Response.json({errorCode:'guide_not_live',upstreamStatus:530},{status:503});
 }}),/verification failed/);
 assert.equal(calls,6);assert.ok(messages.every(m=>m.includes('upstream HTTP 530')));
});
test('production verifier rejects missing push keys and permanent delivery failure',async()=>{
 for(const push of [{configured:false,sent:0,failed:0,pending:0,undelivered:0},{configured:true,sent:0,failed:0,pending:0,undelivered:1}]){
  await assert.rejects(notifyGuidePublications({buildId:'build',password:'test-only',pause:async()=>{},report:()=>{},fetcher:async()=>Response.json({ok:true,push},{status:503})}),/verification failed/);
 }
});
