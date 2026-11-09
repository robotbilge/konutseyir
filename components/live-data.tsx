import {IndexReading,SalesReading} from './market-reading';
import {ceilToHundredth} from '../lib/standard-math.mjs';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Landmark,Newspaper,Percent} from 'lucide-react';

export type MarketItem={series:string,value:number|null,period:string|null,status:string,annualChange:number|null,twelveMonthAverage:number|null,twelveMonthAveragePeriod:string|null,retrievedAt:string|null};
export function useMarketData(){
 const[data,setData]=useState<MarketItem[]>([]);
 useEffect(()=>{const controller=new AbortController();fetch('/api/market-data',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(j=>Array.isArray(j.data)&&setData(j.data)).catch(()=>{});return()=>controller.abort()},[]);
 return data;
}
const pct=(value:number|null)=>value==null?'—':`%${value.toLocaleString('tr-TR',{maximumFractionDigits:2})}`;
export function MarketSnapshot(){
 const data=useMarketData(),policy=data.find(x=>x.series==='policy'),cpi=data.find(x=>x.series==='cpi');
 const average=cpi?.twelveMonthAverage??null;
 const cards=[
  {icon:Percent,label:'TCMB politika faizi',value:pct(policy?.value??null),detail:policy?.period||'Veri bekleniyor',policy:true},
  {icon:Landmark,label:'TÜFE yıllık değişim',value:pct(cpi?.annualChange??null),detail:cpi?.period,policy:false},
  {icon:Landmark,label:'TÜFE 12 aylık ortalama (%)',value:average===null?'—':`%${ceilToHundredth(average).toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})}`,detail:average===null?null:cpi?.twelveMonthAveragePeriod??cpi?.period,policy:false}
 ];
 const cpiPeriod=(period?:string|null)=>period&&Number.isFinite(Date.parse(period+'T00:00:00Z'))?new Intl.DateTimeFormat('tr-TR',{month:'long',year:'numeric',timeZone:'Europe/Istanbul'}).format(new Date(period+'T00:00:00Z')):'Veri bekleniyor';
 return <section className="market-snapshot" aria-label="Güncel piyasa göstergeleri"><div><p className="eyebrow">RESMÎ VERİLER</p><h2>Faiz ve enflasyon verileri</h2><a href="/veri">Kaynak ve çekim saatleri →</a></div>{cards.map(({icon:Icon,...item})=><article key={item.label}><Icon/><span>{item.label}</span><strong>{item.value}</strong><small>{item.policy?'Yürürlük tarihi':'Dönem'}: {item.policy?item.detail:cpiPeriod(item.detail)}</small>{!item.policy&&<><small>Aylık yayımlanır · TÜİK / TCMB EVDS</small><small>Son kontrol: {cpi?.retrievedAt?new Date(cpi.retrievedAt).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'}):'—'} (TSİ)</small>{cpi&&cpi.status!=='available'&&<small role="status">Güncel kaynak doğrulanamadı; son başarılı dönem gösteriliyor.</small>}</>}{item.policy&&<><small>Son kontrol: {policy?.retrievedAt?new Date(policy.retrievedAt).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'}):'—'} (TSİ)</small>{policy?.status!=='available'&&<small role="status">{policy?.value!=null?'Güncel kaynak doğrulanamadı; son başarılı kayıt gösteriliyor.':'Politika faizi şu anda doğrulanamıyor.'}</small>}</>}</article>)}</section>
}

