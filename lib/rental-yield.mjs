import {grossRentMetrics,netRentMetrics} from './finance.mjs';
const labels={price:'Konut satış fiyatı',grossArea:'Brüt alan',rent:'Aylık kira',costs:'Alım masrafları',expenses:'Yıllık giderler',tax:'Yıllık kira vergisi',vacancy:'Boş kalan ay'};
function fail(field,message){const error=new Error(message);error.field=field;throw error}
export function rentalInputs(raw){
 const p={city:String(raw.city||'').trim(),manual:raw.rent!==null&&raw.rent!==undefined&&String(raw.rent).trim()!=='',price:0,grossArea:0,rent:0,costs:0,expenses:0,tax:0,vacancy:0};
 if(!p.city)fail('city','İl seçin.');
 for(const field of Object.keys(labels)){
  const text=String(raw[field]??'').trim();
  if(field==='rent'&&!p.manual){p.rent=null;continue}
  if(!text)fail(field,`${labels[field]} alanını doldurun; gider yoksa 0 girin.`);
  const value=typeof raw[field]==='number'?raw[field]:Number(text);
  if(!Number.isFinite(value)||value<0||value>(field==='grossArea'?100000:field==='vacancy'?12:1e12))fail(field,`${labels[field]} geçerli aralıkta, negatif olmayan bir sayı olmalı.`);
  if((field==='price'||field==='grossArea')&&value===0)fail(field,`${labels[field]} sıfırdan büyük olmalı.`);
  if(field==='vacancy'&&!Number.isInteger(value))fail(field,'Boş kalan ay 0–12 arasında tam sayı olmalı.');
  p[field]=value;
 }
 return p;
}
export function rentalYield(raw,reference=null){
 const p=rentalInputs(raw);
 let monthly=p.rent;
 if(!p.manual){
  const series=reference?.series;
  if(!(Number.isFinite(reference?.unitMonthlyRentPerM2)&&reference.unitMonthlyRentPerM2>0)||series?.unit!=='TL/m²/ay'||series?.areaBasis!=='brüt kullanım alanı'||!/^\d{4}-Q[1-4]$/.test(series?.period||''))fail('rent','Doğrulanmış il birim kira verisi yok. Aylık kiranızı elle girerek hesaplayabilirsiniz.');
  monthly=reference.unitMonthlyRentPerM2*p.grossArea;
 }
 const gross=grossRentMetrics(p.price,monthly),net=netRentMetrics(p.price,p.costs,monthly,p.vacancy,p.expenses,p.tax);
 return {...net,monthly,grossYield:gross.grossYield,source:p.manual?'manual':'tcmb'};
}
