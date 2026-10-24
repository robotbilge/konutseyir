'use client';
import {useEffect,useRef,useState} from 'react';
import {provinces} from '../lib/provinces.mjs';
import {rentalInputs,rentalYield} from '../lib/rental-yield.mjs';
import './rental-yield.css';
const initial={city:'İstanbul',price:'5000000',grossArea:'100',rent:'',costs:'0',expenses:'0',tax:'0',vacancy:'0'};
type Fields=typeof initial;
type RentData={unitMonthlyRentPerM2:number;series:{period:string;seriesName:string;seriesCode:string;sourceUrl:string;retrievedAt:string;unit:string;frequency:string;areaBasis:string}};
type Metrics=ReturnType<typeof rentalYield>;
const money=(n:number,decimals=0)=>new Intl.NumberFormat('tr-TR',{maximumFractionDigits:decimals}).format(n)+' TL';
const percent=(n:number)=>'%'+new Intl.NumberFormat('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const date=(s?:string)=>s&&Number.isFinite(Date.parse(s))?new Intl.DateTimeFormat('tr-TR',{dateStyle:'medium',timeStyle:'short',timeZone:'Europe/Istanbul'}).format(new Date(s)):'Tarih alınamadı';
const fields=[
 ['price','Konut satış fiyatı (TL)','Gerçek satış/istenen fiyat. TCMB il fiyatı otomatik kullanılmaz.'],
 ['grossArea','Brüt alan (m²)','TCMB kira göstergesi yalnız brüt kullanım alanıyla çarpılır.'],
 ['rent','Bilinen aylık kira (TL, isteğe bağlı)','Boş bırakırsanız TCMB il göstergesi sorgulanır. 0 girerseniz sıfır kira senaryosu hesaplanır.'],
 ['costs','Alım masrafları (TL)','Satış fiyatına ek başlangıç giderleri. Gider yoksa 0 girin.'],
 ['expenses','Yıllık giderler (TL)','Malike kalan aidat, bakım, sigorta ve diğer giderler; aynı gideri iki kez yazmayın.'],
 ['tax','Yıllık kira vergisi (TL)','Kendi belirlediğiniz yıllık tutar. 0, vergi muafiyeti demek değildir.'],
 ['vacancy','Yılda boş kalan ay (0–12)','Kira tahsil edilmeyen tam ay sayısı.']
] as const;
export function RentalYieldCalculator(){
 const[p,setP]=useState<Fields>(initial),[result,setResult]=useState<{metrics:Metrics;input:Fields;reference:RentData|null}|null>(null),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[error,setError]=useState<{field?:string;message:string}|null>(null);
 const pending=useRef<AbortController|null>(null);
 useEffect(()=>()=>pending.current?.abort(),[]);
 function change(key:keyof Fields,value:string){pending.current?.abort();pending.current=null;setBusy(false);setP(old=>({...old,[key]:value}));setResult(null);setNotice('');setError(null)}
 async function calculate(event:React.FormEvent){
  event.preventDefault();pending.current?.abort();pending.current=null;setError(null);setNotice('');setResult(null);
  let input;try{input=rentalInputs(p)}catch(e){const err=e as Error&{field?:string};setError({message:err.message,field:err.field});if(err.field)document.getElementById('rental-'+err.field)?.focus();return}
  if(input.manual){setResult({metrics:rentalYield(p),input:{...p},reference:null});setBusy(false);return}
  const controller=new AbortController();pending.current=controller;setBusy(true);
  const timeout=setTimeout(()=>controller.abort('timeout'),20000);
  try{
   const response=await fetch('/api/tcmb-listing',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',signal:controller.signal,body:JSON.stringify({city:p.city,price:input.price,grossArea:input.grossArea,areaType:'gross',rentOnly:true})});
   const json=await response.json();if(controller.signal.aborted)return;
   if(!response.ok){const message=json.errorCode==='D1_READ_LIMIT'?`Veri hizmetinin günlük sorgu sınırına ulaşıldı. ${date(json.retryAt)} (Türkiye saati) sonrasında yeniden deneyin veya aylık kirayı elle girin.`:json.error||json.message||'TCMB servisine şu anda ulaşılamıyor. Aylık kirayı elle girerek hesaplayabilirsiniz.';throw Error(message)}
   if(json.status==='no_data'||!json.rent){setNotice('Bu il için doğrulanmış TCMB birim kira verisi bulunamadı. Başka ilin verisi kullanılmadı. Aylık kirayı elle girerek hesaplayabilirsiniz.');return}
   const metrics=rentalYield(p,json.rent);setResult({metrics,input:{...p},reference:json.rent});
  }catch(e){if(pending.current!==controller)return;if(controller.signal.aborted&&controller.signal.reason!=='timeout')return;setError({message:controller.signal.reason==='timeout'?'TCMB sorgusu zaman aşımına uğradı. Yeniden deneyin veya aylık kirayı elle girin.':e instanceof Error?e.message:'Veri alınamadı. Aylık kirayı elle girerek hesaplayabilirsiniz.'})}
  finally{clearTimeout(timeout);if(pending.current===controller){pending.current=null;setBusy(false)}}
 }
 const m=result?.metrics;
 return <section className="focused-calculator rental-yield" aria-label="Konut kira getirisi hesaplayıcı">
  <form className="focused-form" onSubmit={calculate} noValidate>
   <div className="fields">
    <label className="calc-field" htmlFor="rental-city"><span>İl</span><select id="rental-city" value={p.city} onChange={e=>change('city',e.target.value)}>{provinces.map(name=><option key={name} value={name}>{name}</option>)}</select></label>
    {fields.map(([key,label,hint])=><label className="calc-field" key={key} htmlFor={'rental-'+key}><span>{label}</span><input id={'rental-'+key} type="number" inputMode={key==='vacancy'?'numeric':'decimal'} min={key==='price'||key==='grossArea'?'0.01':'0'} max={key==='vacancy'?'12':key==='grossArea'?'100000':'1000000000000'} step={key==='vacancy'?'1':'any'} value={p[key]} onChange={e=>change(key,e.target.value)} required={key!=='rent'} aria-invalid={error?.field===key||undefined} aria-describedby={'rental-hint-'+key}/><small id={'rental-hint-'+key}>{hint}</small></label>)}
   </div>
   <button className="primary-link" type="submit" disabled={busy}>{busy?'TCMB verisi sorgulanıyor…':'Kira getirisini hesapla'}</button>
   <p className="focused-note">Kira girerseniz hesap tarayıcıda yapılır; TCMB sorgusu gerekmez. Boş bırakırsanız il düzeyindeki son mevcut çeyreklik birim kira kullanılır.</p>
  </form>
  <div className="focused-results" aria-live="polite" aria-busy={busy}>
   {error&&<p role="alert" className="rental-error">{error.message}</p>}
   {notice&&<p role="status" className="rental-error">{notice}</p>}
   {!result&&!error&&!notice&&<p>{busy?'İl kira göstergesi alınıyor…':'Satış fiyatını, brüt alanı ve giderlerinizi girin. Kiranız biliniyorsa elle yazın; bilinmiyorsa TCMB göstergesini sorgulayın.'}</p>}
   {m&&result&&<><div className="focused-result-hero"><span>{m.source==='manual'?'Girilen kiraya göre yıllık net getiri':'TCMB kira göstergesiyle varsayımsal yıllık net getiri'}</span><strong>{percent(m.netYield)}</strong><b>{money(m.net)} yıllık net kira</b></div>
    <dl className="focused-result-list">
     <div><dt>Hesaplamada kullanılan aylık kira</dt><dd>{money(m.monthly)}</dd></div>
     <div><dt>Yıllık brüt kira (12 ay)</dt><dd>{money(m.gross)}</dd></div>
     <div><dt>Brüt getiri (satış fiyatına göre)</dt><dd>{percent(m.grossYield)}</dd></div>
     <div><dt>Tahsil edilebilir yıllık kira</dt><dd>{money(m.collected)}</dd></div>
     <div><dt>Boş kalma kaynaklı kira kaybı</dt><dd>{money(m.emptyLoss)}</dd></div>
     <div><dt>Toplam başlangıç yatırımı</dt><dd>{money(m.capital)}</dd></div>
     <div><dt>Yıllık net kira</dt><dd>{money(m.net)}</dd></div>
     <div><dt>Net kira getirisi</dt><dd>{percent(m.netYield)}</dd></div>
     <div><dt>Net amortisman</dt><dd>{m.paybackYears!==null?m.paybackYears.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})+' yıl':'Hesaplanamaz: net kira pozitif değil'}</dd></div>
    </dl>
    <p className="focused-note">Kullanılan girdiler: {result.input.city}; satış {money(Number(result.input.price))}; brüt alan {result.input.grossArea} m²; alım gideri {money(Number(result.input.costs))}; yıllık gider {money(Number(result.input.expenses))}; vergi {money(Number(result.input.tax))}; boş kalma {result.input.vacancy} ay.</p>
    {result.reference&&<div className="rental-source"><b>TCMB il göstergesi — daireye özel kira değildir</b><p>{result.reference.series.seriesName} ({result.reference.series.seriesCode}). Veri dönemi: {result.reference.series.period}; sıklık: çeyreklik. Birim: TL/brüt m²/ay.</p><p>Birim kira {money(result.reference.unitMonthlyRentPerM2,2)}/m²/ay × {result.input.grossArea} brüt m² = {money(m.monthly)} aylık varsayım. Veri çekim zamanı: {date(result.reference.series.retrievedAt)} (Türkiye saati).</p><a href="https://evds3.tcmb.gov.tr/charts/portlet/Njk5NDEzNTFjNjAxMWY0MDU2MDdmZjJm/tr" target="_blank" rel="noopener noreferrer">TCMB resmî kira kaynağı ↗</a></div>}
   </>}
   <p className="focused-note">Nominal, sabit kiralı ve basit bir yıllık senaryodur. Kira artışı, konut değer artışı, enflasyon, satış bedeli ve kredi maliyeti dahil değildir. Vergi tutarının 0 olması muafiyet anlamına gelmez. Pozitif sonuç veya kira tahsilatı garanti edilmez.</p>
  </div>
 </section>
}
