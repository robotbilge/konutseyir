import {useEffect,useState} from 'react';
import {ArrowUpRight,BarChart3,Landmark,Newspaper,Percent} from 'lucide-react';

export type MarketItem={series:string,value:number|null,period:string|null,status:string,annualChange:number|null,retrievedAt:string|null};
export function useMarketData(){
 const[data,setData]=useState<MarketItem[]>([]);
 useEffect(()=>{const controller=new AbortController();fetch('/api/market-data',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(j=>Array.isArray(j.data)&&setData(j.data)).catch(()=>{});return()=>controller.abort()},[]);
 return data;
}
const pct=(value:number|null)=>value==null?'—':`%${value.toLocaleString('tr-TR',{maximumFractionDigits:2})}`;
export function MarketSnapshot(){
 const data=useMarketData(),deposit=data.find(x=>x.series==='deposit'),housing=data.find(x=>x.series==='housing'),cpi=data.find(x=>x.series==='cpi');
 const cards=[
  {icon:Percent,label:'3 aya kadar TL mevduat',value:pct(deposit?.value??null),detail:deposit?.period||'Veri bekleniyor'},
  {icon:BarChart3,label:'Konut fiyatı yıllık değişim',value:pct(housing?.annualChange??null),detail:housing?.period||'Veri bekleniyor'},
  {icon:Landmark,label:'TÜFE yıllık değişim',value:pct(cpi?.annualChange??null),detail:cpi?.period||'Veri bekleniyor'}
 ];
 return <section className="market-snapshot" aria-label="Güncel piyasa göstergeleri"><div><p className="eyebrow">RESMÎ VERİLER</p><h2>Kararı etkileyen üç oran</h2><a href="/veri">Kaynak ve çekim saatleri →</a></div>{cards.map(({icon:Icon,...item})=><article key={item.label}><Icon/><span>{item.label}</span><strong>{item.value}</strong><small>Dönem: {item.detail}</small></article>)}</section>
}

export function LatestNews(){
 const[items,setItems]=useState<any[]>([]);
 useEffect(()=>{const controller=new AbortController();fetch('/api/news?limit=3',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(j=>setItems(j.items||[])).catch(()=>{});return()=>controller.abort()},[]);
 if(!items.length)return null;
 return <section className="latest-news"><header><div><p className="eyebrow">KONUT GÜNDEMİ</p><h2>Piyasayı etkileyen son gelişmeler</h2></div><a href="/haberler">Tüm haberler <ArrowUpRight/></a></header><div>{items.map(item=><article key={item.slug}><Newspaper/><span>{item.sourceName}</span><h3><a href={`/haberler/haber?slug=${encodeURIComponent(item.slug)}`}>{item.title}</a></h3><small>{new Intl.DateTimeFormat('tr-TR',{dateStyle:'medium',timeZone:'Europe/Istanbul'}).format(new Date(item.publishedAt))}</small></article>)}</div></section>
}

export function CityMarket({slug,region}:{slug:string,region:string}){
 const[data,setData]=useState<any>(null),[error,setError]=useState('');
 useEffect(()=>{const controller=new AbortController();fetch(`/api/city-market?slug=${encodeURIComponent(slug)}`,{signal:controller.signal}).then(async r=>{if(!r.ok)throw Error();return r.json()}).then(setData).catch(()=>setError('Bölgesel seri şu anda alınamadı.'));return()=>controller.abort()},[slug]);
 if(error)return <span className="waiting">{error}</span>;
 if(!data)return <span className="data-loading">TCMB bölgesel verisi yükleniyor…</span>;
 if(data.value==null)return <span className="waiting">Bölgesel seride güncel kayıt bulunamadı.</span>;
 const history=Array.isArray(data.history)?data.history:[],max=Math.max(...history.map((x:any)=>Number(x.value)||0),1);
 return <><div className="city-live"><span>Endeks değeri</span><strong>{Number(data.value).toLocaleString('tr-TR',{maximumFractionDigits:2})}</strong><small>{region} · {data.period}</small>{data.annualChange!=null&&<b>Yıllık değişim %{Number(data.annualChange).toLocaleString('tr-TR',{maximumFractionDigits:2})}</b>}</div>{history.length>1&&<div className="mini-history" aria-label="Son 24 aylık konut fiyat endeksi"><div className="mini-bars">{history.map((item:any)=><i key={item.period} title={`${item.period}: ${Number(item.value).toLocaleString('tr-TR')}`} style={{height:`${Math.max(8,Number(item.value)/max*100)}%`}}/>)}</div><small>{history[0].period}–{history.at(-1).period} endeks seyri</small></div>}</>
}

export function CitySales({slug}:{slug:string}){
 const[data,setData]=useState<any>(null),[error,setError]=useState('');
 useEffect(()=>{const controller=new AbortController();fetch(`/api/city-sales?slug=${encodeURIComponent(slug)}`,{signal:controller.signal}).then(async r=>{if(!r.ok)throw Error();return r.json()}).then(setData).catch(()=>setError('Satış verisi şu anda alınamadı.'));return()=>controller.abort()},[slug]);
 if(error)return <span className="waiting">{error}</span>;
 if(!data)return <span className="data-loading">TÜİK satış verisi yükleniyor…</span>;
 if(data.status!=='available')return <span className="waiting">Doğrulanmış il satış kaydı henüz bulunamadı.</span>;
 const n=(value:number)=>Number(value).toLocaleString('tr-TR'),rate=(value:number|null)=>value==null?'—':`${value>=0?'+':''}%${Number(value).toLocaleString('tr-TR',{maximumFractionDigits:1})}`,history=Array.isArray(data.history)?data.history:[],max=Math.max(...history.map((x:any)=>Number(x.total)||0),1),mortgageRate=data.total>0?data.mortgaged/data.total*100:null;
 return <div className="city-sales-live"><div className="sales-total"><span>Aylık toplam satış</span><strong>{n(data.total)}</strong><small>{data.period}</small></div><dl><div><dt>İpotekli</dt><dd>{n(data.mortgaged)}</dd></div><div><dt>İpotekli oranı</dt><dd>{rate(mortgageRate)}</dd></div><div><dt>İlk el</dt><dd>{n(data.firstSale)}</dd></div><div><dt>İkinci el</dt><dd>{n(data.secondHand)}</dd></div><div><dt>Aylık değişim</dt><dd className={data.monthlyChange<0?'negative':''}>{rate(data.monthlyChange)}</dd></div><div><dt>Yıllık değişim</dt><dd className={data.annualChange<0?'negative':''}>{rate(data.annualChange)}</dd></div></dl>{history.length>1&&<div className="mini-history sales-bars" aria-label="Son 13 aylık konut satışları"><div className="mini-bars">{history.map((item:any)=><i key={item.period} title={`${item.period}: ${n(item.total)}`} style={{height:`${Math.max(8,Number(item.total)/max*100)}%`}}/>)}</div><small>{history[0].period}–{history.at(-1).period} aylık satış seyri</small></div>}<small>Son çekim: {new Date(data.retrievedAt).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'})} (TSİ)</small></div>;
}
