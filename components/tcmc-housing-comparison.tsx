'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowUpRight,Info} from 'lucide-react';
import {CartesianGrid,Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts';

type Observation={period:string;value:number};
type Point={period:string;istanbul:number;turkey:number};
type CityResponse={history:Observation[];annualChange:number|null;period:string|null;status:string;sourceUrl?:string};
const month=(value:string)=>new Intl.DateTimeFormat('tr-TR',{month:'short',year:'2-digit',timeZone:'UTC'}).format(new Date(value));
const compact=(value:number)=>new Intl.NumberFormat('tr-TR',{maximumFractionDigits:1}).format(value);

export function TcmcHousingComparison(){
 const[data,setData]=useState<Point[]>([]);
 const[period,setPeriod]=useState<string|null>(null);
 const[loading,setLoading]=useState(true);
 const[failed,setFailed]=useState(false);
 useEffect(()=>{const controller=new AbortController();Promise.all([
  fetch('/api/history?series=housing',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(result=>result.observations||[] as Observation[]),
  fetch('/api/city-market?slug=istanbul',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then((result:CityResponse)=>result)
 ]).then(([turkeyRows,istanbulResult])=>{
  const turkeyMap=new Map<string,number>((turkeyRows as Observation[]).map(row=>[row.period,row.value]));
  const points=(istanbulResult.history||[]).flatMap(row=>{const value=turkeyMap.get(row.period);return Number.isFinite(value)&&value>0&&row.value>0?[{period:row.period,istanbul:row.value,turkey:value}]:[]});
  if(!points.length)throw new Error('Ortak endeks dönemi bulunamadı');
  setData(points.slice(-24));setPeriod(points.at(-1)?.period||null);
 }).catch(()=>{if(!controller.signal.aborted)setFailed(true)}).finally(()=>{if(!controller.signal.aborted)setLoading(false)});return()=>controller.abort()},[]);
 const chartData=useMemo(()=>{const base=data[0];return base?data.map(point=>({...point,istanbulRebased:point.istanbul/base.istanbul*100,turkeyRebased:point.turkey/base.turkey*100})):[]},[data]);
 const latest=chartData.at(-1);
 const change=latest?latest.istanbulRebased-latest.turkeyRebased:null;
 const formatter=(value:number)=>compact(value);
 return <aside className="tcmc-price-card" aria-label="TCMB İstanbul ve Türkiye konut fiyat endeksi karşılaştırması">
  <div className="tcmc-price-heading"><div><p className="eyebrow">TCMB KONUT FİYAT ENDEKSİ</p><h2>İstanbul ve Türkiye’de fiyat değişimi</h2></div><span className="tcmc-period-badge">{period?month(period):'Aylık'}</span></div>
  <p className="tcmc-price-intro">İki seriyi ortak başlangıç ayında 100’e eşitleyerek fiyat hareketini karşılaştırın.</p>
  {failed?<div className="tcmc-empty">TCMB endeks verisi şu anda yüklenemedi. Bir süre sonra yeniden deneyin.</div>:loading?<div className="tcmc-loading">TCMB’nin son yayımlanan endeksleri yükleniyor…</div>:<>
   <div className="tcmc-stat-row"><div><span>İstanbul endeksi</span><strong>{latest?formatter(latest.istanbulRebased):'—'}</strong></div><div><span>Türkiye endeksi</span><strong>{latest?formatter(latest.turkeyRebased):'—'}</strong></div><div className="tcmc-difference"><span>Göreli fark</span><strong>{change===null?'—':`${change>0?'+':''}${compact(change)} puan`}</strong></div></div>
   <div className="tcmc-chart" role="img" aria-label="Ortak başlangıç ayı 100 kabul edilen İstanbul ve Türkiye konut fiyat endeksi çizgi grafiği"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{top:8,right:5,left:0,bottom:0}}><CartesianGrid stroke="rgba(255,255,255,.11)" vertical={false}/><XAxis dataKey="period" tickFormatter={month} tick={{fill:'#aebdb5',fontSize:9}} tickLine={false} axisLine={false} minTickGap={28}/><YAxis tickFormatter={formatter} tick={{fill:'#aebdb5',fontSize:9}} tickLine={false} axisLine={false} width={38}/><Tooltip labelFormatter={label=>month(String(label))} formatter={(value)=>[formatter(Number(value))+' puan']} contentStyle={{background:'#18372d',border:'1px solid rgba(255,255,255,.15)',borderRadius:10,color:'#fff'}}/><Line type="monotone" dataKey="istanbulRebased" name="İstanbul" stroke="#dff36d" strokeWidth={2.5} dot={false} activeDot={{r:4}}/><Line type="monotone" dataKey="turkeyRebased" name="Türkiye" stroke="#7bc8a8" strokeWidth={2.5} dot={false} activeDot={{r:4}}/></LineChart></ResponsiveContainer></div>
   <div className="tcmc-legend"><span><i className="istanbul"/>İstanbul</span><span><i className="turkey"/>Türkiye</span><span>Başlangıç: {data[0]?month(data[0].period):'—'} = 100</span></div>
   <div className="tcmc-caveat"><Info size={15}/><p>Bu, TCMB’nin fiyat endeksidir; TL/m² fiyatı ya da mahalle tahmini değildir. Endeks nominaldir; enflasyondan arındırılmış reel değişimi göstermez.</p></div>
  </>}
  <div className="tcmc-price-source"><a href="https://evds2.tcmb.gov.tr/" target="_blank" rel="noreferrer">Kaynak: TCMB EVDS <ArrowUpRight size={12}/></a><a href="/veri">Veri dönemlerini ve kaynakları gör <ArrowUpRight size={12}/></a></div>
 </aside>;
}
