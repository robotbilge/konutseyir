import {readdir,readFile,writeFile} from 'node:fs/promises';
import {parseTuikSales,salesSql} from '../worker/tuik.mjs';

const directory=process.env.TUIK_CSV_DIR||'tuik-data';
const files=(await readdir(directory)).filter(name=>name.endsWith('.csv')).sort();if(!files.length)throw Error('TÜİK CSV dosyası yok');
const csvParts=[];for(const file of files){const text=await readFile(`${directory}/${file}`,'utf8');csvParts.push(csvParts.length?text.split(/\r?\n/).slice(1).join('\n'):text)}
const rows=parseTuikSales(csvParts.join('\n'));await writeFile('tuik-city-sales.sql',salesSql(rows));console.log(`${rows.length} doğrulanmış şehir-ay kaydı hazırlandı; son dönem ${rows.at(-1)?.period}.`);
