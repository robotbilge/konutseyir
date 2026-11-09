import {readFile, writeFile} from 'node:fs/promises';
import {cityHousingSeries} from '../worker/data.mjs';

const snapshotFile=new URL('../lib/city-snapshots.json',import.meta.url);
const origin='https://konutseyir.com';
const month=/^\d{4}-(0[1-9]|1[0-2])$/;
const count=value=>Number.isSafeInteger(value)&&value>=0;
const optionalNumber=value=>Number.isFinite(value)?value:null;
const sourceTime=value=>typeof value==='string'?value.replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/,'$1T$2Z'):null;

function marketSnapshot(data,slug){
 if(data?.slug!==slug||data.source!=='TCMB EVDS'||data.region!==cityHousingSeries[slug].region||
    !['available','cached'].includes(data.status)||!Number.isFinite(data.value)||data.value<=0||
    typeof data.period!=='string'||!month.test(data.period.slice(0,7))||!Number.isFinite(Date.parse(data.period))||
    !Number.isFinite(Date.parse(data.retrievedAt)))return null;
 const {region,value,period,retrievedAt,status}=data;
 return {region,value,period,retrievedAt,status,annualChange:optionalNumber(data.annualChange)};
}

function salesSnapshot(data,slug){
 if(data?.slug!==slug||data.source!=='TÜİK'||data.status!=='available'||!month.test(data.period)||
    !Number.isFinite(Date.parse(data.retrievedAt))||
    ![data.total,data.mortgaged,data.firstSale,data.secondHand].every(count)||
    data.mortgaged>data.total||data.firstSale+data.secondHand!==data.total)return null;
 const {total,mortgaged,firstSale,secondHand,period,retrievedAt,status}=data;
 return {total,mortgaged,firstSale,secondHand,period,retrievedAt,status,monthlyChange:optionalNumber(data.monthlyChange),annualChange:optionalNumber(data.annualChange)};
}

function districtSnapshot(data,slug){
 if(data?.city!==slug||data.source!=='TÜİK'||!Array.isArray(data.items))return null;
 const latestCityPeriod=month.test(data.latestCityPeriod)?data.latestCityPeriod:null;
 if(data.status==='unavailable'&&data.items.length===0)return {status:'unavailable',period:null,latestCityPeriod,retrievedAt:null,items:[]};
 if(!['available','stale'].includes(data.status)||!month.test(data.period)||
    !Number.isFinite(Date.parse(sourceTime(data.retrievedAt)))||
    !data.items.length||data.items.length>20||
    !data.items.every(row=>row.period===data.period&&typeof row.districtName==='string'&&row.districtName.trim()&&count(row.total)))return null;
 const {period,status}=data;
 return {period,retrievedAt:sourceTime(data.retrievedAt),status,latestCityPeriod,items:data.items.map(({districtName,total})=>({districtName,total}))};
}

async function get(path,validate,slug){
 try{
  const response=await fetch(origin+'/api/'+path,{redirect:'error',signal:AbortSignal.timeout(12000)});
  if(!response.ok)return null;
  return validate(await response.json(),slug);
 }catch{return null}
}

function latest(current,previous){
 return current&&(!previous?.period||(current.period&&current.period>=previous.period))?current:previous??null;
}

const stored=JSON.parse(await readFile(snapshotFile,'utf8'));
const next={};
for(const slug of Object.keys(cityHousingSeries)){
 const [market,sales,districts]=await Promise.all([
  get('city-market?slug='+slug,marketSnapshot,slug),
  get('city-sales?slug='+slug,salesSnapshot,slug),
  get('district-sales?city='+slug,districtSnapshot,slug)
 ]);
 const previous=stored[slug];
 next[slug]={market:latest(market,previous?.market),sales:latest(sales,previous?.sales),districts:latest(districts,previous?.districts)};
 const entry=next[slug];
 if(entry.districts?.period&&entry.sales?.period>entry.districts.period){
  entry.districts={...entry.districts,status:'stale',latestCityPeriod:entry.sales.period};
 }
 console.log(slug,entry.market?.period??'KFE yok',entry.sales?.period??'il satışı yok',entry.districts?.period??'ilçe kırılımı yok');
}
await writeFile(snapshotFile,'{\n'+Object.entries(next).map(([slug,data])=>'  '+JSON.stringify(slug)+': '+JSON.stringify(data)).join(',\n')+'\n}\n');
