import test from 'node:test';
import assert from 'node:assert/strict';
import {assetRequest,secureHtml} from '../lib/security-headers.mjs';
// Test double checks the handler contract; deployed HTMLRewriter is additionally
// exercised by the preview and live HTTP smoke checks.
globalThis.HTMLRewriter=class{
 on(selector,handler){assert.equal(selector,'script');this.handler=handler;return this}
 transform(response){const handler=this.handler;return new Response(new ReadableStream({async start(controller){const body=await response.text();controller.enqueue(new TextEncoder().encode(body.replace(/<script\b/g,tag=>{let nonce;handler.element({setAttribute(name,value){assert.equal(name,'nonce');nonce=value}});return tag+' nonce="'+nonce+'"'})));controller.close()}}),response)}
};
test('fresh CSP nonce is paired with every trusted script and never cached or revalidated',async()=>{
 const input=()=>new Response('<html><script src="/assets/app.js"></script><script>trusted()</script></html>',{headers:{'Content-Type':'text/html','ETag':'old','Last-Modified':'yesterday','Cache-Control':'public, max-age=3600'}});
 const first=secureHtml(input()),second=secureHtml(input());const policy=first.headers.get('content-security-policy'),nonce=policy.match(/'nonce-([^']+)'/)[1];
 assert.notEqual(policy,second.headers.get('content-security-policy'));assert.equal(first.headers.get('cache-control'),'no-store');assert.equal(first.headers.get('etag'),null);assert.equal(first.headers.get('last-modified'),null);
 assert.equal((await first.text()).split('nonce="'+nonce+'"').length-1,2);assert.match(policy,/object-src 'none'/);assert.match(policy,/ep1\.adtrafficquality\.google/);assert.match(policy,/static\.cloudflareinsights\.com/);assert.doesNotMatch(policy,/script-src[^;]*'unsafe-inline'/);
 const request=assetRequest(new Request('https://example.com/haber.html?slug=1',{headers:{'If-None-Match':'old','If-Modified-Since':'yesterday','Accept':'text/html'}}));assert.equal(request.headers.get('if-none-match'),null);assert.equal(request.headers.get('if-modified-since'),null);assert.equal(request.headers.get('accept'),'text/html');assert.equal(new URL(request.url).search,'?slug=1');
 const json=Response.json({ok:true});assert.equal(secureHtml(json),json);
});
