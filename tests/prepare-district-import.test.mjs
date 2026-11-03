import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareDistrictSql} from '../scripts/prepare-district-import.mjs';

const header='city_slug,district_name,period,total,source_url';
const source='https://veriportali.tuik.gov.tr/tr/press/54145';
const csv=(rows)=>header+'\n'+rows.join('\n')+'\n';

test('geçerli TÜİK ilçe toplam satış kaydı için SQL üretilir',()=>{
 const result=prepareDistrictSql(csv([`ankara,Çankaya,2026-08,940,${source}`,`izmir,Konak,2026-08,450,${source}`]));
 assert.equal(result.count,2);
 assert.equal(result.cityCount,2);
 assert.match(result.sql,/INSERT INTO district_sales/);
 assert.match(result.sql,/COMMIT;/);
});
test('başka veriyi toplam konut satışına dönüştürmeye izin verilmez',()=>{
 assert.throws(()=>prepareDistrictSql(csv(['ankara,Çankaya,2026-08,10,https://random.example/data'])),/kaynak/);
});
test('tekrarlanan veya bozuk kayıtlar reddedilir',()=>{
 const row=`ankara,Çankaya,2026-08,940,${source}`;
 assert.throws(()=>prepareDistrictSql(csv([row,row])),/Tekrarlanan/);
 assert.throws(()=>prepareDistrictSql(csv([`ankara,Çankaya,2026-08,-3,${source}`])),/Geçersiz satış/);
});
test('SQL karakteri kaynak veriyi bozmaz',()=>{
 const result=prepareDistrictSql(csv([`ankara,O''Brien,2026-08,5,${source}`]));
 assert.match(result.sql,/O''''Brien/);
});
