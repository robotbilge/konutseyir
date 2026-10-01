'use client';
import {useState} from 'react';
import {ArrowUpRight,Info,ShieldCheck,Search} from 'lucide-react';
import {provinces} from '../lib/provinces.mjs';

type Listing={city:string;price:number|string|null;area:number|string|null;areaType:string;monthlyRent?:number|string|null;netArea?:number|string|null;grossArea?:number|string|null;district?:string|null;neighborhood?:string|null};
type Source={value:number;period:string;retrievedAt:string;seriesName:string;seriesCode:string;unit:string;frequency:string;sourceUrl:string};
type Payload={status:string;message?:string;error?:string;listing?:Listing;missing?:string[];comparison?:{provinceUnitPriceM2:number;differencePercent:number;reviewRecommended:boolean;thresholdPercent:number};rent?:{unitMonthlyRentPerM2:number;monthlyGrossRent:number;annualGrossYieldPercent:number;paybackYears:number;series:Source}|null;userRent?:{monthlyRent:number;annualGrossYieldPercent:number;paybackYears:number}|null;sources?:{housePrice:Source;rent?:Source|null};extraction?:{serverFetch:string};methodology?:{areaType:string;thresholdOfficial:boolean}};
const money=(v:number)=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(v);
const number=(v:number)=>new Intl.NumberFormat('tr-TR',{maximumFractionDigits:2}).format(v);
const prettyPeriod=(v:string)=>v?.replace('-Q',' · Ç')||'';
const emptyListing:Listing={city:'İstanbul',price:'',area:'',areaType:'',monthlyRent:'',netArea:'',grossArea:''};

