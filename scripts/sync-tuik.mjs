import {writeFile} from 'node:fs/promises';
import {parseTuikSales,salesSql} from '../worker/tuik.mjs';

const apiKey=String(process.env.TUIK_API_KEY||'').trim();if(!apiKey)throw Error('TUIK_API_KEY eksik');
const form=new URLSearchParams({grant_type:'password',client_id:'nsi-ws-consumer',api_key:apiKey});
const tokenResponse=await fetch('https://giris.tuik.gov.tr/realms/web/protocol/openid-connect/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},body:form,signal:AbortSignal.timeout(45000)});
if(!tokenResponse.ok)throw Error(`TÜİK token HTTP ${tokenResponse.status}`);const token=String((await tokenResponse.json()).access_token||'');if(!token)throw Error('TÜİK token boş');
const now=new Date(),start=`${now.getUTCFullYear()-2}-${String(now.getUTCMonth()+1).padStart(2,'0')}`,end=`${now.getUTCFullYear()}-${String(now.getUTCMonth()+1).padStart(2,'0')}`;
const dataResponse=await fetch(`https://nsiws.tuik.gov.tr/rest/data/TR,DF_SATIS_SEKLI_DURUMU_ILILCE_V3,1.0/?startPeriod=${start}&endPeriod=${end}`,{headers:{Authorization:`Bearer ${token}`,Accept:'text/csv'},signal:AbortSignal.timeout(90000)});
if(!dataResponse.ok)throw Error(`TÜİK veri HTTP ${dataResponse.status}`);const rows=parseTuikSales(await dataResponse.text());await writeFile('tuik-city-sales.sql',salesSql(rows));console.log(`${rows.length} doğrulanmış şehir-ay kaydı hazırlandı; son dönem ${rows.at(-1)?.period}.`);
