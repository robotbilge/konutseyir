'use client';
import {useState} from 'react';
import {ArrowUpRight,Info,ShieldCheck} from 'lucide-react';

type Listing={city:string;price:number|string|null;area:number|string|null;areaType:string;monthlyRent?:number|string|null};
type Source={value:number;period:string;retrievedAt:string;seriesName:string;seriesCode:string;unit:string;frequency:string;sourceUrl:string};
type Payload={status:string;message?:string;error?:string;listing?:Listing;missing?:string[];comparison?:{provinceMedianM2:number;differencePercent:number;reviewRecommended:boolean;thresholdPercent:number};rent?:{unitMonthlyRentPerM2:number;monthlyGrossRent:number;annualGrossYieldPercent:number;paybackYears:number;series:Source}|null;userRent?:{monthlyRent:number;annualGrossYieldPercent:number;paybackYears:number}|null;sources?:{housePrice:Source;rent?:Source|null};extraction?:{serverFetch:string};methodology?:{areaType:string;thresholdOfficial:boolean}};
const money=(v:number)=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(v);
const number=(v:number)=>new Intl.NumberFormat('tr-TR',{maximumFractionDigits:2}).format(v);
const prettyPeriod=(v:string)=>v?.replace('-Q',' · Ç')||'';

export function ListingAnalyzer(){
 const [form,setForm]=useState<Listing>({city:'',price:'',area:'',areaType:'',monthlyRent:''});
 const [url,setUrl]=useState('');
 const [listingFetched,setListingFetched]=useState(false);
 const [result,setResult]=useState<Payload|null>(null);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const complete=Boolean(form.city.trim()&&Number(form.price)>0&&Number(form.area)>0&&form.areaType);
 function update(key:keyof Listing,value:string){setForm(prev=>({...prev,[key]:value}));setResult(null)}
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();setError('');setResult(null);setBusy(true);
  try{
   const response=await fetch('/api/tcmb-listing',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:listingFetched?'':url,city:form.city,price:form.price,area:form.area,areaType:form.areaType,monthlyRent:form.monthlyRent})});
   const payload=await response.json() as Payload;
   if(payload.status==='unavailable'||(!response.ok&&payload.status!=='no_data'))throw new Error(payload.error||'Analiz tamamlanamadı.');
   if(payload.extraction?.serverFetch&&payload.extraction.serverFetch!=='not_requested')setListingFetched(true);
   if(payload.listing)setForm(prev=>({...prev,...payload.listing,city:payload.listing?.city||prev.city,price:payload.listing?.price||prev.price,area:payload.listing?.area||prev.area,areaType:payload.listing?.areaType||prev.areaType}));
   setResult(payload);
  }catch(cause){setError(cause instanceof Error?cause.message:'Bağlantı kurulamadı.');}
  finally{setBusy(false)}
 }
 const source=result?.sources;
 return <section className="listing-analyzer tcmb-listing-analyzer" aria-labelledby="listing-analyzer-title">
  <div className="listing-analyzer-copy">
   <p className="eyebrow">KONUT İLANI · TCMB GÖSTERGESİ</p>
   <h2 id="listing-analyzer-title">İlanı il verisiyle karşılaştırın</h2>
   <p>İlan bağlantısını ekleyin. Alınabilen fiyat, m² ve il bilgilerini forma aktaralım; eksik kalanları siz tamamlayın. Sonuç, TCMB’nin il bazlı değerleme verileriyle karşılaştırmalı bir göstergedir.</p>
   <div className="tcmb-tool-points"><span><ShieldCheck size={16}/> TCMB EVDS kaynaklı</span><span><Info size={16}/> Mahalle emsali değildir</span></div>
   <small>TCMB il ortalaması; konum, bina yaşı, kat, manzara, site özellikleri ve dairenin durumunu ayırmaz.</small>
  </div>
  <div className="listing-analyzer-form">
   <form onSubmit={submit}>
    <label htmlFor="listing-url">İlan bağlantısı <span>(isteğe bağlı)</span></label>
    <div className="listing-url-row tcmb-url-row"><input id="listing-url" type="url" placeholder="https://www.hepsiemlak.com/…" value={url} onChange={event=>{setUrl(event.target.value);setListingFetched(false)}}/></div>
    <div className="tcmb-form-grid">
     <label>İl<input type="text" autoComplete="address-level1" placeholder="İstanbul" value={form.city} onChange={e=>update('city',e.target.value)}/></label>
     <label>İlan fiyatı<input type="number" min="1" step="any" inputMode="decimal" placeholder="6.500.000" value={form.price??''} onChange={e=>update('price',e.target.value)}/><small>TL</small></label>
     <label>Konut alanı<input type="number" min="1" step="any" inputMode="decimal" placeholder="100" value={form.area??''} onChange={e=>update('area',e.target.value)}/><small>m²</small></label>
     <label>Alan türü<select value={form.areaType} onChange={e=>update('areaType',e.target.value)}><option value="">Seçin</option><option value="net">Net alan</option><option value="gross">Brüt alan</option></select></label>
     <label className="tcmb-optional-rent">Bildiğiniz aylık kira <span>(isteğe bağlı)</span><input type="number" min="1" step="any" inputMode="decimal" placeholder="30.000" value={form.monthlyRent||''} onChange={e=>update('monthlyRent',e.target.value)}/><small>TL/ay</small></label>
    </div>
    <button className="tcmb-submit" type="submit" disabled={busy}>{busy?'Hesaplanıyor…':complete?'Karşılaştırmayı hesapla':'Eksik bilgileri kontrol et'}</button>
   </form>
   {error&&<p className="listing-error" role="alert">{error}</p>}
   {result?.status==='needs_input'&&<p className="tcmb-feedback" role="status">{result.message} {!form.city&&'İl bilgisi isteniyor.'}</p>}
   {result?.status==='no_data'&&<div className="tcmb-feedback tcmb-unavailable" role="status"><strong>TCMB karşılaştırması yapılamadı</strong><p>{result.message||'Bu il için karşılaştırılabilir TCMB verisi bulunamadı.'} Başka bir il veya dönem verisi kullanılmadı.</p></div>}
   {result?.status==='available'&&result.comparison&&<div className="tcmb-report" aria-live="polite">
    <div className="tcmb-report-heading"><span>İL BAZLI KARŞILAŞTIRMA</span><b>{result.listing?.city}</b></div>
    <div className="tcmb-metric-grid">
     <article><span>İlan m² fiyatı · {result.listing?.areaType==='net'?'net':'brüt'} alan</span><strong>{money(Number(result.listing?.price)/Number(result.listing?.area))} / m²</strong></article>
     <article><span>TCMB il ortanca m² fiyatı</span><strong>{money(result.comparison.provinceMedianM2)} / m²</strong></article>
     <article className="tcmb-primary-metric"><span>Fark, il ortancasına göre</span><strong>{Math.abs(result.comparison.differencePercent)<0.005?'Yaklaşık eşit':'%'+number(Math.abs(result.comparison.differencePercent))+' '+(result.comparison.differencePercent>0?'üzerinde':'altında')}</strong></article>
     {result.rent&&<article><span>TCMB tahmini aylık brüt kira</span><strong>{money(result.rent.monthlyGrossRent)}</strong><small>{money(result.rent.unitMonthlyRentPerM2)} / m² / ay × {number(Number(result.listing?.area))} m²</small></article>}
     {result.rent&&<article><span>TCMB kira göstergesiyle yıllık brüt getiri</span><strong>%{number(result.rent.annualGrossYieldPercent)}</strong></article>}
     {result.rent&&<article><span>TCMB kira göstergesiyle basit amortisman</span><strong>{number(result.rent.paybackYears)} yıl</strong></article>}
     {result.userRent&&<article><span>Girdiğiniz kirayla yıllık brüt getiri</span><strong>%{number(result.userRent.annualGrossYieldPercent)}</strong></article>}
     {result.userRent&&<article><span>Girdiğiniz kirayla basit amortisman</span><strong>{number(result.userRent.paybackYears)} yıl</strong></article>}
    </div>
    {result.comparison.reviewRecommended&&<div className="tcmb-review-warning"><strong>Ayrıntılı emsal incelemesi önerilir</strong><p>%{number(result.comparison.thresholdPercent)} ve üzeri sapma, mahalle, bina yaşı, kat, manzara, site özellikleri, alan türü ve dairenin durumu gibi farklardan kaynaklanabilir. Bu eşik KonutSeyir’in inceleme uyarısıdır; TCMB’nin belirlediği resmî standart değildir. Bu sonuç tek başına evin pahalı veya ucuz olduğunu göstermez.</p></div>}
    <p className="tcmb-comparison-note">Karşılaştırma, tüm ilanların medyanı değil; TCMB’nin değerlemesi yapılan konut verilerinden üretilen il göstergesidir. {result.listing?.areaType==='net'?'Net':'Brüt'} ilan alanı kullanıldı.</p>
    <div className="tcmb-source-grid">
     {source?.housePrice&&<article><b>TCMB · {source.housePrice.seriesName}</b><span>{prettyPeriod(source.housePrice.period)} · {source.housePrice.unit} · {source.housePrice.frequency}</span><span>Alınma: {new Date(source.housePrice.retrievedAt).toLocaleString('tr-TR')}</span><a href={source.housePrice.sourceUrl} target="_blank" rel="noreferrer">Resmî veri ve metaveri <ArrowUpRight size={13}/></a></article>}
     {source?.rent&&<article><b>TCMB · {source.rent.seriesName}</b><span>{prettyPeriod(source.rent.period)} · {source.rent.unit} · {source.rent.frequency}</span><span>Alınma: {new Date(source.rent.retrievedAt).toLocaleString('tr-TR')}</span><a href={source.rent.sourceUrl} target="_blank" rel="noreferrer">Resmî veri tablosu <ArrowUpRight size={13}/></a></article>}
    </div>
    {!result.rent&&<p className="tcmb-rent-missing">Bu il/dönem için karşılaştırılabilir birim kira verisi bulunamadı; kira tahmini gösterilmedi.</p>}
    <p className="tcmb-disclaimer">Bu sonuçlar TCMB’nin il bazlı değerleme verilerinden üretilen yaklaşık göstergelerdir; belirli bir konut için ekspertiz, satış fiyatı veya kira garantisi değildir. Brüt kira getirisi ve amortisman hesabı vergi, aidat, bakım, boş kalma süresi ve diğer masrafları içermez. İl ortancası mahalle veya daire özelliklerine göre emsal karşılaştırmasının yerine geçmez.</p>
   </div>}
  </div>
 </section>;
}
