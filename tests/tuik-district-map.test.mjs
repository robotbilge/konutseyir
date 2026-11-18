import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDistrictDirectory,parseDistrictMapData} from '../scripts/sync-tuik-districts.mjs';

const square=(x,y,size=1)=>({type:'Polygon',coordinates:[[[x,y],[x+size,y],[x+size,y+size],[x,y+size],[x,y]]]});

test('TÜİK harita verisi ilçeyi il ve son aylık dönemle eşler',()=>{
 const provinces={features:Array.from({length:81},(_,index)=>({properties:{name:`İL ${index+1}`,bolgeKodu:`TR${index+1}`},geometry:square(index*2,0)}))};
 const districts={features:Array.from({length:970},(_,index)=>({properties:{duzeyKodu:String(3000+index),name:`İLÇE ${index+1}`,bolgeKodu:`TR${index%81+1}`},geometry:square((index%81)*2+.1,.1,.2)}))};
 const directory=buildDistrictDirectory(districts,provinces),veriler=[...directory.keys()].map(duzeyKodu=>({duzeyKodu,veri:['12','9']}));
 const rows=parseDistrictMapData({gostergeNo:'KNT-GK217340-O27002',period:'aylik',tarihler:['2026/10','2026/9'],veriler},directory,'2026-11-18T00:00:00Z',new Date('2026-11-18T00:00:00Z'));
 assert.equal(rows.length,970);assert.equal(new Set(rows.map(row=>row.citySlug)).size,81);assert.equal(rows[0].period,'2026-10');assert.equal(rows[0].total,12);
});

test('TÜİK ilçe senkronu eksik il kapsamını reddeder',()=>{
 const directory=new Map(Array.from({length:749},(_,index)=>[String(index),{citySlug:'istanbul',districtName:`İlçe ${index}`,provinceName:'İstanbul'}]));
 const payload={gostergeNo:'KNT-GK217340-O27002',period:'aylik',tarihler:['2026/10'],veriler:[...directory.keys()].map(duzeyKodu=>({duzeyKodu,veri:['1']}))};
 assert.throws(()=>parseDistrictMapData(payload,directory,'2026-11-18T00:00:00Z',new Date('2026-11-18T00:00:00Z')),/kapsamı eksik/);
});
