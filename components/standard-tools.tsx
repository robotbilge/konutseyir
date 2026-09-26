import {useEffect,useState} from 'react';
import {money} from './calculator';

const pct=(n:number)=>`%${n.toLocaleString('tr-TR',{maximumFractionDigits:2})}`;
function N({label,value,onChange,hint}:{label:string,value:number,onChange:(v:number)=>void,hint?:string}){return <label className="calc-field"><span>{label}</span><input type="number" step="any" value={value} onChange={e=>onChange(Number(e.target.value))}/>{hint&&<small>{hint}</small>}</label>}
function Box({children}:{children:React.ReactNode}){return <section className="focused-calculator"><div className="focused-form">{children}</div></section>}

export function DeedFeeCalculator(){
 const[p,s]=useState({price:5000000,revolving:0}); const buyer=p.price*.02+p.revolving,seller=p.price*.02;
 return <Box><h2>Tapu harcı ve döner sermaye</h2><div className="fields"><N label="Beyan edilen satış bedeli (TL)" value={p.price} onChange={v=>s({...p,price:v})}/><N label="Döner sermaye bedeli (TL)" value={p.revolving} onChange={v=>s({...p,revolving:v})} hint="Tarifeye ve işleme göre değişebildiği için güncel tahakkuk tutarını girin."/></div><div className="metric-row"><p>Alıcı tapu harcı (%2) <b>{money(p.price*.02)}</b></p><p>Satıcı tapu harcı (%2) <b>{money(seller)}</b></p><p>Alıcı toplamı <b>{money(buyer)}</b></p><p>İşlem toplamı <b>{money(buyer+seller)}</b></p></div><small>Satış bedeli emlak vergisi değerinden düşük olamaz. Döner sermaye tutarı sabit yüzde değildir.</small></Box>
}
export function CommissionCalculator(){
 const[p,s]=useState({price:5000000,vat:20}); const side=p.price*.02,vat=side*p.vat/100,total=side+vat;
 return <Box><h2>Emlak danışmanı hizmet bedeli</h2><div className="fields"><N label="Satış bedeli (TL)" value={p.price} onChange={v=>s({...p,price:v})}/><N label="KDV (%)" value={p.vat} onChange={v=>s({...p,vat:v})}/></div><div className="metric-row"><p>Bir taraf için tavan (%2) <b>{money(side)}</b></p><p>KDV <b>{money(vat)}</b></p><p>Bir taraf KDV dahil <b>{money(total)}</b></p><p>İki taraf toplam tavan <b>{money(total*2)}</b></p></div><small>Satış aracılık hizmet bedeli KDV hariç satış bedelinin %4'ünü aşamaz; aksi kararlaştırılmadıkça taraflar arasında eşit paylaşılır.</small></Box>
}
export function RentIncreaseCalculator(){
 const[p,s]=useState({rent:30000,rate:39.62}); const next=p.rent*(1+p.rate/100);
 return <Box><h2>Kira artış oranı hesaplama</h2><div className="fields"><N label="Mevcut aylık kira (TL)" value={p.rent} onChange={v=>s({...p,rent:v})}/><N label="TÜFE 12 aylık ortalama (%)" value={p.rate} onChange={v=>s({...p,rate:v})} hint="Sözleşmenin yenilendiği aya ilişkin resmî TÜİK oranını girin."/></div><div className="metric-row"><p>Azami artış tutarı <b>{money(next-p.rent)}</b></p><p>Artış sonrası kira <b>{money(next)}</b></p></div><small>Konut kiralarında genel kural TBK m.344 çerçevesindeki on iki aylık TÜFE ortalamasıdır. Sözleşmeye ve özel duruma göre hukuki değerlendirme gerekebilir.</small></Box>
}
export function GoldPropertyCalculator(){
 const[p,s]=useState({price:5000000,gram:0}); const[auto,setAuto]=useState<number|null>(null);
 useEffect(()=>{fetch('https://altinseyir.com/api/prices').then(r=>r.json()).then(j=>{const g=Number(j?.price?.gram);if(g>0){setAuto(g);s(x=>({...x,gram:g}))}}).catch(()=>{})},[]);
 const grams=p.gram>0?p.price/p.gram:0;
 return <Box><h2>Altın bazlı konut değeri</h2><div className="fields"><N label="Konut değeri (TL)" value={p.price} onChange={v=>s({...p,price:v})}/><N label="Gram altın referans fiyatı (TL)" value={p.gram} onChange={v=>s({...p,gram:v})} hint={auto?'AltınSeyir referans verisi otomatik alındı.':'AltınSeyir verisi alınamazsa güncel gram fiyatını girin.'}/></div><div className="metric-row"><p>Konutun altın karşılığı <b>{grams.toLocaleString('tr-TR',{maximumFractionDigits:1})} gram</b></p><p>Kilogram karşılığı <b>{(grams/1000).toLocaleString('tr-TR',{maximumFractionDigits:3})} kg</b></p></div><p><a href="https://altinseyir.com/" target="_blank" rel="noreferrer">Altın fiyatını ve geçmiş seyrini AltınSeyir'de incele →</a></p><small>AltınSeyir referans gram fiyatı piyasa göstergesidir; kuyumcu alış/satış fiyatı değildir.</small></Box>
}
export function ShareCalculator(){
 const[p,s]=useState({area:120,value:6000000,num:1,den:4}); const ratio=p.den>0?p.num/p.den:0;
 return <Box><h2>Hisseli tapu payı</h2><div className="fields"><N label="Toplam alan (m²)" value={p.area} onChange={v=>s({...p,area:v})}/><N label="Taşınmaz değeri (TL)" value={p.value} onChange={v=>s({...p,value:v})}/><N label="Pay" value={p.num} onChange={v=>s({...p,num:v})}/><N label="Payda" value={p.den} onChange={v=>s({...p,den:v})}/></div><div className="metric-row"><p>Pay oranı <b>{pct(ratio*100)}</b></p><p>Matematiksel alan karşılığı <b>{(p.area*ratio).toLocaleString('tr-TR',{maximumFractionDigits:2})} m²</b></p><p>Değer karşılığı <b>{money(p.value*ratio)}</b></p></div><small>Hisseli tapuda bu m² hesabı belirli bir fiziksel bölümün mülkiyetini göstermez. Miras payları için veraset ilamındaki oranları kullanın.</small></Box>
}