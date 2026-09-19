import {writeFile} from 'node:fs/promises';
import {parseTuikSales,salesSql} from '../worker/tuik.mjs';

const apiKey=String(process.env.TUIK_API_KEY||'').trim();if(!apiKey)throw Error('TUIK_API_KEY eksik');
const form=new URLSearchParams({grant_type:'password',client_id:'nsi-ws-consumer',api_key:apiKey});
const tokenResponse=await fetch('https://giris.tuik.gov.tr/realms/web/protocol/openid-connect/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},body:form,signal:AbortSignal.timeout(45000)});
if(!tokenResponse.ok)throw Error(`TÜİK token HTTP ${tokenResponse.status}`);const token=String((await tokenResponse.json()).access_token||'');if(!token)throw Error('TÜİK token boş');
const now=new Date(),months=[];for(let offset=1;offset<=13;offset++){const date=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()-offset,1));months.unshift(`${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}`)}
const csvParts=[];for(const period of months){const response=await fetch(`https://nsiws.tuik.gov.tr/rest/data/TR,DF_SATIS_SEKLI_DURUMU_ILILCE_V3,1.0/?startPeriod=${period}&endPeriod=${period}`,{headers:{Authorization:`Bearer ${token}`,Accept:'text/csv'},signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error(`TÜİK veri ${period} HTTP ${response.status}`);const text=await response.text();csvParts.push(csvParts.length?text.split(/\r?\n/).slice(1).join('\n'):text)}
const rows=parseTuikSales(csvParts.join('\n'));await writeFile('tuik-city-sales.sql',salesSql(rows));console.log(`${rows.length} doğrulanmış şehir-ay kaydı hazırlandı; son dönem ${rows.at(-1)?.period}.`);
