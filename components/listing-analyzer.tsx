'use client';
import {useState} from 'react';

type Result = {
  message?: string;
  calculatorUrl: string;
  analysis: {
    listing: { price:number|null; area:number|null; city:string|null; district:string|null; neighborhood:string|null; referenceM2:number|null; monthlyRent:number|null };
    currentM2:number|null;
    referenceM2:number|null;
    valuation:{label:string;tone:string;differencePercent:number}|null;
    grossPaybackYears:number|null;
    status:string;
  };
};

const money=(value:number)=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(value);

export function ListingAnalyzer(){
  const[url,setUrl]=useState('');
  const[result,setResult]=useState<Result|null>(null);
  const[error,setError]=useState('');
  const[busy,setBusy]=useState(false);

  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setError('');setResult(null);setBusy(true);
    try{
      const response=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url})});
      const payload=await response.json();
      if(!response.ok)throw new Error(payload.error||'İlan analiz edilemedi.');
      setResult(payload);
    }catch(cause){setError(cause instanceof Error?cause.message:'Bağlantı kurulamadı.');}
    finally{setBusy(false);}
  }

  return <section className="listing-analyzer" aria-labelledby="listing-analyzer-title">
    <div className="listing-analyzer-copy">
      <p className="eyebrow">İLAN FİYAT KONTROLÜ</p>
      <h2 id="listing-analyzer-title">İlan fiyatını bölge verisiyle kontrol edin</h2>
      <p>Sahibinden, Hepsiemlak veya Emlakjet ilan bağlantısını ekleyin. Erişilebilen fiyat, alan ve bölge endeksini hesap makinesine aktarın.</p>
      <small>Yalnızca ilan sayfasında sunulan ve erişilebilen veriler kullanılır. Bölge endeksi yoksa ucuz/pahalı etiketi gösterilmez.</small>
    </div>
    <div className="listing-analyzer-form">
      <form onSubmit={submit}>
        <label htmlFor="listing-url">İlan bağlantısı</label>
        <div className="listing-url-row"><input id="listing-url" type="url" placeholder="https://…" required value={url} onChange={event=>setUrl(event.target.value)}/><button type="submit" disabled={busy}>{busy?'Kontrol ediliyor…':'İlanı analiz et'}</button></div>
      </form>
      {error&&<p className="listing-error" role="alert">{error}</p>}
      {result&&<div className="listing-result" aria-live="polite">
        {result.analysis.valuation
          ? <span className={'listing-badge '+result.analysis.valuation.tone}>{result.analysis.valuation.label} · %{Math.abs(result.analysis.valuation.differencePercent).toLocaleString('tr-TR',{maximumFractionDigits:2})} {result.analysis.valuation.differencePercent>=0?'üstünde':'altında'}</span>
          : <span className="listing-badge neutral">Bölge endeksi bulunamadı</span>}
        <p>{result.message}</p>
        <dl>
          {result.analysis.currentM2&&<div><dt>İlan m² fiyatı</dt><dd>{money(result.analysis.currentM2)}</dd></div>}
          {result.analysis.referenceM2&&<div><dt>Bölge referansı</dt><dd>{money(result.analysis.referenceM2)} / m²</dd></div>}
          {result.analysis.grossPaybackYears&&<div><dt>Basit brüt kira çarpanı</dt><dd>{result.analysis.grossPaybackYears.toLocaleString('tr-TR',{maximumFractionDigits:1})} yıl</dd></div>}
        </dl>
        <a className="listing-cta" href={result.calculatorUrl}>Detaylı alternatif getiri analizini KonutSeyir'de gör</a>
        <small>Brüt kira çarpanı; boş kalma, vergi ve bakım giderlerini içermez. Gösterge yatırım tavsiyesi değildir.</small>
      </div>}
    </div>
  </section>;
}
