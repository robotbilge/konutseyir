'use client';
import {useEffect,useMemo,useState} from 'react';
import {cities} from '../lib/content';

type Observation={period:string;value:number};
type CityData={value:number|null;period:string|null;history:Observation[];status:string;source:string};
type TrendSeries={slug:string;name:string;color:string;values:{period:string;value:number}[]};
type CityComparisonResult={series:TrendSeries[];points:string[];low:number;high:number;x:(i:number)=>number;y:(v:number)=>number;line:(values:{period:string;value:number}[])=>string;base:string;latest:string}|{error:string}|null;
const colors=['#17684e','#b26719','#3e64a3'];
const monthNumber=(period:string)=>{const m=period.match(/^(\d{4})-(\d{2})/);return m?Number(m[1])*12+Number(m[2])-1:NaN};
const moneyIndex=(n:number)=>n.toLocaleString('tr-TR',{maximumFractionDigits:2});
function shiftMonth(period:string,delta:number){const n=monthNumber(period)+delta;return `${Math.floor(n/12)}-${String(n%12+1).padStart(2,'0')}-01`}

export function CityComparison(){
 const [selected,setSelected]=useState(['istanbul','ankara','izmir']);
 const [years,setYears]=useState(1);
 const [data,setData]=useState<Record<string,CityData>>({});
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState('');
 const selectionKey=selected.join(',');
 useEffect(()=>{
  const controller=new AbortController();setLoading(true);setError('');
  Promise.all(selected.map(async slug=>{
   const response=await fetch(`/api/city-market?slug=${encodeURIComponent(slug)}`,{signal:controller.signal});
   if(!response.ok)throw new Error('Şehir verisi şu anda alınamıyor.');
   const item=await response.json();
   return [slug,item as CityData] as const;
  })).then(rows=>setData(Object.fromEntries(rows))).catch(e=>{if(e.name!=='AbortError')setError(e.message||'Şehir verisi şu anda alınamıyor.')}).finally(()=>{if(!controller.signal.aborted)setLoading(false)});
  return()=>controller.abort();
 },[selectionKey]);

 const comparison=useMemo<CityComparisonResult>(()=>{
  if(selected.length<2||selected.some(slug=>!data[slug]))return null;
  const sets=selected.map(slug=>new Map((data[slug].history||[]).filter(x=>Number.isFinite(Number(x.value))&&Number(x.value)>0).map(x=>[x.period,Number(x.value)])));
  const shared=[...sets[0].keys()].filter(period=>sets.every(set=>set.has(period))).sort();
  const latest=shared.at(-1);if(!latest)return {error:'Seçilen şehirlerin aynı dönem verisi bulunmuyor.'};
  const target=shiftMonth(latest,-years*12);
  const base=[...shared].filter(period=>period<=target).at(-1);
  if(!base)return {error:`Seçilen şehirlerde tam ${years} yıllık ortak geçmiş veri bulunmuyor. Daha kısa bir dönem seçin.`};
  const points=shared.filter(period=>period>=base&&period<=latest);
  const required=years*12;
  const fullMonths=monthNumber(latest)-monthNumber(base);
  const gapFree=points.every((period,index)=>index===0||monthNumber(period)-monthNumber(points[index-1])===1);
  if(fullMonths<required||!gapFree)return {error:`Son ${years} yıl için ortak ve kesintisiz aylık veri bulunmadığından grafik çizilmedi.`};
  const series=selected.map((slug,index)=>({slug,name:cities.find(c=>c.slug===slug)?.name||slug,color:colors[index],values:points.map(period=>({period,value:100*(sets[selected.indexOf(slug)].get(period)!/sets[selected.indexOf(slug)].get(base)!)}))}));
  const all=series.flatMap(s=>s.values.map(x=>x.value)),min=Math.min(...all,100),max=Math.max(...all,100),pad=Math.max((max-min)*.12,2);
  const low=Math.floor((min-pad)/5)*5,high=Math.ceil((max+pad)/5)*5;
  const x=(i:number)=>45+i*810/Math.max(points.length-1,1),y=(v:number)=>20+(high-v)*250/(high-low||1);
  const line=(values:{period:string;value:number}[])=>values.map((point,i)=>`${i?'L':'M'} ${x(i).toFixed(1)} ${y(point.value).toFixed(1)}`).join(' ');
  return {series,points,low,high,x,y,line,base,latest};
 },[selected,years,data]);

 const toggle=(slug:string)=>{
  setSelected(current=>current.includes(slug)?(current.length>2?current.filter(x=>x!==slug):current):current.length<3?[...current,slug]:current);
 };
 return <section className="city-comparison" aria-labelledby="city-comparison-title">
  <div className="city-comparison-heading"><div><p className="eyebrow">AYNI DÖNEMDE ŞEHİR KIYASI</p><h2 id="city-comparison-title">Konut fiyat eğilimini şehirler arasında karşılaştırın</h2><p>TCMB bölgesel konut fiyat endekslerini aynı başlangıç değerine getirerek karşılaştırın. Endeks değişimini gösterir; şehirlerdeki mutlak konut fiyatlarını karşılaştırmaz.</p></div><label className="city-range">Dönem<select value={years} onChange={e=>setYears(Number(e.target.value))}><option value={1}>1 yıl</option><option value={3}>3 yıl</option><option value={5}>5 yıl</option></select></label></div>
  <fieldset className="city-picker"><legend>Karşılaştırılacak şehirler (en fazla 3)</legend>{cities.map(city=><label key={city.slug}><input type="checkbox" checked={selected.includes(city.slug)} disabled={!selected.includes(city.slug)&&selected.length>=3} onChange={()=>toggle(city.slug)}/><span>{city.name}</span></label>)}</fieldset>
  {loading&&<p className="city-chart-status" role="status">Seçilen şehirlerin TCMB verileri alınıyor…</p>}
  {error&&<p className="city-chart-status" role="alert">{error}</p>}
  {!loading&&!error&&comparison&&'error'in comparison&&<p className="city-chart-status" role="status">{comparison.error}</p>}
  {!loading&&!error&&comparison&&'series'in comparison&&<><div className="city-chart-wrap"><svg className="city-chart" viewBox="0 0 900 310" role="img" aria-label={`${years} yıllık normalize edilmiş TCMB konut fiyat endeksi karşılaştırması`}><title>{years} yıllık bölgesel konut fiyat endeksi</title><desc>Her şehir başlangıç ayında 100 kabul edilmiştir. Çizgiler şehirlerdeki endeks değişimini gösterir.</desc>{[0,1,2,3,4].map(i=>{const value=comparison.high-(comparison.high-comparison.low)*i/4;return <g key={i}><line x1="45" x2="855" y1={comparison.y(value)} y2={comparison.y(value)} stroke="#e3e9e5" strokeDasharray="4 5"/><text x="38" y={comparison.y(value)+4} textAnchor="end">{moneyIndex(value)}</text></g>})}{comparison.series.map(s=><path key={s.slug} d={comparison.line(s.values)} fill="none" stroke={s.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>)}<text x="45" y="296">{comparison.base}</text><text x="855" y="296" textAnchor="end">{comparison.latest}</text></svg></div><div className="city-chart-legend">{comparison.series.map(s=><div key={s.slug}><span style={{background:s.color}}/><b>{s.name}</b><strong>{s.values.at(-1)?moneyIndex(s.values.at(-1)!.value-100):'—'}%</strong><small>${s.values.at(-1)!.value>=100?'artış':'değişim'}</small></div>)}</div><p className="city-chart-source">Kaynak: TCMB EVDS · {comparison.base}–{comparison.latest}. Başlangıç endeksi 100’dür. Veriler bölge düzeyindedir; ilçe veya konut bazında değerleme değildir.</p></>}
 </section>
}
