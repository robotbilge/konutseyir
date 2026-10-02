import {readFile,writeFile} from 'node:fs/promises';
import {parseFinancialReturnsCsv,financialReturnsSql} from '../worker/financial-returns.mjs';

const file=process.env.TUIK_FINANCIAL_RETURNS_CSV||'tuik-financial-returns.csv';
const csv=await readFile(file,'utf8');
const rows=parseFinancialReturnsCsv(csv,new Date().toISOString());
await writeFile('tuik-financial-returns.sql',financialReturnsSql(rows));
console.log(`${rows.length} TÜİK finansal getiri kaydı doğrulandı; dönem ${rows[0]?.period}.`);
