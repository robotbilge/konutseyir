import {useEffect,useState} from 'react';
import {BarChart3,Landmark,Percent} from 'lucide-react';

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

export function CityMarket({slug,region}:{slug:string,region:string}){
 const[data,setData]=useState<any>(null),[error,setError]=useState('');
 useEffect(()=>{const controller=new AbortController();fetch(`/api/city-market?slug=${encodeURIComponent(slug)}`,{signal:controller.signal}).then(async r=>{if(!r.ok)throw Error();return r.json()}).then(setData).catch(()=>setError('Bölgesel seri şu anda alınamadı.'));return()=>controller.abort()},[slug]);
 if(error)return <span className="waiting">{error}</span>;
 if(!data)return <span className="data-loading">TCMB bölgesel verisi yükleniyor…</span>;
 if(data.value==null)return <span className="waiting">Bölgesel seride güncel kayıt bulunamadı.</span>;
 return <div className="city-live"><span>Endeks değeri</span><strong>{Number(data.value).toLocaleString('tr-TR',{maximumFractionDigits:2})}</strong><small>{region} · {data.period}</small>{data.annualChange!=null&&<b>Yıllık değişim %{Number(data.annualChange).toLocaleString('tr-TR',{maximumFractionDigits:2})}</b>}</div>
}
