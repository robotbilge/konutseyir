import {useEffect,useState} from 'react';
import {analyze,loan,termDeposit} from '../lib/finance.mjs';
import {useMarketData} from './live-data';

const initial={price:5000000,area:100,rent:30000,costs:200000,expenses:30000,tax:0,saleCosts:0,vacancy:1,inflation:30,growth:25,deposit:39,withholding:17.5,gold:30};
export const money=(n:number)=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(n);
const pct=(n:number)=>`%${n.toLocaleString('tr-TR',{maximumFractionDigits:2})}`;
const tone=(n:number)=>n<0?'value-negative':n>0?'value-positive':'value-neutral';

function Input({label,value,onChange,hint}:{label:string,value:number,onChange:(v:number)=>void,hint?:string}){
  return <label className="calc-field"><span>{label}</span><input type="number" step="any" value={Number.isNaN(value)?'':value} onChange={e=>onChange(e.target.value===''?NaN:Number(e.target.value))}/>{hint&&<small>{hint}</small>}</label>
}

function Safe({fn,children}:{fn:()=>any,children:(r:any)=>React.ReactNode}){
  try{return <>{children(fn())}</>}catch(e){return <p className="error" role="alert">{(e as Error).message}</p>}
}

function Comparison({r}:{r:any}){
  const options=[
    {key:'home',label:'Konut + kira',...r.home},
    {key:'deposit',label:'Mevduat',...r.deposit},
    {key:'gold',label:'Altın',...r.gold}
  ].sort((a,b)=>b.end-a.end);
  const winner=options[0];
  const depositDifference=r.deposit.end-r.home.end;
  const headToHead=depositDifference===0
    ? 'Konut ve mevduat aynı dönem sonu değerinde'
    : depositDifference>0
      ? `Mevduat, konuttan ${money(depositDifference)} daha yüksek`
      : `Konut, mevduattan ${money(Math.abs(depositDifference))} daha yüksek`;

  return <div className="comparison-block">
    <div className="comparison-verdict">
      <span>BU SENARYODA EN YÜKSEK DÖNEM SONU</span>
      <div><strong>{winner.label}</strong><b>{money(winner.end)}</b></div>
      <p>Sonuç, girdiğiniz bir yıllık varsayımlara göre hesaplanır; gelecek getiri tahmini değildir.</p>
    </div>
    <div className="head-to-head">
      <span>KONUT MU, FAİZ Mİ?</span>
      <strong>{headToHead}</strong>
      <small>Aynı başlangıç sermayesi ve mevduatta stopaj sonrası net faiz karşılaştırılmıştır.</small>
    </div>
    <div className="comparison-cards">
      {options.map((item,index)=><article className={index===0?'comparison-card winner':'comparison-card'} key={item.key}>
        <header><span className="rank">{index+1}</span><h4>{item.label}</h4>{index===0&&<b className="winner-badge">En yüksek</b>}</header>
        <div className="comparison-total"><small>Dönem sonu toplamı</small><strong>{money(item.end)}</strong></div>
        <dl>
          <div><dt>Nominal kâr / zarar</dt><dd className={tone(item.profit)}>{money(item.profit)} <small>{pct(item.rate)}</small></dd></div>
          <div><dt>Reel kâr / zarar</dt><dd className={tone(item.realProfit)}>{money(item.realProfit)} <small>{pct(item.realRate)}</small></dd></div>
        </dl>
      </article>)}
    </div>
  </div>
}

