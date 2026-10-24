export async function onRequest({request,next}) {
  const url=new URL(request.url);
  if(url.hostname.toLowerCase()==='www.konutseyir.com'){
    url.hostname='konutseyir.com';
    return Response.redirect(url.toString(),301);
  }
  return next();
}
