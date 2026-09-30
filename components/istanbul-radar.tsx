'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowUpRight,Star,X} from 'lucide-react';

type DistrictItem={districtName:string;total:number;period:string};
type DistrictResponse={status:string;period:string|null;items:DistrictItem[];source?:string;sourceUrl?:string};

const STORAGE_KEY='ks_istanbul_district_watch_v1';
const formatNumber=(value:number)=>Number(value).toLocaleString('tr-TR');

export function IstanbulRadar(){
 const[data,setData]=useState<DistrictResponse|null>(null);
 const[error,setError]=useState(false);
 const[first,setFirst]=useState('');
 const[second,setSecond]=useState('');
 const[watched,setWatched]=useState<string[]>([]);

 useEffect(()=>{
  const controller=new AbortController();
  fetch('/api/district-sales?city=istanbul',{signal:controller.signal})
   .then(async response=>{if(!response.ok)throw new Error('HTTP');return response.json()})
   .then((result:DistrictResponse)=>{
    if(result.status!=='available'||!Array.isArray(result.items)||!result.items.length){setData(result);return}
    setData(result);
    setFirst(result.items[0]?.districtName||'');
    setSecond(result.items[1]?.districtName||result.items[0]?.districtName||'');
   })
   .catch(()=>{if(!controller.signal.aborted)setError(true)});
  try{
   const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
   if(Array.isArray(saved))setWatched([...new Set(saved.filter((item):item is string=>typeof item==='string'))].slice(0,3));
  }catch{}
  return()=>controller.abort();
 },[]);

 const items=data?.items||[];
 const selected=useMemo(()=>[items.find(item=>item.districtName===first),items.find(item=>item.districtName===second)].filter((item):item is DistrictItem=>Boolean(item)).filter((item,index,all)=>all.findIndex(candidate=>candidate.districtName===item.districtName)===index),[items,first,second]);
 const max=Math.max(1,...items.map(item=>Number(item.total)||0));
 const toggleWatch=(name:string)=>{
  const next=watched.includes(name)?watched.filter(item=>item!==name):watched.length<3?[...watched,name]:watched;
  setWatched(next);
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next))}catch{}
 };

 return <aside className="istanbul-radar" aria-label="İstanbul ilçe konut satış karşılaştırması">
  <div className="radar-heading"><div><p className="eyebrow">İSTANBUL RADARI</p><h2>İlçeleri satış verisiyle karşılaştırın</h2></div>{data?.period&&<span className="radar-period">{data.period}</span>}</div>
  <p className="radar-intro">İki ilçenin son yayımlanan aylık konut satış adetlerini yan yana görün; ilgilendiklerinizi bu tarayıcıda takip edin.</p>
  {error?<div className="radar-empty">İlçe satış verisi şu anda alınamıyor. Daha sonra yeniden deneyin.</div>
   :!data?<span className="radar-loading">TÜİK’in son ilçe verisi yükleniyor…</span>
   :!items.length?<div className="radar-empty">İstanbul için doğrulanmış ilçe satış kaydı bulunamadı. Tahmini değer gösterilmiyor.</div>
   :<>
    <div className="radar-selects">
     <label>1. ilçe<select value={first} onChange={event=>setFirst(event.target.value)} aria-label="Karşılaştırılacak birinci ilçe">{items.map(item=><option key={item.districtName} value={item.districtName} disabled={item.districtName===second&&item.districtName!==first}>{item.districtName}</option>)}</select></label>
     <label>2. ilçe<select value={second} onChange={event=>setSecond(event.target.value)} aria-label="Karşılaştırılacak ikinci ilçe">{items.map(item=><option key={item.districtName} value={item.districtName} disabled={item.districtName===first&&item.districtName!==second}>{item.districtName}</option>)}</select></label>
    </div>
    <div className="radar-compare" aria-live="polite">{selected.map((item,index)=>{
     const isWatched=watched.includes(item.districtName);
     return <div className="radar-compare-item" key={item.districtName}>
      <span className="radar-district">{item.districtName}</span>
      <div className="radar-bar-track" aria-hidden="true"><div className="radar-bar" style={{width:`${Math.max(4,(Number(item.total)||0)/max*100)}%`}}/></div>
      <strong className="radar-total">{formatNumber(item.total)}</strong>
      <button type="button" className="radar-follow-small" onClick={()=>toggleWatch(item.districtName)} aria-label={isWatched?`${item.districtName} takip listesinden çıkar`:`${item.districtName} ilçesini takip et`} title={isWatched?'Takip listesinden çıkar':'Takip listesine ekle'}><Star size={13} fill={isWatched?'currentColor':'none'}/><span>{isWatched?'Takipte':'Takip et'}</span></button>
      <small>{index+1}. seçim · son yayımlanan dönemde konut satışı</small>
     </div>
    })}</div>
    <div className="radar-follow-row"><span>Takip listen · bu tarayıcıda {watched.length}/3</span><span>Veri değişince kontrol edin</span></div>
    {watched.length>0?<div className="radar-watchlist" aria-label="Takip ettiğiniz ilçeler">{watched.map(name=><button key={name} type="button" onClick={()=>toggleWatch(name)} title={`${name} takip listesinden çıkar`}>{name}<X size={12}/></button>)}</div>:<span className="radar-watch-empty">Yıldız simgesiyle en fazla 3 ilçeyi kaydedin.</span>}
    <div className="radar-source"><span>Adet karşılaştırması · fiyat/endeks değildir</span><a href={data.sourceUrl||'https://veriportali.tuik.gov.tr/'} target="_blank" rel="noreferrer">Kaynak: TÜİK <ArrowUpRight size={12}/></a></div>
   </>}
 </aside>;
}