export function Calculator(){
  const[p,set]=useState(initial);
  const market=useMarketData(),liveDeposit=market.find(x=>x.series==='deposit');
  const field=(k:keyof typeof initial,label:string,hint?:string)=><Input key={k} label={label} hint={hint} value={p[k]} onChange={v=>set(x=>({...x,[k]:v}))}/>;
  return <section id="analiz" className="calc-section main-calculator">
    <span id="kira-carpani" className="anchor-target" aria-hidden="true"/><span id="metrekare" className="anchor-target" aria-hidden="true"/>
    <div className="calc-heading"><div><p className="eyebrow">İLANINIZI HESAPLAYIN</p><h2>Bu konut yatırım için mantıklı mı?</h2></div><p>İlandaki bilgileri kullanın. Başlangıç değerleri örnek senaryodur; sonuç girdiğiniz rakamlarla anında güncellenir.</p></div>
    <div className="calculator-layout">
      <div className="calc-panel">
        <h3 id="alim-masrafi"><span>01</span>Konut ve alım maliyeti</h3>
        <div className="fields">{field('price','Satış fiyatı (TL)')}{field('area','Net alan (m²)')}{field('costs','Toplam alım masrafı (TL)','Tapu, komisyon, tadilat ve diğer tek seferlik giderler.')}</div>
        <h3 id="net-kira"><span>02</span>Net kira hesabı</h3>
        <div className="fields">{field('rent','Aylık kira (TL)')}{field('vacancy','Yılda boş kalan ay','0–12 ay.')}{field('expenses','Yıllık işletme gideri (TL)','Malik aidatı, bakım, sigorta; gelir vergisi hariç.')}{field('tax','Yıllık kira gelir vergisi (TL)','Kendi durumunuza göre hesaplanan tutar; 0 muafiyet anlamına gelmez.')}</div>
        <h3 id="reel-getiri"><span>03</span>Bir yıllık senaryo</h3>
        <div className="fields">{field('growth','Konut fiyat değişimi (%)')}{field('inflation','Yıllık enflasyon (%)','Gelecek beklentiniz; geçmiş TÜFE tahmin değildir.')}{field('deposit','Yıllık brüt mevduat faizi (%)',liveDeposit?.value!=null?`TCMB 3 aya kadar vadeli TL mevduat istatistiği: %${Number(liveDeposit.value).toLocaleString('tr-TR',{maximumFractionDigits:2})} · ${liveDeposit.period}. Hesap alanı banka teklifini temsil etmez; kendi oranınızı girin.`:'Canlı TCMB verisi bekleniyor.')}{field('withholding','Mevduat stopajı (%)','Hesap türü, açılış tarihi ve vade için bankanızdan doğrulayın.')}{field('gold','Altın fiyat değişimi (%)','Alış/satış farkı dahil net beklentiniz.')}{field('saleCosts','Dönem sonu satış gideri (TL)','Satış varsayımında komisyon ve varsa vergiler.')}</div>
        <button className="secondary" onClick={()=>set(initial)}>Örneğe sıfırla</button>
      </div>
      <div className="calc-results" aria-live="polite">
        <Safe fn={()=>analyze(p)}>{r=><>
          <div className="result-kicker">CANLI HESAP SONUCU</div>
          <div className={r.net<0?'result-hero is-negative':'result-hero'}><span>Yıllık net kira geliri</span><strong>{money(r.net)}</strong><b>{pct(r.netYield)} net getiri</b></div>
          <h3>Kira ve yatırım özeti</h3>
          <dl className="results-list">
            {[['Toplam başlangıç yatırımı',money(r.capital)],['Net m² fiyatı',money(r.pricePerM2)],['Yıllık brüt kira',`${money(r.gross)} · ${pct(r.grossYield)}`],['Boş kalma kaybı',money(r.emptyLoss)],['Tahsil edilebilir yıllık kira',money(r.collected)],['İşletme gideri + kira vergisi',money(p.expenses+p.tax)],['Aylık ortalama net kira',money(r.monthlyNet)],['Brüt kira çarpanı',r.multiplierMonths===null?'Hesaplanamaz':`${r.multiplierMonths.toFixed(1)} ay / ${(r.multiplierMonths/12).toFixed(1)} yıl`],['Net kira ile geri dönüş',r.payback===null?'Pozitif net kira yok':`${r.payback.toFixed(1)} yıl`]].map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <small>Sabit kira ile basit geri dönüş. Kira getiri oranları alım masrafları dahil başlangıç yatırımına bölünür.</small>
          <h3>12 ay sonunda tahmini değer</h3>
          <Comparison r={r}/>
          <p className="deposit-summary">Mevduat brüt faiz: <b>{money(r.depositGross)}</b> · stopaj: <b>{money(r.withheld)}</b> · net faiz: <b>{money(r.deposit.profit)}</b>.</p>
          <p className="calc-note">365 günlük, kredisiz ve basit getirili senaryodur. Mevduatta girilen oran yıl boyunca varsayılır; vade yenileme garantisi yoktur. Kira yeniden yatırıma yönlendirilmez. Konut sonucu satış gideri sonrası varsayımsal değerdir. Reel TL, başlangıç gününün satın alma gücüdür.</p>
          <button className="print-button" onClick={()=>window.print()}>Raporu yazdır / PDF kaydet</button>
        </>}</Safe>
      </div>
    </div>
  </section>
}

export function Credit(){
  const[p,s]=useState({amount:2000000,rate:2.5,months:120,fees:0});
  return <section id="kredi" className="calc-section"><h2>Taksiti değil, toplam maliyeti görün.</h2><p>Oranlar bankaya ve müşteriye göre değişir. Bankanızın aylık oranını girerek senaryo oluşturun.</p><div className="fields">{([['amount','Kredi tutarı (TL)'],['rate','Aylık faiz (%)'],['months','Vade (ay)'],['fees','Toplam ek kredi gideri (TL)']]as const).map(([k,label])=><Input key={k} label={label} value={p[k]} onChange={v=>s({...p,[k]:v})}/>)}</div><Safe fn={()=>loan(p.amount,p.rate,p.months,p.fees)}>{r=><div className="metric-row"><p>Aylık taksit <b>{money(r.payment)}</b></p><p>Toplam ödeme + gider <b>{money(r.total)}</b></p><p>Faiz + ek maliyet <b>{money(r.cost)}</b></p></div>}</Safe><small>Sabit faiz, eşit taksit. Tahsis, ekspertiz, sigorta ve diğer masrafları “Toplam ek kredi gideri” alanına ekleyin.</small></section>
}

export function Deposit(){
  const[p,s]=useState({capital:1000000,rate:35,days:32,tax:17.5});
  const market=useMarketData(),liveDeposit=market.find(x=>x.series==='deposit');
  useEffect(()=>{if(liveDeposit?.value!=null)s(x=>({...x,rate:Number(liveDeposit.value)}))},[liveDeposit?.value]);
  return <section id="mevduat" className="calc-section"><h2>Vade sonunda net mevduat</h2>{liveDeposit?.value!=null&&<p className="live-rate">TCMB 3 aya kadar vadeli TL mevduat ortalaması: <b>%{Number(liveDeposit.value).toLocaleString('tr-TR',{maximumFractionDigits:2})}</b> · {liveDeposit.period}</p>}<div className="fields">{([['capital','Anapara (TL)'],['rate','Yıllık brüt faiz (%)'],['days','Vade (gün)'],['tax','Stopaj (%)']]as const).map(([k,label])=><Input key={k} label={label} value={p[k]} onChange={v=>s({...p,[k]:v})}/>)}</div><Safe fn={()=>termDeposit(p.capital,p.rate,p.days,p.tax)}>{r=><div className="metric-row"><p>Brüt faiz <b>{money(r.gross)}</b></p><p>Stopaj kesintisi <b>{money(r.withheld)}</b></p><p>Net faiz <b>{money(r.net)}</b></p><p>Vade sonu <b>{money(r.total)}</b></p></div>}</Safe><p>365 gün esası. Stopaj yalnızca faizden kesilir. Örnek oran güncel yasal oran teyidi değildir; hesap açılış/yenileme tarihi ve vade için bankanızdan doğrulayın.</p></section>
}
