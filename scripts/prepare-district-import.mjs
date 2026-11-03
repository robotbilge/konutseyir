import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

export const allowedCities=new Set(['istanbul','ankara','izmir','adana','antalya','bursa','kocaeli','konya','gaziantep','trabzon','balikesir','mugla']);
const headers=['city_slug','district_name','period','total','source_url'];
const quoted=v=>"'"+String(v).replaceAll("'","''")+"'";
export function parseCsv(raw){
 const text=raw.replace(/^\uFEFF/,'').replaceAll('\r\n','\n');
 const delimiter=text.split('\n',1)[0].includes(';')?';':',';
 const result=[];let row=[],cell='',quotedCell=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(c==='"'){
   if(quotedCell&&text[i+1]==='"'){cell+='"';i++;}
   else quotedCell=!quotedCell;
  }else if(!quotedCell&&c===delimiter){row.push(cell);cell='';}
  else if(!quotedCell&&c==='\n'){row.push(cell);if(row.some(x=>x.trim()))result.push(row);row=[];cell='';}
  else cell+=c;
 }
 if(quotedCell)throw Error('CSV tırnakları kapatılmamış');
 row.push(cell);if(row.some(x=>x.trim()))result.push(row);
 return result;
}
export function prepareDistrictSql(raw){
 const rows=parseCsv(raw);if(rows.length<2)throw Error('İlçe verisi boş');
 const fields=rows.shift().map(x=>x.trim().toLowerCase());
 if(fields.length!==headers.length||headers.some((x,i)=>fields[i]!==x))throw Error('Başlıklar tam olarak '+headers.join(',')+' olmalıdır');
 const seen=new Set(),clean=[],months=new Set(),sources=new Set();
 for(const [index,record] of rows.entries()){
  if(record.length!==headers.length)throw Error('Satır '+(index+2)+': kolon sayısı hatalı');
  const [city, district, period, totalRaw,source]=record.map(x=>x.trim());
  if(!allowedCities.has(city))throw Error('Desteklenmeyen şehir: '+city);
  if(!district||district.length>100||/[<>\x00-\x1f]/.test(district))throw Error('Geçersiz ilçe adı (satır '+(index+2)+')');
  if(!/^20\d{2}-(0[1-9]|1[0-2])$/.test(period)||period>'2026-11'||period<'2015-01')throw Error('Geçersiz dönem: '+period);
  if(!/^(0|[1-9]\d*)$/.test(totalRaw)||Number(totalRaw)>1000000)throw Error('Geçersiz satış adedi: '+totalRaw);
  const url=new URL(source);
  if(url.protocol!=='https:'||!['veriportali.tuik.gov.tr','data.tuik.gov.tr','veriistanbul.ito.org.tr'].includes(url.hostname))throw Error('Resmî/onaylı kaynak adresi gerekli (satır '+(index+2)+')');
  const key=city+'|'+district.toLocaleLowerCase('tr-TR')+'|'+period;
  if(seen.has(key))throw Error('Tekrarlanan şehir-ilçe-dönem: '+key);
  seen.add(key);months.add(period);sources.add(source);
  clean.push({city,district,period,total:Number(totalRaw)});
 }
 if(clean.length>20000)throw Error('Tek aktarımda en fazla 20000 kayıt');
 const sourceComments=[...sources].map(x=>'-- '+x).join('\n');
 const lines=clean.map(r=>'INSERT INTO district_sales (city_slug,district_name,period,total,retrieved_at) VALUES ('+[quoted(r.city),quoted(r.district),quoted(r.period),r.total,"datetime('now')"].join(',')+') ON CONFLICT(city_slug,district_name,period) DO UPDATE SET total=excluded.total,retrieved_at=excluded.retrieved_at;');
 return {count:clean.length,cityCount:new Set(clean.map(x=>x.city)).size,periods:[...months].sort(),sql:'-- Doğrulanmış TÜİK ilçe toplam konut satışları, kaynaklar:\n'+sourceComments+'\n'+lines.join('\n')+'\n'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const [input,output]=process.argv.slice(2);
 if(!input||!output)throw Error('Kullanım: node scripts/prepare-district-import.mjs kaynak.csv aktarim.sql');
 const prepared=prepareDistrictSql(readFileSync(input,'utf8'));
 writeFileSync(output,prepared.sql);
 console.log(JSON.stringify({status:'prepared',rows:prepared.count,cities:prepared.cityCount,periods:prepared.periods,output}));
 console.log('SQL incelendikten sonra: pnpm exec wrangler d1 execute konutseyir-data --remote --file '+output+' --config worker/wrangler.jsonc');
}
