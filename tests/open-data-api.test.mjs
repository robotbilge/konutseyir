import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.mjs';

test('environment endpoint validates coordinates before calling public service',async()=>{
 const original=globalThis.fetch;let called=0;globalThis.fetch=async()=>{called++;return new Response('{}')};
 try{const response=await worker.fetch(new Request('https://konutseyir.com/api/nearby-places',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lat:120,lon:30})}),{});assert.equal(response.status,400);assert.equal(called,0)}finally{globalThis.fetch=original}
});
test('environment endpoint requests a bounded user-selected Overpass radius and reports JSON',async()=>{
 const original=globalThis.fetch;let outgoing;globalThis.fetch=async(url,init)=>{outgoing={url:String(url),init};return new Response(JSON.stringify({elements:[]}),{headers:{'Content-Type':'application/json'}})};
 try{const response=await worker.fetch(new Request('https://konutseyir.com/api/nearby-places',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lat:41.0082,lon:28.9784,radius:9000})}),{});const body=await response.json();assert.equal(response.status,200);assert.deepEqual(body,{elements:[]});assert.match(outgoing.url,/overpass-api\.de/);assert.match(decodeURIComponent(outgoing.init.body.toString()),/around:1200/);assert.match(response.headers.get('Cache-Control'),/max-age=21600/)}finally{globalThis.fetch=original}
});
test('AFAD proxy clamps output period and uses official event service',async()=>{
 const original=globalThis.fetch;let target='';globalThis.fetch=async url=>{target=String(url);return new Response(JSON.stringify([]),{headers:{'Content-Type':'application/json'}})};
 try{const response=await worker.fetch(new Request('https://konutseyir.com/api/nearby-quakes?lat=41.01&lon=28.97'),{});assert.equal(response.status,200);assert.deepEqual(await response.json(),[]);assert.match(target,/deprem\.afad\.gov\.tr\/apiv2\/event\/filter/);assert.match(target,/maxrad=25000/);assert.match(target,/limit=100/)}finally{globalThis.fetch=original}
});
