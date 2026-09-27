import {readdir,readFile,writeFile} from 'node:fs/promises';
import {parseTuikSales,salesSql,parseTuikDistrictSales,districtSalesSql} from '../worker/tuik.mjs';

const directory=process.env.TUIK_CSV_DIR||'tuik-data';
const files=(await readdir(directory)).filter(name=>name.endsWith('.csv')).sort();if(!files.length)throw Error('TÜİK CSV dosyası yok');
const csvParts=[];for(const file of files){const text=await readFile(`${directory}/${file}`,'utf8');csvParts.push(csvParts.length?text.split(/\r?\n/).slice(1).join('\n'):text)}
const rows=parseTuikSales(csvParts.join('\n'));await writeFile('tuik-city-sales.sql',salesSql(rows));console.log(`${rows.length} doğrulanmış şehir-ay kaydı hazırlandı; son dönem ${rows.at(-1)?.period}.`);

const combinedCsv=csvParts.join('\n'),embeddedDistrictRows=parseTuikDistrictSales(combinedCsv);
if(embeddedDistrictRows.length){await writeFile('tuik-district-sales.sql',districtSalesSql(embeddedDistrictRows));console.log(`${embeddedDistrictRows.length} doğrulanmış ilçe-ay kaydı ana TÜİK dosyasından hazırlandı.`)}


// İlçe veri seti ayrı indirildiyse aynı senkronizasyon akışında D1 SQL üret.
try{const districtDirectory=process.env.TUIK_DISTRICT_CSV_DIR||'tuik-district-data',districtFiles=(await readdir(districtDirectory)).filter(name=>name.endsWith('.csv')).sort();if(districtFiles.length){const parts=[];for(const file of districtFiles){const source=await readFile(`${districtDirectory}/${file}`,'utf8');parts.push(parts.length?source.split(/\r?\n/).slice(1).join('\n'):source)}const districtRows=parseTuikDistrictSales(parts.join('\n'));if(districtRows.length){await writeFile('tuik-district-sales.sql',districtSalesSql(districtRows));console.log(`${districtRows.length} doğrulanmış ilçe-ay kaydı ayrı TÜİK dosyasından hazırlandı.`)}}}catch(error){if(error?.code!=='ENOENT')throw error}
