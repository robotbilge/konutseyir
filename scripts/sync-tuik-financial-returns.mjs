import {readFile,writeFile} from 'node:fs/promises';
import {parseFinancialReturnsCsv,financialReturnsSql} from '../worker/financial-returns.mjs';

const file=process.env.TUIK_FINANCIAL_RETURNS_CSV||'tuik-financial-returns.csv';
const csv=await readFile(file,'utf8');
let rows;
try{rows=parseFinancialReturnsCsv(csv,new Date().toISOString())}
catch(error){
 const sample=csv.replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean).slice(0,4);
 console.error('TÜİK dışa aktarım şeması (başlık ve en çok üç örnek satır):',JSON.stringify(sample));
 throw error;
}
await writeFile('tuik-financial-returns.sql',financialReturnsSql(rows));
console.log(`${rows.length} TÜİK finansal getiri kaydı doğrulandı; dönem ${rows[0]?.period}.`);
