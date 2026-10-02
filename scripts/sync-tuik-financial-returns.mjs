import {readFile,writeFile} from 'node:fs/promises';
import {parseFinancialReturnsCsv,financialReturnsSql} from '../worker/financial-returns.mjs';

const file=process.env.TUIK_FINANCIAL_RETURNS_CSV||'tuik-financial-returns.csv';
const csv=await readFile(file,'utf8');
let rows;
try{rows=parseFinancialReturnsCsv(csv,new Date().toISOString())}
catch(error){
 const lines=csv.replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean),headers=lines[0]?.split(',')||[];
 const sample=lines.slice(1,4),dimensions=['INDICATOR','GETIRI','DONEM','DEGISIM','FREQ','OLCU_BIRIMI'];
 const codes=Object.fromEntries(dimensions.map(key=>{
  const index=headers.indexOf(key);
  const values=index<0?[]:lines.slice(1).map(line=>line.split(',')[index]).filter(Boolean);
  return [key,[...new Set(values)]];
 }));
 console.error('TÜİK dışa aktarım şeması (başlık, kod kümeleri ve en çok üç örnek satır):',JSON.stringify({headers,codes,sample}));
 throw error;
}
await writeFile('tuik-financial-returns.sql',financialReturnsSql(rows));
console.log(`${rows.length} TÜİK finansal getiri kaydı doğrulandı; dönem ${rows[0]?.period}.`);
