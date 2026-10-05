'use client';
import {useState} from 'react';
import {ArrowUpRight,Info,ShieldCheck,Search} from 'lucide-react';
import {provinces} from '../lib/provinces.mjs';

type Listing={city:string;price:number|string|null;area:number|string|null;areaType:string;monthlyRent?:number|string|null;netArea?:number|string|null;grossArea?:number|string|null;netM2Price?:number|null;grossM2Price?:number|null;district?:string|null;neighborhood?:string|null};
type Source={value:number;period:string;retrievedAt:string;seriesName:string;seriesCode:string;unit:string;frequency:string;areaBasis?:string;sourceUrl:string;methodologyUrl?:string};
type Payload={status:string;message?:string;error?:string;listing?:Listing;missing?:string[];comparison?:{provinceUnitPriceM2:number;netEquivalentM2Price:number|null;netAreaRatio:number|null;grossDifferencePercent:number|null;netDifferencePercent:number|null;differencePercent:number|null;reviewRecommended:boolean;thresholdPercent:number;areaBasis?:string};rent?:{unitMonthlyRentPerM2:number;monthlyGrossRent:number;annualGrossYieldPercent:number;paybackYears:number;areaBasis?:string;series:Source}|null;userRent?:{monthlyRent:number;annualGrossYieldPercent:number;paybackYears:number}|null;sources?:{housePrice:Source;rent?:Source|null};extraction?:{serverFetch:string;listingParsed?:boolean};methodology?:{areaType:string;thresholdOfficial:boolean}};
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
 const complete=Boolean(form.city&&Number(form.price)>0&&(Number(form.grossArea)>0||Number(form.netArea)>0));
 const userMissing=(result?.missing||[]).filter(field=>field==='city'?!form.city:field==='price'?!Number(form.price):field==='area'?!Number(form.grossArea||form.netArea):field==='monthlyRent'?!Number(form.monthlyRent):true);
 function update(key:keyof Listing,value:string){setForm(prev=>({...prev,[key]:value}));setResult(null)}
 function updateArea(key:'netArea'|'grossArea',value:string){setForm(prev=>{const next={...prev,[key]:value};const gross=key==='grossArea'?value:prev.grossArea;const net=key==='netArea'?value:prev.netArea;return {...next,area:gross||net||'',areaType:gross?'gross':net?'net':''}});setResult(null)}
 async function request(extractOnly:boolean){
  setError('');setResult(null);setBusy(true);
  try{
   const response=await fetch('/api/tcmb-listing',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify({url:extractOnly||!listingFetched?url:'',extractOnly,city:url&&!listingFetched?'':form.city,price:form.price,area:form.area,areaType:form.areaType,netArea:form.netArea,grossArea:form.grossArea,monthlyRent:form.monthlyRent})});
   const payload=await response.json() as Payload;
   if(payload.extraction?.serverFetch&&payload.extraction.serverFetch!=='not_requested')setListingFetched(true);
   if(payload.listing){
    const found=payload.listing;
    setForm(prev=>{
     const net=found.netArea||prev.netArea||'';
     const gross=found.grossArea||prev.grossArea||'';
     const areaType=gross?'gross':net?'net':found.areaType||prev.areaType||'';
     return {...prev,...found,city:found.city||prev.city,price:found.price||prev.price,netArea:net,grossArea:gross,areaType,area:gross||net||found.area||prev.area,monthlyRent:found.monthlyRent||prev.monthlyRent};
    });
   }
   setResult(payload);
   if(payload.status==='unavailable'||(!response.ok&&payload.status!=='no_data'))throw new Error(payload.error||'İşlem tamamlanamadı.');
  }catch(cause){setError(cause instanceof Error?cause.message:'Bağlantı kurulamadı.');}
  finally{setBusy(false)}
 }
 function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();void request(false)}
 const source=result?.sources;
 const comparisonDelta=result?.comparison?.grossDifferencePercent??result?.comparison?.netDifferencePercent;
 const comparisonBasis=result?.comparison?.grossDifferencePercent!=null?'brüt':'net (yaklaşık)';
 const comparisonTone=comparisonDelta==null?'neutral':Math.abs(comparisonDelta)<5?'near':comparisonDelta<0?'below':'above';
 const comparisonSummary=comparisonDelta==null?'İlan m² fiyatı için karşılaştırılabilir alan verisi yok.':Math.abs(comparisonDelta)<5?`${comparisonBasis} m² fiyatı il göstergesine yakın.`:`İlanın ${comparisonBasis} m² fiyatı TCMB il göstergesinden %${number(Math.abs(comparisonDelta))} ${comparisonDelta>0?'yüksek':'düşük'}.`;
 return <section id="ilan-analizi" className="listing-analyzer tcmb-listing-analyzer" aria-labelledby="listing-analyzer-title">
  <div className="listing-analyzer-copy">
   <p className="eyebrow">KONUT İLANI · TCMB GÖSTERGESİ</p>
   <h2 id="listing-analyzer-title">İlanı il verisiyle karşılaştırın</h2>
   <p>İlan bağlantısını girip alınabilen bilgileri aktarın; eksikleri tamamlayın. Bağlantı kullanmadan bilgileri kendiniz de girebilirsiniz.</p>
   <div className="tcmb-tool-points"><span><ShieldCheck size={16}/> TCMB EVDS kaynaklı</span><span><Info size={16}/> İl göstergesi, mahalle emsali değildir</span></div>
   <small>İl göstergesi mahalle emsali değildir. TCMB m² birim fiyatı ve birim kira göstergesi brüt kullanım alanı üzerinden tanımlanır.</small>
  </div>
  <div className="listing-analyzer-form">
   <form onSubmit={submit}>
    <label htmlFor="listing-url">İlan bağlantısı <span>(isteğe bağlı)</span></label>
    <div className="listing-url-row tcmb-url-row"><input id="listing-url" type="url" placeholder="https://www.hepsiemlak.com/…" value={url} onChange={event=>{setUrl(event.target.value);setListingFetched(false);setResult(null)}}/><button type="button" className="tcmb-extract" disabled={!url||busy} onClick={()=>void request(true)}><Search size={16}/>{busy?'Kontrol ediliyor…':'İlandan bilgileri al'}</button></div>
    <p className="tcmb-form-hint">Bağlantı yalnızca Sahibinden, Hepsiemlak ve Emlakjet ilanlarında denenir. İlan sayfası bilgileri gizliyorsa eksikleri kendiniz girin.</p>
    <div className="tcmb-form-grid">
     <label>İl<select autoComplete="address-level1" value={form.city} onChange={e=>update('city',e.target.value)}>{provinces.map(city=><option key={city} value={city}>{city}</option>)}</select></label>
     <label>İlan fiyatı<input type="number" min="1" step="any" inputMode="decimal" placeholder="6.500.000" value={form.price??''} onChange={e=>update('price',e.target.value)}/><small>TL</small></label>
     <label>Net alan<input type="number" min="1" step="any" inputMode="decimal" placeholder="55" value={form.netArea??''} onChange={e=>updateArea('netArea',e.target.value)}/><small>m²</small></label>
     <label>Brüt alan<input type="number" min="1" step="any" inputMode="decimal" placeholder="70" value={form.grossArea??''} onChange={e=>updateArea('grossArea',e.target.value)}/><small>m²</small></label>
     <label className="tcmb-optional-rent">Bilinen aylık kira <span>(isteğe bağlı)</span><input type="number" min="1" step="any" inputMode="decimal" placeholder="30.000" value={form.monthlyRent||''} onChange={e=>update('monthlyRent',e.target.value)}/><small>TL/ay</small></label>
    </div>
   <p className="tcmb-form-hint">İlan fiyatı toplam fiyattır; m² karşılaştırmasında alan türü önemlidir. Net ve brüt alan birlikte girilirse TCMB’nin brüt göstergesi, bu ilanın brüt/net oranıyla net m² karşılığına çevrilir. Bu oran bilinmiyorsa net alan brüte tahminle çevrilmez.</p>
    <button className="tcmb-submit" type="submit" disabled={busy}>{busy?'Hesaplanıyor…':complete?'Karşılaştırma raporunu oluştur':'Eksik bilgileri kontrol et'}</button>
   </form>
   {error&&<p className="listing-error" role="alert">{error}</p>}
   {(result?.status==='needs_input'||result?.status==='extracted')&&<div className="tcmb-feedback" role="status"><strong>{result.extraction?.listingParsed===false?'İlan bilgileri alınamadı':result.status==='extracted'?'İlan bilgileri forma aktarıldı':'Eksik bilgileri tamamlayın'}</strong><p>{result.message||'İlandan alınabilen bilgiler forma aktarıldı.'} {userMissing.length?`Manuel kontrol edilecek alanlar: ${userMissing.map(field=>({city:'il',price:'ilan fiyatı',area:'net veya brüt alan',monthlyRent:'aylık kira'}[field]||field)).join(', ')}.`:'Formdaki bilgileri kontrol edip karşılaştırmayı başlatın.'}</p></div>}
   {result?.extraction?.serverFetch&&result.extraction.serverFetch!=='not_requested'&&!result.extraction.listingParsed&&<p className="tcmb-feedback" role="status">{result.extraction.serverFetch==='fetched'?'İlan sayfasından fiyat ve alan bilgileri birlikte alınamadı. Lütfen eksikleri manuel doldurun.':'İlan bilgileri alınamadı. Lütfen bilgileri manuel doldurun.'}{result.status==='available'?' Rapor, girdiğiniz bilgilerle oluşturuldu.':''}</p>}
   {result?.status==='no_data'&&<div className="tcmb-feedback tcmb-unavailable" role="status"><strong>TCMB karşılaştırması yapılamadı</strong><p>{result.message||'Bu il için karşılaştırılabilir TCMB verisi bulunamadı.'} Başka bir il veya dönem verisi kullanılmadı.</p></div>}
   {result?.status==='available'&&result.comparison&&<div className="tcmb-report" aria-live="polite">
    <div className="tcmb-report-heading"><span>İL BAZLI GÖSTERGE RAPORU</span><b>{result.listing?.city}{result.listing?.district?` · ${result.listing.district}`:''}{result.listing?.neighborhood?` · ${result.listing.neighborhood}`:''}</b></div>
    <p className="tcmb-report-intro">İlanın net ve brüt m² fiyatlarını aynı alan türündeki göstergelerle eşleştiriyoruz: brütü brütle, neti netle. Net TCMB karşılığı yaklaşık olarak bu ilanın alan oranıyla türetilir.</p>
    <div className={`tcmb-plain-summary tcmb-summary-${comparisonTone}`}><strong>{comparisonSummary}</strong><p>Bu, ilan fiyatını il düzeyindeki bir referansla karşılaştırır; tek başına “ucuz” veya “pahalı” sonucu değildir. Mahalle emsallerini ve dairenin özelliklerini ayrıca kontrol edin. Yeşil düşük, amber yüksek, gri ise yakın farkı gösterir.</p></div>
    <div className="tcmb-metric-grid">
     {result.listing?.grossM2Price!=null&&<article><span>İlan m² fiyatı · brüt alan</span><strong>{money(result.listing.grossM2Price)} / m²</strong></article>}
     {result.listing?.netM2Price!=null&&<article><span>İlan m² fiyatı · net alan</span><strong>{money(result.listing.netM2Price)} / m²</strong></article>}
     <article><span>TCMB il göstergesi · brüt m²</span><strong>{money(result.comparison.provinceUnitPriceM2)} / m²</strong></article>
     {result.listing?.grossM2Price!=null&&<article className="tcmb-primary-metric"><span>Brüt ↔ brüt kıyas</span><strong>{result.comparison.grossDifferencePercent==null?'—':Math.abs(result.comparison.grossDifferencePercent)<0.005?'Yaklaşık aynı düzey':'%'+number(Math.abs(result.comparison.grossDifferencePercent))+' '+(result.comparison.grossDifferencePercent>0?'yüksek':'düşük')}</strong><small>{money(result.listing.grossM2Price)} ilan brüt m² · {money(result.comparison.provinceUnitPriceM2)} TCMB brüt m²</small></article>}
     {result.listing?.netM2Price!=null&&result.comparison.netEquivalentM2Price!=null&&<article className="tcmb-primary-metric"><span>Net ↔ net kıyas (yaklaşık)</span><strong>{result.comparison.netDifferencePercent==null?'—':Math.abs(result.comparison.netDifferencePercent)<0.005?'Yaklaşık aynı düzey':'%'+number(Math.abs(result.comparison.netDifferencePercent))+' '+(result.comparison.netDifferencePercent>0?'yüksek':'düşük')}</strong><small>{money(result.listing.netM2Price)} ilan net m² · {money(result.comparison.netEquivalentM2Price)} türetilmiş TCMB net m². Alan katsayısı: {number(result.comparison.netAreaRatio||0)}.</small></article>}
     {result.listing?.grossM2Price==null&&<article className="tcmb-area-warning"><span>Brüt ↔ brüt kıyas</span><strong>Yapılamıyor</strong><small>İlanın brüt alanı girilmedi.</small></article>}
     {result.listing?.netM2Price!=null&&result.comparison.netEquivalentM2Price==null&&<article className="tcmb-area-warning"><span>Net ↔ net kıyas</span><strong>Yapılamıyor</strong><small>Net karşılık için ilanın net ve brüt alanı birlikte gerekir.</small></article>}
     {result.rent&&<article><span>TCMB kira göstergesine göre tahmini aylık brüt kira · brüt alan</span><strong>{money(result.rent.monthlyGrossRent)}</strong><small>{money(result.rent.unitMonthlyRentPerM2)} / m² / ay × {number(Number(result.listing?.grossArea))} m² brüt</small></article>}
     {result.rent&&<article><span>TCMB kira göstergesine göre yıllık brüt getiri</span><strong>%{number(result.rent.annualGrossYieldPercent)}</strong></article>}
     {result.rent&&<article><span>TCMB kira göstergesine göre basit amortisman</span><strong>{number(result.rent.paybackYears)} yıl</strong></article>}
     {result.userRent&&<article><span>Girilen kiraya göre yıllık brüt getiri</span><strong>%{number(result.userRent.annualGrossYieldPercent)}</strong></article>}
     {result.userRent&&<article><span>Girilen kiraya göre basit amortisman</span><strong>{number(result.userRent.paybackYears)} yıl</strong></article>}
    </div>
    {result.comparison.reviewRecommended&&<div className="tcmb-review-warning"><strong>İl göstergesinden fark belirgin</strong><p>Fark, yapılandırılmış %{number(result.comparison.thresholdPercent)} uyarı eşiğine ulaşıyor. Bu eşik TCMB standardı değildir ve tek başına fiyatın pahalı/ucuz olduğu anlamına gelmez. Mahalle, bina yaşı, kat, manzara, site özellikleri, net/brüt alan ve konutun durumu karşılaştırmayı etkileyebilir.</p></div>}
    <div className="tcmb-comparison-note"><strong>Bu sonucu nasıl okuyabilirsiniz?</strong><p>Brüt kıyas TCMB’nin yayımladığı brüt göstergeyi kullanır. Net kıyas, brüt TCMB değerinin bu ilanın brüt/net oranıyla nete uyarlanmış yaklaşık karşılığıdır; TCMB’nin yayımladığı net seri değildir. Fark, yalnız il göstergesinden sapmayı anlatır; ucuz/pahalı hükmü vermez. Daha anlamlı fikir için benzer mahallede, alanı ve bina nitelikleri yakın ilanları karşılaştırıp alan bilgisini doğrulayın.</p></div>
    <div className="tcmb-source-grid">
     {source?.housePrice&&<article><b>TCMB · {source.housePrice.seriesName}</b><span>Dönem: {prettyPeriod(source.housePrice.period)} · Birim: {source.housePrice.unit} · Alan: {source.housePrice.areaBasis||'brüt kullanım alanı'} · Sıklık: {source.housePrice.frequency}</span><span>Veri alınma zamanı: {new Date(source.housePrice.retrievedAt).toLocaleString('tr-TR')}</span><a href={source.housePrice.sourceUrl} target="_blank" rel="noreferrer">Seri tablosu <ArrowUpRight size={13}/></a>{source.housePrice.methodologyUrl&&<a href={source.housePrice.methodologyUrl} target="_blank" rel="noreferrer">TCMB yöntem dokümanı <ArrowUpRight size={13}/></a>}</article>}
     {source?.rent&&<article><b>TCMB · {source.rent.seriesName}</b><span>Dönem: {prettyPeriod(source.rent.period)} · Birim: {source.rent.unit} · Alan: {source.rent.areaBasis||'brüt kullanım alanı'} · Sıklık: {source.rent.frequency}</span><span>Veri alınma zamanı: {new Date(source.rent.retrievedAt).toLocaleString('tr-TR')}</span><a href={source.rent.sourceUrl} target="_blank" rel="noreferrer">Resmî veri tablosu <ArrowUpRight size={13}/></a>{source.rent.methodologyUrl&&<a href={source.rent.methodologyUrl} target="_blank" rel="noreferrer">TCMB yöntem dokümanı <ArrowUpRight size={13}/></a>}</article>}
    </div>
    {!result.rent&&<p className="tcmb-rent-missing">{!result.listing?.grossArea?'TCMB kira göstergesi brüt alan bazındadır; brüt ilan alanı olmadığı için tahmini kira hesaplanmadı.':'Bu il/dönem için karşılaştırılabilir birim kira verisi bulunamadı; kira tahmini gösterilmedi.'}</p>}
    <p className="tcmb-disclaimer">Bu sonuçlar TCMB’nin il bazlı değerleme verilerinden üretilen yaklaşık göstergelerdir; belirli bir konut için ekspertiz, gerçekleşmiş satış fiyatı, kira garantisi veya yatırım tavsiyesi değildir. İlan fiyatı gerçekleşen satış fiyatından farklı olabilir. Brüt kira getirisi ve amortisman hesabı vergi, aidat, bakım, boş kalma süresi ve diğer masrafları içermez. İl göstergesi mahalle veya daire özelliklerine göre emsal karşılaştırmasının yerine geçmez.</p>
   </div>}
  </div>
 </section>;
}
