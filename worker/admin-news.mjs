const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const constantTimeEqual=(left,right)=>{if(left.length!==right.length)return false;let mismatch=0;for(let i=0;i<left.length;i++)mismatch|=left.charCodeAt(i)^right.charCodeAt(i);return mismatch===0};
const validDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+'T00:00:00Z'));

export async function adminNewsRequest(request,env,url=new URL(request.url)){
 if(request.method!=='GET'&&request.method!=='DELETE')return json({error:'Method not allowed'},405);
 if(!env.NEWS_ADMIN_PASSWORD)return json({error:'admin_password_not_configured'},503);
 if(!env.DB)return json({error:'database_not_configured'},503);
 const ip=request.headers.get('CF-Connecting-IP')||'unknown',now=Date.now(),windowMs=15*60*1000;
 try{
  await env.DB.prepare('DELETE FROM admin_login_attempts WHERE window_started_at < ?').bind(now-windowMs).run();
  const attempts=await env.DB.prepare('SELECT attempts,window_started_at windowStartedAt FROM admin_login_attempts WHERE ip=?').bind(ip).first();
  if(attempts&&now-Number(attempts.windowStartedAt)<windowMs&&Number(attempts.attempts)>=8)return json({error:'too_many_attempts'},429);
  const supplied=request.headers.get('X-Admin-Password')||'';
  if(!constantTimeEqual(supplied,String(env.NEWS_ADMIN_PASSWORD))){
   if(attempts&&now-Number(attempts.windowStartedAt)<windowMs)await env.DB.prepare('UPDATE admin_login_attempts SET attempts=attempts+1 WHERE ip=?').bind(ip).run();
   else await env.DB.prepare('INSERT INTO admin_login_attempts(ip,attempts,window_started_at) VALUES(?,1,?) ON CONFLICT(ip) DO UPDATE SET attempts=1,window_started_at=excluded.window_started_at').bind(ip,now).run();
   return json({error:'invalid_password'},401);
  }
  await env.DB.prepare('DELETE FROM admin_login_attempts WHERE ip=?').bind(ip).run();
  if(request.method==='GET'){
   const rawLimit=Number.parseInt(url.searchParams.get('limit')||'50',10),limit=Math.min(Math.max(Number.isFinite(rawLimit)?rawLimit:50,1),100),rawOffset=Number.parseInt(url.searchParams.get('offset')||'0',10),offset=Math.min(Math.max(Number.isFinite(rawOffset)?rawOffset:0,0),10000),date=url.searchParams.get('date')||'';
   if(date&&!validDate(date))return json({error:'invalid_date'},400);
   const where=date?' WHERE substr(published_at,1,10)=?':'',countStmt=env.DB.prepare('SELECT COUNT(*) count FROM news'+where),listStmt=env.DB.prepare('SELECT slug,title,summary,source_name sourceName,source_url sourceUrl,published_at publishedAt,category FROM news'+where+' ORDER BY published_at DESC LIMIT ? OFFSET ?');
   const countRow=date?await countStmt.bind(date).first():await countStmt.first(),list=date?await listStmt.bind(date,limit,offset).all():await listStmt.bind(limit,offset).all(),items=list.results||[],total=Number(countRow?.count)||0;
   return json({items,total,limit,offset,hasMore:offset+items.length<total,date:date||null});
  }
  let slug='';try{slug=decodeURIComponent(url.pathname.slice('/api/admin/news/'.length))}catch{return json({error:'invalid_slug'},400)}
  if(!slug||slug.length>160||slug.includes('/'))return json({error:'invalid_slug'},400);
  const result=await env.DB.prepare('DELETE FROM news WHERE slug=?').bind(slug).run();
  if(!result.meta?.changes)return json({error:'news_not_found'},404);
  return json({ok:true,slug,deleted:result.meta.changes});
 }catch(error){console.error('Admin news operation failed',error?.message||'unknown');return json({error:'admin_news_unavailable'},503)}
}
