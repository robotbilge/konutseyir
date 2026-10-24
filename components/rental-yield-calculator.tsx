'use client';
import {useState} from 'react';
import {provinces} from '../lib/provinces.mjs';

type RentData={unitMonthlyRentPerM2:number;monthlyGrossRent:number;annualGrossYieldPercent:number;paybackYears:number;series:{period:string;seriesName:string;sourceUrl:string;retrievedAt:string}};
type Response={status:string;message?:string;rent?:RentData|null};
const format=(value:number)=>new Intl.NumberFormat('tr-TR',{maximumFractionDigits:0}).format(value)+' TL';
const rate=(value:number)=>'%'+new Intl.NumberFormat('tr-TR',{maximumFractionDigits:2}).format(value);
export function RentalYieldCalculator(){
 const [city,setCity]=useState('İstanbul');
 const [price,setPrice]=useState('5000000');
 const [grossArea,setGrossArea]=useState('100');
 const [rent,setRent]=useState('');
 const [costs,setCosts]=useState('0');
 const [expenses,setExpenses]=useState('0');
 const [tax,setTax]=useState('0');
 const [vacancy,setVacancy]=useState('0');
 const [result,setResult]=useState<Response|null>(null);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const amount=(v:string)=>v.trim()===''?0:Number(v);
 const capital=amount(price)+amount(costs);
 const monthly=rent.trim()===''?(result?.rent?.monthlyGrossRent??0):amount(rent);
 const annualGross=monthly*12;
 const collected=monthly*(12-amount(vacancy));
 const net=collected-amount(expenses)-amount(tax);
 const netRate=capital>0?net/capital*100:null;
 const valid=Number.isFinite(capital)&&amount(price)>0&&amount(grossArea)>0&&Number.isFinite(amount(grossArea))&&amount(grossArea)<=100000&&amount(vacancy)>=0&&amount(vacancy)<=12&&Number.isInteger(amount(vacancy))&&[rent,costs,expenses,tax].every(v=>Number.isFinite(amount(v))&&amount(v)>=0)&&capital>0;
 async function calculate(event:React.FormEvent){
  event.preventDefault();setError('');setResult(null);
  if(!valid){setError('Fiyat ve brüt alan pozitif olmalı; giderler negatif olamaz; boş ay 0–12 arası tam sayı olmalı.');return}
  setBusy(true);
  try{
   const response=await fetch('/api/tcmb-listing',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify({city,price:amount(price),grossArea:amount(grossArea),area:amount(grossArea),areaType:'gross',monthlyRent:rent.trim()===''?undefined:amount(rent)})});
   const json=await response.json() as Response;
   if(!response.ok&&json.status!=='no_data')throw Error(json.message||'TCMB servisine ulaşılamadı.');
   setResult(json);
  }catch(e){setError(e instanceof Error?e.message:'Veri alınamadı.')}
  finally{setBusy(false)}
 }
 const fields=[['Konut satış fiyatı (TL)',price,setPrice],['Brüt alan (m²)',grossArea,setGrossArea],['Bilinen aylık kira (TL, isteğe bağlı)',rent,setRent],['Alım masrafları (TL)',costs,setCosts],['Yıllık giderler (TL)',expenses,setExpenses],['Yıllık kira vergisi (TL)',tax,setTax],['Yılda boş kalan ay (0–12)',vacancy,setVacancy]] as const;
 const show=Boolean(result&&(result.rent||rent.trim()!=='')&&valid);
 return <section className="focused-calculator" aria-label="Konut kira getirisi hesaplayıcı">
  <form className="focused-form" onSubmit={calculate}>
   <div className="fields">
    <label className="calc-field"><span>İl</span><select value={city} onChange={e=>{setCity(e.target.value);setResult(null)}}>{provinces.map(name=><option key={name} value={name}>{name}</option>)}</select></label>
    {fields.map(([label,value,setter])=><label className="calc-field" key={label}><span>{label}</span><input type="number" min={label.startsWith('Yılda')?'0':'0'} max={label.startsWith('Yılda')?'12':undefined} step={label.startsWith('Yılda')?'1':'any'} value={value} onChange={e=>{setter(e.target.value);setResult(null)}}/></label>)}
   </div>
   <button type="submit" disabled={busy}>{busy?'TCMB verisi sorgulanıyor…':'Kira getirisini hesapla'}</button>
   <p className="focused-note">TCMB birim kira göstergesi il düzeyinde ve brüt kullanım alanı bazındadır. Net m² girerek kira tahmini yapılmaz.</p>
  </form>
  <div className="focused-results" aria-live="polite">
   {error&&<p role="alert" className="error">{error}</p>}
   {!result&&!error&&<p>İl, satış fiyatı ve brüt alanı girip hesaplayın. TCMB'den veri gelmezse otomatik tahmini kira üretilmez.</p>}
   {result&&!result.rent&&<p className="focused-note" role="status">Bu il için TCMB birim kira verisi bulunamadı. Başka ilin kira değeri kullanılmadı. {rent.trim()===''?'Kendi aylık kiranızı girerek hesap yapabilirsiniz.':''}</p>}
   {show&&<><div className="focused-result-hero"><span>{rent.trim()!==''?'Girilen kiraya göre yıllık net getiri':'TCMB kira göstergesine dayalı varsayımsal yıllık net getiri'}</span><strong>{netRate===null?'Hesaplanamadı':rate(netRate)}</strong><b>{format(net)} yıllık net kira</b></div>
    <dl className="focused-result-list">
     <div><dt>Hesaplamada kullanılan aylık kira</dt><dd>{format(monthly)}</dd></div>
     <div><dt>Yıllık brüt kira</dt><dd>{format(annualGross)}</dd></div>
     <div><dt>Brüt kira getirisi (satış fiyatına göre)</dt><dd>{rate(annualGross/amount(price)*100)}</dd></div>
     <div><dt>Toplam başlangıç yatırımı</dt><dd>{format(capital)}</dd></div>
     <div><dt>Yıllık net kira</dt><dd>{format(net)}</dd></div>
     <div><dt>Net amortisman</dt><dd>{net>0?(capital/net).toLocaleString('tr-TR',{maximumFractionDigits:1})+' yıl':'Pozitif net getiri yok'}</dd></div>
    </dl></>}
   {result?.rent&&<p className="focused-note">TCMB {result.rent.series.seriesName}: {result.rent.series.period}. Birim kira: {format(result.rent.unitMonthlyRentPerM2)}/m²/ay. <a href={result.rent.series.sourceUrl} target="_blank" rel="noreferrer">Resmî kaynak ↗</a></p>}
   <p className="focused-note">Bu hesap nominal ve basit bir yıllık senaryodur. TCMB verisi dairenin gerçek kira bedeli veya kira garantisi değildir. Net hesapta girilen giderler düşülür, fiyat artışı ve finansman dahil değildir. Vergi alanı 0 ise vergi muafiyeti anlamına gelmez.</p>
  </div>
 </section>
}
