// Keep the existing host restrictions; allow only the services already used by
// the site. A fresh nonce permits trusted HTML scripts, including AdSense's
// nonce-aware loader, without enabling arbitrary inline JavaScript.
export const contentSecurityPolicy = nonce => `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://*.google.com https://*.gstatic.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://api.altinseyir.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.google.com https://*.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://cloudflareinsights.com; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://fundingchoicesmessages.google.com https://*.google.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'`;
export function assetRequest(request,url=request.url){
 const path=new URL(url).pathname;
 if(path.startsWith('/api/')||/\.[a-z0-9]+$/i.test(path)&&!path.endsWith('.html'))return new Request(url,request);
 const headers=new Headers(request.headers);headers.delete('if-none-match');headers.delete('if-modified-since');
 return new Request(url,{...request,method:request.method,headers,redirect:request.redirect});
}
export function secureHtml(response){
 if(!response.headers.get('content-type')?.includes('text/html')||response.status===304)return response;
 const nonce=btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(18))));
 const headers=new Headers(response.headers);headers.set('Content-Security-Policy',contentSecurityPolicy(nonce));
 // Nonce and body must always be delivered together, including revalidation.
 headers.set('Cache-Control','no-store');for(const name of ['etag','last-modified','content-length'])headers.delete(name);
 const fresh=new Response(response.body,{status:response.status,statusText:response.statusText,headers});
 return new HTMLRewriter().on('script',{element(element){element.setAttribute('nonce',nonce)}}).transform(fresh);
}
