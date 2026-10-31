// Pages can briefly report 404 while a newly uploaded deployment propagates.
// Retry only transient delivery failures; redirects and HTML/SEO assertions
// remain strict. A permanently missing page still fails the workflow.
export async function fetchReady(url,{fetcher=fetch,waiter=ms=>new Promise(resolve=>setTimeout(resolve,ms)),attempts=8}={}){
 const deadline=Date.now()+60000;let last;
 for(let attempt=0;attempt<attempts;attempt++){
  const remaining=deadline-Date.now();if(remaining<=0)break;
  try{last=await fetcher(url,{redirect:'manual',cache:'no-store',signal:AbortSignal.timeout(Math.min(30000,remaining))});if(![404,500,502,503,504].includes(last.status)||attempt===attempts-1)return last;await last.body?.cancel();}
  catch(error){if(attempt===attempts-1)throw error;last=error;}
  if(deadline-Date.now()<5000)break;await waiter(5000);
 }
 if(last instanceof Response)return last;throw last||Error('Deployment readiness deadline exceeded');
}