export function LatestNews(){
 const[items,setItems]=useState<any[]>([]);
 useEffect(()=>{const controller=new AbortController();fetch('/api/news?limit=3',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(j=>setItems(j.items||[])).catch(()=>{});return()=>controller.abort()},[]);
 if(!items.length)return null;
 return <section className="latest-news"><header><div><p className="eyebrow">KONUT GÜNDEMİ</p><h2>Piyasayı etkileyen son gelişmeler</h2></div><a href="/haberler">Tüm haberler <ArrowUpRight/></a></header><div>{items.map(item=><article key={item.slug}><Newspaper/><span>{item.sourceName}</span><h3><a href={`/haberler/haber?slug=${encodeURIComponent(item.slug)}`}>{item.title}</a></h3><small>{new Intl.DateTimeFormat('tr-TR',{dateStyle:'medium',timeZone:'Europe/Istanbul'}).format(new Date(item.publishedAt))}</small></article>)}</div></section>
}

type CityMarketData={
 period:string;region:string;value:number|null;annualChange:number|null;status:string;retrievedAt:string|null;
 history?:{period:string;value:number}[];
};
type CitySalesData={
 period:string;status:string;total:number;mortgaged:number;firstSale:number;secondHand:number;retrievedAt:string;
 monthlyChange:number|null;annualChange:number|null;history?:{period:string;total:number}[];
};
type DistrictSalesData={
 period:string|null;status:string;latestCityPeriod:string|null;retrievedAt:string|null;
 items:{districtName:string;total:number}[];
};

function useCityData<T extends {period?:string|null}>(url:string,initialData?:T|null){
 const [data,setData]=useState<T|null>(initialData??null);
 const [error,setError]=useState(false);
 useEffect(()=>{
  const controller=new AbortController();
  fetch(url,{signal:controller.signal})
   .then(response=>response.ok?response.json() as Promise<T>:Promise.reject())
   .then(next=>setData(current=>current?.period&&(!next?.period||next.period<current.period)?current:next))
   .catch(()=>{if(!controller.signal.aborted)setError(true)});
  return()=>controller.abort();
 },[url]);
 return {data,error};
}

const sourceTime=(value:string)=>new Date(value.replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/,'$1T$2Z')).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'});

export function CityMarket({slug,region,initialData}:{slug:string,region:string,initialData?:CityMarketData|null}){
 const {data,error}=useCityData(`/api/city-market?slug=${encodeURIComponent(slug)}`,initialData);
 if(!data)return <span className="waiting">{error?'Bölgesel seri şu anda alınamadı.':'Yayıma hazır doğrulanmış bölgesel endeks kaydı yok.'}</span>;
 if(data.value==null||!data.period)return <span className="waiting">Bölgesel seride güncel kayıt bulunamadı.</span>;
 const history=Array.isArray(data.history)?data.history:[],max=Math.max(...history.map(x=>Number(x.value)||0),1),coverage=data.region||region;
 return <><div className="city-live"><span>Endeks değeri</span><strong>{Number(data.value).toLocaleString('tr-TR',{maximumFractionDigits:2})}</strong><small>TCMB EVDS · {coverage} · {data.period.slice(0,7)}</small>{data.retrievedAt&&<small>Son başarılı aktarım: {sourceTime(data.retrievedAt)} (TSİ)</small>}{(error||data.status==='cached')&&<small role="status">Güncel kaynak doğrulanamadı. Son başarılı kayıt gösteriliyor.</small>}{data.annualChange!=null&&<b>Yıllık değişim %{Number(data.annualChange).toLocaleString('tr-TR',{maximumFractionDigits:2})}</b>}</div>{history.length>1&&<div className="mini-history" aria-label="Son 24 aylık konut fiyat endeksi"><div className="mini-bars">{history.map(item=><i key={item.period} title={`${item.period}: ${Number(item.value).toLocaleString('tr-TR')}`} style={{height:`${Math.max(8,Number(item.value)/max*100)}%`}}/>)}</div><small>{history[0].period}–{history.at(-1)?.period} endeks seyri</small></div>}<IndexReading value={Number(data.value)} annualChange={typeof data.annualChange==='number'?data.annualChange:null} period={data.period} region={coverage}/></>
}

