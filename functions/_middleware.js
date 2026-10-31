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
    const assetRequest=new Request(assetUrl,request);
    const response=env?.ASSETS?await env.ASSETS.fetch(assetRequest):await next(assetRequest);
    const headers=new Headers(response.headers);headers.set('X-Robots-Tag','noindex, follow');
    return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  }
  return next();
}
