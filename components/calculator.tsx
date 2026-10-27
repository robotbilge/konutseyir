import {useEffect,useRef,useState} from 'react';
import {loan,termDeposit} from '../lib/finance.mjs';
import {depositReference} from '../lib/deposit-reference.mjs';
import {useMarketData} from './live-data';

export const money=(n:number)=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(n);

function Input({label,value,onChange,hint}:{label:string,value:number,onChange:(v:number)=>void,hint?:string}){
  return <label className="calc-field"><span>{label}</span><input type="number" step="any" value={Number.isNaN(value)?'':value} onChange={e=>onChange(e.target.value===''?NaN:Number(e.target.value))}/>{hint&&<small>{hint}</small>}</label>
}

function Safe({fn,children}:{fn:()=>any,children:(r:any)=>React.ReactNode}){
  try{return <>{children(fn())}</>}catch(e){return <p className="error" role="alert">{(e as Error).message}</p>}
}

export function Credit(){
  const[p,s]=useState({amount:2000000,rate:2.5,months:120,fees:0});
  return <section id="kredi" className="calc-section"><h2>Taksiti değil, toplam maliyeti görün.</h2><p>Oranlar bankaya ve müşteriye göre değişir. Bankanızın aylık oranını girerek senaryo oluşturun.</p><div className="fields">{([['amount','Kredi tutarı (TL)'],['rate','Aylık faiz (%)'],['months','Vade (ay)'],['fees','Toplam ek kredi gideri (TL)']]as const).map(([k,label])=><Input key={k} label={label} value={p[k]} onChange={v=>s({...p,[k]:v})}/>)}</div><Safe fn={()=>loan(p.amount,p.rate,p.months,p.fees)}>{r=><div className="metric-row"><p>Aylık taksit <b>{money(r.payment)}</b></p><p>Toplam ödeme + gider <b>{money(r.total)}</b></p><p>Faiz + ek maliyet <b>{money(r.cost)}</b></p></div>}</Safe><small>Sabit faiz, eşit taksit. Tahsis, ekspertiz, sigorta ve diğer masrafları “Toplam ek kredi gideri” alanına ekleyin.</small></section>
}

export function Deposit(){
 const[p,s]=useState({capital:1000000,rate:Number.NaN,days:32,tax:17.5});
 const market=useMarketData(),edited=useRef(false),liveDeposit=depositReference(market,p.days);
 const band=p.days<=31?'1–31 gün':p.days<=91?'32–91 gün':'Seçilen vade';
 useEffect(()=>{if(!edited.current)s(x=>({...x,rate:liveDeposit?.value??Number.NaN}))},[liveDeposit?.value,liveDeposit?.series]);
 return <section id="mevduat" className="calc-section"><h2>Vade sonunda net mevduat</h2>{liveDeposit?<p className="live-rate">TCMB {band} vadeli TL mevduat ağırlıklı ortalaması: <b>%{Number(liveDeposit.value).toLocaleString('tr-TR',{maximumFractionDigits:2})}</b> · {liveDeposit.period}. <span>Yıllık brüt oran sayfa açılışında otomatik alınır. Banka teklifi değildir; oranı değiştirebilirsiniz.</span>{edited.current&&<button type="button" onClick={()=>{edited.current=false;s(x=>({...x,rate:liveDeposit.value}))}}>TCMB oranını kullan</button>}</p>:<p className="live-rate" role="status">{p.days>91?'Bu vade için otomatik TCMB oranı yok. Bankanızın yıllık brüt oranını girin.':'Güncel TCMB mevduat oranı bekleniyor. Veri alınamazsa bankanızın yıllık brüt oranını girin; örnek faiz otomatik kullanılmaz.'}</p>}<div className="fields">{([['capital','Anapara (TL)'],['rate','Yıllık brüt faiz (%)'],['days','Vade (gün)'],['tax','Stopaj (%)']]as const).map(([k,label])=><Input key={k} label={label} value={p[k]} onChange={v=>{if(k==='rate')edited.current=true;s({...p,[k]:v})}}/>)}</div>{Number.isFinite(p.rate)?<Safe fn={()=>termDeposit(p.capital,p.rate,p.days,p.tax)}>{r=><div className="metric-row"><p>Brüt faiz <b>{money(r.gross)}</b></p><p>Stopaj kesintisi <b>{money(r.withheld)}</b></p><p>Net faiz <b>{money(r.net)}</b></p><p>Vade sonu <b>{money(r.total)}</b></p></div>}</Safe>:<p role="status">Hesaplama için yıllık brüt faiz oranı gerekli.</p>}<p>365 gün esası. Kaynak: <a href="https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Istatistikler/Faiz+Istatistikleri/Haftalik/Mevduat+Faiz+Oranlari/">TCMB haftalık akım, ağırlıklı ortalama mevduat faizleri</a> (EVDS TP.TRY.MT01 / TP.TRY.MT02). Son çekim: {liveDeposit?.retrievedAt?new Date(liveDeposit.retrievedAt).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'}):'—'} (TSİ). Stopaj yalnızca faizden kesilir. Stopaj girdisi güncel yasal oran teyidi değildir; hesap açılış/yenileme tarihi ve vade için bankanızdan doğrulayın.</p></section>
}
