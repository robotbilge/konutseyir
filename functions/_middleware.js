import {assetRequest,secureHtml} from '../lib/security-headers.mjs';
import {isNewsPath,isNewsListPath} from '../lib/news-policy.mjs';
export async function onRequest({request,next,env}) {
  const url=new URL(request.url);
  if(url.hostname.toLowerCase()==='www.konutseyir.com'){
    url.hostname='konutseyir.com';url.protocol='https:';
    return Response.redirect(url.toString(),301);
  }
  if(isNewsPath(url.pathname)){
    // Serve existing news aliases internally; never redirect a news URL.
    const assetUrl=new URL(url);assetUrl.pathname=isNewsListPath(url.pathname)?'/haberler/':'/haberler/haber/';
    const targetRequest=assetRequest(request,assetUrl);
    const response=env?.ASSETS?await env.ASSETS.fetch(targetRequest):await next(targetRequest);
    const headers=new Headers(response.headers);headers.set('X-Robots-Tag','noindex, follow');
    return secureHtml(new Response(response.body,{status:response.status,statusText:response.statusText,headers}));
  }
  return secureHtml(await next(assetRequest(request)));
}