export function CitySales({slug,initialData}:{slug:string,initialData?:CitySalesData|null}){
 const {data,error}=useCityData(`/api/city-sales?slug=${encodeURIComponent(slug)}`,initialData);
 if(!data)return <span className="waiting">{error?'Satış verisi şu anda alınamadı.':'Yayıma hazır doğrulanmış il satış kaydı yok.'}</span>;
 if(data.status!=='available')return <span className="waiting">Doğrulanmış il satış kaydı henüz bulunamadı.</span>;
 const n=(value:number)=>Number(value).toLocaleString('tr-TR'),rate=(value:number|null)=>value==null?'—':`${value>=0?'+':''}%${Number(value).toLocaleString('tr-TR',{maximumFractionDigits:1})}`,history=Array.isArray(data.history)?data.history:[],max=Math.max(...history.map(x=>Number(x.total)||0),1),mortgageRate=data.total>0?data.mortgaged/data.total*100:null;
 return <div className="city-sales-live"><div className="sales-total"><span>Aylık toplam satış</span><strong>{n(data.total)}</strong><small>TÜİK · {data.period} · satış adedi</small>{error&&<small role="status">Güncel kaynak doğrulanamadı. Son başarılı kayıt gösteriliyor.</small>}</div><dl><div><dt>İpotekli</dt><dd>{n(data.mortgaged)}</dd></div><div><dt>İpotekli oranı</dt><dd>{rate(mortgageRate)}</dd></div><div><dt>İlk el</dt><dd>{n(data.firstSale)}</dd></div><div><dt>İkinci el</dt><dd>{n(data.secondHand)}</dd></div><div><dt>Aylık değişim</dt><dd className={(data.monthlyChange??0)<0?'negative':''}>{rate(data.monthlyChange)}</dd></div><div><dt>Yıllık değişim</dt><dd className={(data.annualChange??0)<0?'negative':''}>{rate(data.annualChange)}</dd></div></dl>{history.length>1&&<div className="mini-history sales-bars" aria-label="Son 13 aylık konut satışları"><div className="mini-bars">{history.map(item=><i key={item.period} title={`${item.period}: ${n(item.total)}`} style={{height:`${Math.max(8,Number(item.total)/max*100)}%`}}/>)}</div><small>{history[0].period}–{history.at(-1)?.period} aylık satış seyri</small></div>}<small>Son çekim: {sourceTime(data.retrievedAt)} (TSİ)</small><SalesReading total={data.total} mortgaged={data.mortgaged} firstSale={data.firstSale} secondHand={data.secondHand} period={data.period}/></div>;
}


export function DistrictSalesRanking({city,cityName,initialData}:{city:string,cityName:string,initialData?:DistrictSalesData|null}){
 const {data,error}=useCityData(`/api/district-sales?city=${encodeURIComponent(city)}`,initialData);
 if((error&&!data)||data?.status==='error')return <p className="waiting">İlçe satış verisi şu anda sorgulanamadı.</p>;
 if(!['available','stale'].includes(data?.status??'')||!data?.items?.length)return <div className="district-data-note" role="status"><b>{cityName} için doğrulanmış ilçe satış listesi henüz mevcut değil.</b><p>TÜİK ilçe kırılımı alınamadığından ilçe sıralaması gösterilmiyor. Varsa yukarıdaki “Satış hareketi” bölümünden il toplamını inceleyebilirsiniz. Eksik ilçe kayıtları sıfır satış anlamına gelmez.</p></div>;
 return <div className="district-ranking">{error&&<p className="waiting" role="status">Güncel kaynak doğrulanamadı. Son başarılı ilçe kaydı gösteriliyor.</p>}{data.status==='stale'&&<p className="waiting" role="status">İlçe verisi {data.period}; il toplamının son dönemi {data.latestCityPeriod}. Güncel ilçe kırılımı henüz alınamadı; aşağıdaki liste geçmiş dönemdir.</p>}<ol>{data.items.map((x,index)=><li key={x.districtName}><span><b>{index+1}. {x.districtName}</b><small>{data.period}</small></span><strong>{Number(x.total).toLocaleString('tr-TR')} satış</strong></li>)}</ol><small>Kaynak: TÜİK Konut ve İş Yeri Satış İstatistikleri. Sıralama {data.period} döneminin ilçe satış adedine göredir. Son başarılı aktarım: {data.retrievedAt?sourceTime(data.retrievedAt):'—'} (TSİ).</small></div>;
}