export function ListingAnalyzer(){
 const [form,setForm]=useState<Listing>(emptyListing);
 const [url,setUrl]=useState('');
 const [listingFetched,setListingFetched]=useState(false);
 const [result,setResult]=useState<Payload|null>(null);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const complete=Boolean(form.city&&Number(form.price)>0&&Number(form.area)>0&&form.areaType);
 const userMissing=(result?.missing||[]).filter(field=>field==='city'?!form.city:field==='price'?!Number(form.price):field==='area'?!Number(form.area):field==='areaType'?!form.areaType:field==='monthlyRent'?!Number(form.monthlyRent):true);
 function update(key:keyof Listing,value:string){setForm(prev=>({...prev,[key]:value}));setResult(null)}
 function updateAreaType(value:string){setForm(prev=>({...prev,areaType:value,area:value==='net'?prev.netArea||'':value==='gross'?prev.grossArea||'':''}));setResult(null)}
 async function request(extractOnly:boolean){
  setError('');setResult(null);setBusy(true);
  try{
   const response=await fetch('/api/tcmb-listing',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:listingFetched?'':url,extractOnly,city:url&&!listingFetched?'':form.city,price:form.price,area:form.area,areaType:form.areaType,netArea:form.netArea,grossArea:form.grossArea,monthlyRent:form.monthlyRent})});
   const payload=await response.json() as Payload;
   if(payload.status==='unavailable'||(!response.ok&&payload.status!=='no_data'))throw new Error(payload.error||'İşlem tamamlanamadı.');
   if(payload.extraction?.serverFetch&&payload.extraction.serverFetch!=='not_requested')setListingFetched(true);
   if(payload.listing){
    const found=payload.listing;
    setForm(prev=>{
     const net=found.netArea||prev.netArea||'';
     const gross=found.grossArea||prev.grossArea||'';
     const areaType=found.areaType||prev.areaType||(!gross&&net?'net':!net&&gross?'gross':'');
     return {...prev,...found,city:found.city||prev.city,price:found.price||prev.price,netArea:net,grossArea:gross,areaType,area:areaType==='net'?net:areaType==='gross'?gross:found.area||prev.area,monthlyRent:found.monthlyRent||prev.monthlyRent};
    });
   }
   setResult(payload);
  }catch(cause){setError(cause instanceof Error?cause.message:'Bağlantı kurulamadı.');}
  finally{setBusy(false)}
 }
 function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();void request(false)}
 const source=result?.sources;
 return <section className="listing-analyzer tcmb-listing-analyzer" aria-labelledby="listing-analyzer-title">
  <div className="listing-analyzer-copy">
   <p className="eyebrow">KONUT İLANI · TCMB GÖSTERGESİ</p>
   <h2 id="listing-analyzer-title">İlanı il verisiyle karşılaştırın</h2>
   <p>İlan bağlantısını girip alınabilen bilgileri aktarın; eksikleri tamamlayın. Bağlantı kullanmadan bilgileri kendiniz de girebilirsiniz.</p>
   <div className="tcmb-tool-points"><span><ShieldCheck size={16}/> TCMB EVDS kaynaklı</span><span><Info size={16}/> İl göstergesi, mahalle emsali değildir</span></div>
   <small>İl düzeyindeki gösterge; mahalle, bina yaşı, kat, manzara, site özellikleri, alan türü ve dairenin durumunu ayırmaz.</small>
  </div>
  <div className="listing-analyzer-form">
   <form onSubmit={submit}>
    <label htmlFor="listing-url">İlan bağlantısı <span>(isteğe bağlı)</span></label>
    <div className="listing-url-row tcmb-url-row"><input id="listing-url" type="url" placeholder="https://www.hepsiemlak.com/…" value={url} onChange={event=>{setUrl(event.target.value);setListingFetched(false);setResult(null)}}/><button type="button" className="tcmb-extract" disabled={!url||busy} onClick={()=>void request(true)}><Search size={16}/>{busy?'Kontrol ediliyor…':'İlandan bilgileri al'}</button></div>
    <p className="tcmb-form-hint">Bağlantı yalnızca Sahibinden, Hepsiemlak ve Emlakjet ilanlarında denenir. İlan sayfası bilgileri gizliyorsa eksikleri kendiniz girin.</p>
    <div className="tcmb-form-grid">
     <label>İl<select autoComplete="address-level1" value={form.city} onChange={e=>update('city',e.target.value)}>{provinces.map(city=><option key={city} value={city}>{city}</option>)}</select></label>
     <label>İlan fiyatı<input type="number" min="1" step="any" inputMode="decimal" placeholder="6.500.000" value={form.price??''} onChange={e=>update('price',e.target.value)}/><small>TL</small></label>
     <label>Net alan<input type="number" min="1" step="any" inputMode="decimal" placeholder="55" value={form.netArea??''} onChange={e=>{update('netArea',e.target.value);if(form.areaType==='net')update('area',e.target.value)}}/><small>m²</small></label>
     <label>Brüt alan<input type="number" min="1" step="any" inputMode="decimal" placeholder="70" value={form.grossArea??''} onChange={e=>{update('grossArea',e.target.value);if(form.areaType==='gross')update('area',e.target.value)}}/><small>m²</small></label>
     <label>Karşılaştırmada kullanılacak alan<select value={form.areaType} onChange={e=>updateAreaType(e.target.value)}><option value="">Net veya brüt seçin</option><option value="net">Net alan</option><option value="gross">Brüt alan</option></select></label>
     <label className="tcmb-optional-rent">Bilinen aylık kira <span>(isteğe bağlı)</span><input type="number" min="1" step="any" inputMode="decimal" placeholder="30.000" value={form.monthlyRent||''} onChange={e=>update('monthlyRent',e.target.value)}/><small>TL/ay</small></label>
    </div>
    <button className="tcmb-submit" type="submit" disabled={busy}>{busy?'Hesaplanıyor…':complete?'Karşılaştırma raporunu oluştur':'Eksik bilgileri kontrol et'}</button>
   </form>
   {error&&<p className="listing-error" role="alert">{error}</p>}
   {(result?.status==='needs_input'||result?.status==='extracted')&&<div className="tcmb-feedback" role="status"><strong>{result.extraction?.serverFetch==='unavailable'?'İlan sayfası okunamadı':result.status==='extracted'?'İlan bilgileri forma aktarıldı':'Eksik bilgileri tamamlayın'}</strong><p>{result.message||'İlandan alınabilen bilgiler forma aktarıldı.'} {userMissing.length?`Kontrol edilecek alanlar: ${userMissing.map(field=>({city:'il',price:'ilan fiyatı',area:'konut alanı',areaType:'net/brüt alan seçimi',monthlyRent:'aylık kira'}[field]||field)).join(', ')}.`:'Formdaki bilgileri kontrol edip karşılaştırmayı başlatın.'}</p></div>}
   {result?.status==='no_data'&&<div className="tcmb-feedback tcmb-unavailable" role="status"><strong>TCMB karşılaştırması yapılamadı</strong><p>{result.message||'Bu il için karşılaştırılabilir TCMB verisi bulunamadı.'} Başka bir il veya dönem verisi kullanılmadı.</p></div>}
   {result?.status==='available'&&result.comparison&&<div className="tcmb-report" aria-live="polite">
    <div className="tcmb-report-heading"><span>İL BAZLI GÖSTERGE RAPORU</span><b>{result.listing?.city}{result.listing?.district?` · ${result.listing.district}`:''}{result.listing?.neighborhood?` · ${result.listing.neighborhood}`:''}</b></div>
    <p className="tcmb-report-intro">Aşağıdaki değerler girilen ilan bilgileriyle TCMB’nin {result.listing?.city} ili için yayımladığı değerleme göstergelerini karşılaştırır.</p>
    <div className="tcmb-metric-grid">
     <article><span>İlanın hesaplanan m² fiyatı · {result.listing?.areaType==='net'?'net':'brüt'} alan</span><strong>{money(Number(result.listing?.price)/Number(result.listing?.area))} / m²</strong></article>
     <article><span>TCMB il bazlı birim fiyat göstergesi</span><strong>{money(result.comparison.provinceUnitPriceM2)} / m²</strong></article>
     <article className="tcmb-primary-metric"><span>İlan m² fiyatının il göstergesine farkı</span><strong>{Math.abs(result.comparison.differencePercent)<0.005?'Yaklaşık aynı düzey':'%'+number(Math.abs(result.comparison.differencePercent))+' '+(result.comparison.differencePercent>0?'üzerinde':'altında')}</strong></article>
     {result.rent&&<article><span>TCMB kira göstergesine göre tahmini aylık brüt kira</span><strong>{money(result.rent.monthlyGrossRent)}</strong><small>{money(result.rent.unitMonthlyRentPerM2)} / m² / ay × {number(Number(result.listing?.area))} m² ({result.listing?.areaType==='net'?'net':'brüt'})</small></article>}
     {result.rent&&<article><span>TCMB kira göstergesine göre yıllık brüt getiri</span><strong>%{number(result.rent.annualGrossYieldPercent)}</strong></article>}
     {result.rent&&<article><span>TCMB kira göstergesine göre basit amortisman</span><strong>{number(result.rent.paybackYears)} yıl</strong></article>}
     {result.userRent&&<article><span>Girilen kiraya göre yıllık brüt getiri</span><strong>%{number(result.userRent.annualGrossYieldPercent)}</strong></article>}
     {result.userRent&&<article><span>Girilen kiraya göre basit amortisman</span><strong>{number(result.userRent.paybackYears)} yıl</strong></article>}
    </div>
    {result.comparison.reviewRecommended&&<div className="tcmb-review-warning"><strong>İl göstergesinden fark belirgin</strong><p>Fark, yapılandırılmış %{number(result.comparison.thresholdPercent)} uyarı eşiğine ulaşıyor. Bu eşik TCMB standardı değildir ve tek başına fiyatın pahalı/ucuz olduğu anlamına gelmez. Mahalle, bina yaşı, kat, manzara, site özellikleri, net/brüt alan ve konutun durumu karşılaştırmayı etkileyebilir.</p></div>}
    <p className="tcmb-comparison-note">Bu değer tüm ilanların ortancası veya aynı mahalledeki emsal satış fiyatı değildir; TCMB’nin değerlemesi yapılan konut verilerinden üretilen il göstergesidir. Hesapta {result.listing?.areaType==='net'?'net':'brüt'} ilan alanı kullanıldı.</p>
    <div className="tcmb-source-grid">
     {source?.housePrice&&<article><b>TCMB · {source.housePrice.seriesName}</b><span>Dönem: {prettyPeriod(source.housePrice.period)} · Birim: {source.housePrice.unit} · Sıklık: {source.housePrice.frequency}</span><span>Veri alınma zamanı: {new Date(source.housePrice.retrievedAt).toLocaleString('tr-TR')}</span><a href={source.housePrice.sourceUrl} target="_blank" rel="noreferrer">Resmî veri ve metaveri <ArrowUpRight size={13}/></a></article>}
     {source?.rent&&<article><b>TCMB · {source.rent.seriesName}</b><span>Dönem: {prettyPeriod(source.rent.period)} · Birim: {source.rent.unit} · Sıklık: {source.rent.frequency}</span><span>Veri alınma zamanı: {new Date(source.rent.retrievedAt).toLocaleString('tr-TR')}</span><a href={source.rent.sourceUrl} target="_blank" rel="noreferrer">Resmî veri tablosu <ArrowUpRight size={13}/></a></article>}
    </div>
    {!result.rent&&<p className="tcmb-rent-missing">Bu il/dönem için karşılaştırılabilir birim kira verisi bulunamadı; kira tahmini gösterilmedi.</p>}
    <p className="tcmb-disclaimer">Bu sonuçlar TCMB’nin il bazlı değerleme verilerinden üretilen yaklaşık göstergelerdir; belirli bir konut için ekspertiz, gerçekleşmiş satış fiyatı, kira garantisi veya yatırım tavsiyesi değildir. İlan fiyatı gerçekleşen satış fiyatından farklı olabilir. Brüt kira getirisi ve amortisman hesabı vergi, aidat, bakım, boş kalma süresi ve diğer masrafları içermez. İl göstergesi mahalle veya daire özelliklerine göre emsal karşılaştırmasının yerine geçmez.</p>
   </div>}
  </div>
 </section>;
}
