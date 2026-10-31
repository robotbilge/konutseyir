import {isNewsDetailPath} from '../lib/news-policy.mjs';
export async function onRequest({request,next}) {
  const url=new URL(request.url);
  if(url.hostname.toLowerCase()==='www.konutseyir.com'){
    url.hostname='konutseyir.com';
    return Response.redirect(url.toString(),301);
  }
  const response=await next();
  if(isNewsDetailPath(url.pathname)){
    const headers=new Headers(response.headers);headers.set('X-Robots-Tag','noindex, follow');
    return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  }
  return response;
}
