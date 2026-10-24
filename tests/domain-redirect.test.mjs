import {test} from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/_middleware.js';

test('redirects www to canonical host and preserves path and query',async()=>{
  const request=new Request('https://www.konutseyir.com/hesaplama/kira-artis-orani/?month=2026-10');
  const response=await onRequest({request,next:()=>new Response('should not continue')});
  assert.equal(response.status,301);
  assert.equal(response.headers.get('location'),'https://konutseyir.com/hesaplama/kira-artis-orani/?month=2026-10');
});

test('leaves canonical host to normal Pages routing',async()=>{
  const expected=new Response('next');
  const response=await onRequest({request:new Request('https://konutseyir.com/'),next:()=>expected});
  assert.equal(response,expected);
});

test('does not redirect unrelated hosts',async()=>{
  const expected=new Response('next');
  const response=await onRequest({request:new Request('https://example.com/'),next:()=>expected});
  assert.equal(response,expected);
});
