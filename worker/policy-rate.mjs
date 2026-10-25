export const policySourceUrl='https://tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Temel+Faaliyetler/Para+Politikasi/Merkez+Bankasi+Faiz+Oranlari/1+Hafta+Repo';
// Separate observations from the delayed BIS series; no historical records are removed.
export const policyStorageSeries='policy:repo:v1';
export function parsePolicyRate(html,now=Date.now()){
 const tables=String(html).match(/<table\b[^>]*>[\s\S]*?<\/table>/gi)||[];
 const rows=[];
 const text=s=>s.replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ').trim();
 for(const table of tables){
  if(!/Borç\s+Alma/i.test(text(table))||!/Borç\s+Verme/i.test(text(table)))continue;
  for(const row of table.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi)||[]){
   const cells=(row.match(/<td\b[^>]*>[\s\S]*?<\/td>/gi)||[]).map(text);
   const match=cells[0]?.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
   if(!match||cells.length!==3||!/^\d+(?:[.,]\d+)?$/.test(cells[2]))continue;
   const period=`${match[3]}-${match[2]}-${match[1]}`,date=Date.parse(period+'T00:00:00Z'),value=Number(cells[2].replace(',','.'));
   if(!Number.isFinite(date)||new Date(date).toISOString().slice(0,10)!==period||date>now||value<0||value>100)continue;
   rows.push({series:policyStorageSeries,period,value});
  }
 }
 const latest=rows.sort((a,b)=>a.period.localeCompare(b.period)).at(-1);
 if(!latest)throw Error('TCMB repo tablosu doğrulanamadı');
 return latest;
}
export async function refreshPolicyRate(env,{fetchText,save,status}){
 try{const row=parsePolicyRate(await fetchText(policySourceUrl));await save(env,[row]);await status(env,policyStorageSeries,'available');return true}
 catch(error){if(error?.code==='D1_READ_LIMIT')throw error;await status(env,policyStorageSeries,'error');return false}
}
export function policyRefreshDue(status,now=Date.now()){
 const attempted=Date.parse(status?.attempted_at||'');
 return !Number.isFinite(attempted)||now-attempted>=(status?.state==='error'?60*60*1000:6*60*60*1000);
}
