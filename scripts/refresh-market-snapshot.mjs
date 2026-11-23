import {readFile,writeFile} from 'node:fs/promises';

const output=new URL('../lib/market-snapshot.json',import.meta.url);
const sourceUrl=process.env.MARKET_SNAPSHOT_URL||'https://konutseyir.com/api/market-data';
const required=['policy','cpi'];

function normalize(payload){
 if(!Array.isArray(payload?.data))throw Error('Market data response has no data array');
 const optionalNumber=value=>value===null||value===undefined||value===''?null:Number.isFinite(Number(value))?Number(value):null;
 const data=payload.data.flatMap(item=>{
  if(!item||typeof item.series!=='string'||!Number.isFinite(Number(item.value))||!/^\d{4}-\d{2}-\d{2}$/.test(item.period||'')||!Number.isFinite(Date.parse(item.retrievedAt)))return [];
  return [{series:item.series,value:Number(item.value),period:item.period,status:'available',annualChange:optionalNumber(item.annualChange),twelveMonthAverage:optionalNumber(item.twelveMonthAverage),twelveMonthAveragePeriod:item.twelveMonthAveragePeriod||null,retrievedAt:item.retrievedAt}];
 });
 for(const series of required)if(!data.some(item=>item.series===series))throw Error(`Verified ${series} observation is missing`);
 return {version:1,generatedAt:new Date().toISOString(),sourceUrl,data};
}

async function currentFallback(){
 const stored=JSON.parse(await readFile(output,'utf8'));
 normalize(stored);
 return stored;
}

try{
 const response=await fetch(sourceUrl,{headers:{accept:'application/json'},signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error(`Market API returned ${response.status}`);
 const snapshot=normalize(await response.json());
 await writeFile(output,JSON.stringify(snapshot,null,2)+'\n');
 console.log(`Refreshed market snapshot with ${snapshot.data.length} verified observations`);
}catch(error){
 const fallback=await currentFallback();
 console.warn(`Market snapshot refresh failed; keeping ${fallback.generatedAt} fallback: ${error instanceof Error?error.message:String(error)}`);
}
