import {IndexReading,SalesReading} from './market-reading';
import {ceilToHundredth} from '../lib/standard-math.mjs';
import {marketChart} from '../lib/market-chart.mjs';
import marketSnapshot from '../lib/market-snapshot.json';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Landmark,Newspaper,Percent} from 'lucide-react';

export type MarketItem={series:string,value:number|null,period:string|null,status:string,annualChange:number|null,twelveMonthAverage:number|null,twelveMonthAveragePeriod:string|null,retrievedAt:string|null};
const initialMarketData=marketSnapshot.data as MarketItem[];
export function useMarketData(){
 const[data,setData]=useState<MarketItem[]>(initialMarketData);
 useEffect(()=>{const controller=new AbortController();fetch('/api/market-data',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(j=>Array.isArray(j.data)&&setData(j.data)).catch(()=>{});return()=>controller.abort()},[]);
 return data;
}
const pct=(value:number|null)=>value==null?'—':`%${value.toLocaleString('tr-TR',{maximumFractionDigits:2})}`;
export function MarketSnapshot(){
 const data=useMarketData(),policy=data.find(x=>x.series==='policy'),cpi=data.find(x=>x.series==='cpi');
 const average=cpi?.twelveMonthAverage??null;
 const cards=[
  {icon:Percent,label:'TCMB politika faizi',value:pct(policy?.value??null),detail:policy?.period,policy:true},
  {icon:Landmark,label:'TÜFE yıllık değişim',value:pct(cpi?.annualChange??null),detail:cpi?.period,policy:false},
  {icon:Landmark,label:'TÜFE 12 aylık ortalama (%)',value:average===null?'—':`%${ceilToHundredth(average).toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})}`,detail:average===null?null:cpi?.twelveMonthAveragePeriod??cpi?.period,policy:false}
 ];
 const cpiPeriod=(period?:string|null)=>period&&Number.isFinite(Date.parse(period+'T00:00:00Z'))?new Intl.DateTimeFormat('tr-TR',{month:'long',year:'numeric',timeZone:'Europe/Istanbul'}).format(new Date(period+'T00:00:00Z')):'Son doğrulanmış dönem';
 const verifiedTime=(value?:string|null)=>value?new Date(value).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'}):'Tarih kaydı yok';
 return <section className="market-snapshot" aria-label="Güncel piyasa göstergeleri"><div><p className="eyebrow">RESMÎ VERİLER</p><h2>Faiz ve enflasyon verileri</h2><a href="/veri">Kaynak ve çekim saatleri →</a></div>{cards.map(({icon:Icon,...item})=><article key={item.label}><Icon/><span>{item.label}</span><strong>{item.value}</strong><small>{item.policy?'Yürürlük tarihi':'Dönem'}: {item.policy?(item.detail||'Son doğrulanmış dönem'):cpiPeriod(item.detail)}</small>{!item.policy&&<><small>Aylık yayımlanır · TÜİK / TCMB EVDS</small><small>Son doğrulama: {verifiedTime(cpi?.retrievedAt)} (TSİ)</small></>}{item.policy&&<><small>Son doğrulama: {verifiedTime(policy?.retrievedAt)} (TSİ)</small></>}</article>)}</section>
}

function newsImageFor(_item:any,index:number){
 return ['/images/articles/housing-market.jpg','/images/articles/housing-budget.jpg','/images/articles/home-documents.jpg'][index%3];
}
export function LatestNews(){
 const[items,setItems]=useState<any[]>([]);
 useEffect(()=>{const controller=new AbortController();fetch('/api/news?limit=3',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(j=>setItems(j.items||[])).catch(()=>{});return()=>controller.abort()},[]);
 if(!items.length)return null;
 return <section className="latest-news"><header><div><p className="eyebrow">KONUT GÜNDEMİ</p><h2>Piyasayı etkileyen son gelişmeler</h2></div><a href="/haberler">Tüm haberler <ArrowUpRight/></a></header><div>{items.map((item,index)=><article key={item.slug}><img className="news-card-image" src={newsImageFor(item,index)} alt="" width="1200" height="720" loading="lazy" decoding="async"/><div className="news-card-source"><Newspaper/><span>{item.sourceName}</span></div><h3><a href={`/haberler/haber?slug=${encodeURIComponent(item.slug)}`}>{item.title}</a></h3><small>{new Intl.DateTimeFormat('tr-TR',{dateStyle:'medium',timeZone:'Europe/Istanbul'}).format(new Date(item.publishedAt))}</small></article>)}</div></section>
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

const monthLabel=(period:string,short=false)=>new Intl.DateTimeFormat('tr-TR',{month:short?'short':'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${period}-01T00:00:00Z`));
const signedRate=(value:number|null)=>value===null?'Hesaplanamadı':`${value>=0?'+':''}${value.toLocaleString('tr-TR',{maximumFractionDigits:2})}%`;

function CityMarketChart({history}:{history:{period:string;value:number}[]}){
 const chart=marketChart(history),[selectedPeriod,setSelectedPeriod]=useState<string|null>(null),selected=chart.items.find((item:{period:string})=>item.period===selectedPeriod)??chart.latest;
 if(!selected||!chart.baseline||!chart.latest||chart.min===null||chart.max===null)return null;
 const baseline=chart.baseline,latest=chart.latest,min=chart.min,max=chart.max,range=Math.max(max-min,1),height=(value:number)=>`${16+(value-min)/range*84}%`,tickIndexes=new Set(chart.items.map((_:unknown,index:number)=>index).filter((index:number)=>index===0||index===chart.items.length-1||index%3===0));
 return <figure className="market-chart" aria-labelledby="market-chart-title">
  <figcaption><div><b id="market-chart-title">2024’ten bugüne nominal endeks değişimi</b><span>{monthLabel(baseline.period)} ilk mevcut 2024 dönemidir.</span></div><strong>{signedRate(latest.sinceBaseline)}</strong></figcaption>
  <div className="market-chart-detail" aria-live="polite"><b>{monthLabel(selected.period)}</b><dl><div><dt>TCMB endeks puanı (2023=100)</dt><dd>{selected.value.toLocaleString('tr-TR',{maximumFractionDigits:2})}</dd></div><div><dt>Önceki aya göre</dt><dd>{signedRate(selected.monthlyChange)}</dd></div><div><dt>Yıllık nominal değişim</dt><dd>{signedRate(selected.annualChange)}</dd></div><div><dt>İlk mevcut 2024 ayına göre</dt><dd>{signedRate(selected.sinceBaseline)}</dd></div></dl></div>
  <p className="market-chart-explainer"><b>{selected.value.toLocaleString('tr-TR',{maximumFractionDigits:2})} puan ne demek?</b> 2023 baz dönemi 100 kabul edildiğinde endeks düzeyinin {Math.abs(selected.value/100).toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})} katına çıktığını; bunun baz döneme göre {signedRate(selected.value-100)} değişime karşılık geldiğini gösterir. Bu değer TL veya TL/m² değildir. Üstteki {signedRate(selected.sinceBaseline)} ise {monthLabel(baseline.period)} ile {monthLabel(selected.period)} arasındaki bölgesel nominal endeks değişimidir; tek bir evin aynı oranda değerlendiği anlamına gelmez.</p>
  <div className="market-chart-scroll" tabIndex={0} aria-label="Aylık endeks grafiği; ayrıntı için sütunları seçin">
   <div className="market-chart-plot">
    <div className="market-chart-scale" aria-hidden="true"><span>{max.toLocaleString('tr-TR',{maximumFractionDigits:1})}</span><span>{((max+min)/2).toLocaleString('tr-TR',{maximumFractionDigits:1})}</span><span>{min.toLocaleString('tr-TR',{maximumFractionDigits:1})}</span></div>
    <div className="market-chart-bars" style={{gridTemplateColumns:`repeat(${chart.items.length},minmax(16px,1fr))`}}>{chart.items.map((item:{period:string;value:number;monthlyChange:number|null;annualChange:number|null;sinceBaseline:number|null})=><button key={item.period} type="button" className={item.period===selected.period?'selected':''} style={{height:height(item.value)}} onMouseEnter={()=>setSelectedPeriod(item.period)} onFocus={()=>setSelectedPeriod(item.period)} onClick={()=>setSelectedPeriod(item.period)} aria-label={`${monthLabel(item.period)}; TCMB endeks puanı ${item.value.toLocaleString('tr-TR')}; aylık ${signedRate(item.monthlyChange)}; yıllık nominal ${signedRate(item.annualChange)}; ilk mevcut 2024 ayına göre ${signedRate(item.sinceBaseline)}`}><span>{item.value.toLocaleString('tr-TR',{maximumFractionDigits:1})}</span></button>)}</div>
    <div className="market-chart-axis" style={{gridTemplateColumns:`repeat(${chart.items.length},minmax(16px,1fr))`}}>{chart.items.map((item:{period:string},index:number)=>tickIndexes.has(index)?<span key={item.period} style={{gridColumn:index+1}}>{monthLabel(item.period,true)}</span>:null)}</div>
   </div>
  </div>
  <small>Dikey ölçek sıfırdan başlamaz; endeks düzeyindeki aylık hareketi görünür kılmak için en düşük ve en yüksek gözleme göre ölçeklenir. KFE bölgesel fiyat hareketini izler; mutlak konut fiyatı değildir.</small>
 </figure>;
}

export function CityMarket({slug,region,initialData}:{slug:string,region:string,initialData?:CityMarketData|null}){
 const {data,error}=useCityData(`/api/city-market?slug=${encodeURIComponent(slug)}`,initialData);
 if(!data)return <span className="waiting">{error?'Bölgesel seri şu anda alınamadı.':'Yayıma hazır doğrulanmış bölgesel endeks kaydı yok.'}</span>;
 if(data.value==null||!data.period)return <span className="waiting">Bölgesel seride güncel kayıt bulunamadı.</span>;
 const history=Array.isArray(data.history)?data.history:[],coverage=data.region||region;
 return <><div className="city-live"><span>TCMB endeks puanı (2023=100)</span><strong>{Number(data.value).toLocaleString('tr-TR',{maximumFractionDigits:2})}</strong><small>TL veya TL/m² değildir · TCMB EVDS · {coverage} · {data.period.slice(0,7)}</small>{data.retrievedAt&&<small>Son başarılı aktarım: {sourceTime(data.retrievedAt)} (TSİ)</small>}{(error||data.status==='cached')&&<small role="status">Güncel kaynak doğrulanamadı. Son başarılı kayıt gösteriliyor.</small>}{data.annualChange!=null&&<b>Yıllık nominal değişim {signedRate(Number(data.annualChange))}</b>}</div>{history.length>1&&<CityMarketChart history={history}/>}<IndexReading value={Number(data.value)} annualChange={typeof data.annualChange==='number'?data.annualChange:null} period={data.period} region={coverage}/></>
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
 return <div className="district-ranking">{error&&<p className="waiting" role="status">Güncel kaynak doğrulanamadı. Son doğrulanmış ilçe kaydı gösteriliyor.</p>}{data.status==='stale'&&<p className="waiting" role="status"><b>Bu güncel bir sıralama değildir.</b> Son doğrulanmış ilçe dönemi {data.period}; il toplamının son dönemi {data.latestCityPeriod}. TÜİK'in mevcut genel konut satışı akışı il düzeyinde olduğundan daha yeni ilçe toplamı yayımlanmış veri akışından alınamıyor.</p>}<ol>{data.items.map((x,index)=><li key={x.districtName}><span><b>{index+1}. {x.districtName}</b><small>{data.period}</small></span><strong>{Number(x.total).toLocaleString('tr-TR')} satış</strong></li>)}</ol><small>Kaynak: TÜİK Konut ve İş Yeri Satış İstatistikleri. Bu liste yalnız {data.period} döneminin ilçe satış adedine göredir; sonraki aylar için tahmin değildir. Son başarılı aktarım: {data.retrievedAt?sourceTime(data.retrievedAt):'—'} (TSİ).</small></div>;
}
