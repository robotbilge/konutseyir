'use client';

import {useEffect,useMemo,useState} from 'react';

type ReturnRow={period:string;instrument:string;horizon:string;deflator:string;kind:string;value:number;retrievedAt:string};
type Payload={status:string;period:string;retrievedAt:string;items:ReturnRow[];source:string;sourceUrl:string;message?:string};
const instruments=[['deposit','Mevduat faizi (brüt)'],['bist100','BIST 100'],['gold','Külçe altın'],['usd','Amerikan doları'],['eur','Euro'],['dibs','DİBS']];
const horizons=[['1m','1 ay'],['3m','3 ay'],['6m','6 ay'],['12m','1 yıl']];
const money=(value:number)=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(value);
const percent=(value:number)=>`${value>0?'+':''}${new Intl.NumberFormat('tr-TR',{maximumFractionDigits:2}).format(value)}%`;
const displayPeriod=(period:string)=>{const [year,month]=period.split('-').map(Number);return new Intl.DateTimeFormat('tr-TR',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,month-1,1)))};
export function FinancialReturns(){
 const [payload,setPayload]=useState<Payload|null>(null),[loadError,setLoadError]=useState(''),[amount,setAmount]=useState('100000'),[horizon,setHorizon]=useState('1m'),[deflator,setDeflator]=useState('cpi');
 useEffect(()=>{const controller=new AbortController();fetch('/api/financial-returns',{signal:controller.signal}).then(async response=>{const result=await response.json();if(!response.ok)throw Error(result.message||'TÜİK verisi şu anda alınamıyor.');return result}).then(setPayload).catch(error=>{if(!controller.signal.aborted)setLoadError(error.message||'TÜİK verisine şu anda ulaşılamıyor.')});return()=>controller.abort()},[]);
 const principal=Number(amount.replace(/\./g,'').replace(',','.'));
 const rows=useMemo(()=>{
  if(!payload||!Number.isFinite(principal)||principal<=0)return [];
  return instruments.map(([id,label])=>{
   const nominal=payload.items.find(row=>row.instrument===id&&row.horizon===horizon&&row.kind==='nominal');
   const real=payload.items.find(row=>row.instrument===id&&row.horizon===horizon&&row.kind==='real'&&row.deflator===deflator);
   if(!nominal||!real)return null;
   return {id,label,nominalPct:nominal.value,realPct:real.value,nominalEnd:principal*(1+nominal.value/100),realEnd:principal*(1+real.value/100)};
  }).filter((row):row is NonNullable<typeof row>=>row!==null).sort((a,b)=>b.realPct-a.realPct);
 },[payload,principal,horizon,deflator]);
 const best=rows[0];
 return <section className="financial-returns" aria-labelledby="financial-returns-title">
  <div className="financial-returns-heading"><p className="eyebrow">TÜİK · GEÇMİŞ DÖNEM KARŞILAŞTIRMASI</p><h2 id="financial-returns-title">Aynı tutar, farklı yatırım araçlarında ne kadar değişti?</h2><p>Bir tutar seçin; TÜİK’in yayımladığı son aylık veride 1, 3, 6 ve 12 aylık getirileri karşılaştırın. Reel tutar, seçtiğiniz enflasyon endeksine göre satın alma gücü değişimini gösterir.</p></div>
  <div className="financial-returns-controls">
   <label>Başlangıç tutarı (TL)<input inputMode="decimal" value={amount} onChange={event=>setAmount(event.target.value)} aria-label="Başlangıç tutarı, TL" placeholder="Örn. 100.000" /></label>
   <label>Getiri dönemi<select value={horizon} onChange={event=>setHorizon(event.target.value)}>{horizons.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
   <label>Satın alma gücü hesabı<select value={deflator} onChange={event=>setDeflator(event.target.value)}><option value="cpi">TÜFE ile (tüketici fiyatları)</option><option value="ppi">Yİ-ÜFE ile (üretici fiyatları)</option></select></label>
  </div>
  {!Number.isFinite(principal)||principal<=0?<p className="financial-returns-message" role="alert">Pozitif bir başlangıç tutarı girin.</p>:null}
  {loadError?<div className="financial-returns-message" role="status"><b>Karşılaştırma şu anda yüklenemedi.</b><p>{loadError} Veri yayımlandığında aktarım tekrar denenir.</p><a href="https://veriportali.tuik.gov.tr/tr/databrowser/tuik/categories/9/9_2/TR,DF_FINANSAL_YATIRIM_ARAC_REEL_GETIRI,1.0" target="_blank" rel="noreferrer">TÜİK veri portalını aç</a></div>:null}
  {payload&&rows.length===0?<p className="financial-returns-message">Seçilen dönem için bütün yatırım araçlarında karşılaştırılabilir veri bulunamadı.</p>:null}
  {best&&<div className="financial-returns-summary"><span>{displayPeriod(payload!.period)} verisi · {horizons.find(([id])=>id===horizon)?.[1]}</span><b>Bu geçmiş dönemde en yüksek {deflator==='cpi'?'TÜFE’ye göre':'Yİ-ÜFE’ye göre'} reel getiri: {best.label}</b><p>{money(principal)} tutarın satın alma gücü karşılığı <strong>{money(best.realEnd)}</strong> olurdu ({percent(best.realPct)}). Bu geçmiş ölçüm, aynı getirinin gelecekte tekrarlanacağını göstermez.</p></div>}
  {rows.length>0&&<div className="financial-returns-table-wrap"><table className="financial-returns-table"><thead><tr><th scope="col">Yatırım aracı</th><th scope="col">Nominal getiri</th><th scope="col">Dönem sonu nominal tutar</th><th scope="col">Reel getiri ({deflator==='cpi'?'TÜFE':'Yİ-ÜFE'})</th><th scope="col">Satın alma gücü karşılığı</th></tr></thead><tbody>{rows.map(row=><tr key={row.id}><th scope="row">{row.label}</th><td className={row.nominalPct>=0?'is-positive':'is-negative'}>{percent(row.nominalPct)}{row.id==='deposit'?<small>Brüt · stopaj düşülmemiştir</small>:null}</td><td>{money(row.nominalEnd)}</td><td className={row.realPct>=0?'is-positive':'is-negative'}>{percent(row.realPct)}</td><td><b>{money(row.realEnd)}</b></td></tr>)}</tbody></table></div>}
  {payload&&<p className="financial-returns-source">Kaynak: <a href={payload.sourceUrl} target="_blank" rel="noreferrer">{payload.source}</a>. Dönem: {displayPeriod(payload.period)} · Sisteme aktarım: {new Date(payload.retrievedAt).toLocaleDateString('tr-TR')}. Yüzdeler TÜİK’in dönemsel getiri oranlarıdır; başlangıç tutarına oransal uygulanmıştır.</p>}
  <p className="financial-returns-disclaimer">Bu ekran geriye dönük istatistiksel karşılaştırmadır; tahmin, kişiye özel getiri hesabı veya yatırım tavsiyesi değildir. Mevduat oranı brüttür ve stopaj içermez; BIST 100, DİBS, döviz ve altın için işlem masrafı, vergi, alış-satış farkı ve kişisel portföy sonuçları hesaba katılmaz. Reel tutar, tutarı ilgili TÜİK enflasyon endeksine göre düzeltir; Yİ-ÜFE üretici fiyatlarını, TÜFE ise tüketici fiyatlarını ölçer.</p>
 </section>;
}
