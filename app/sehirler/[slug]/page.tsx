import {notFound} from 'next/navigation';
import {Header,Footer} from '@/components/site-chrome';
import {CityMarket} from '@/components/live-data';
import {cities} from '@/lib/content';
import {Building,ChartNoAxesCombined,Info} from 'lucide-react';

export function generateStaticParams(){return cities.map(c=>({slug:c.slug}))}

export default async function City({params}:{params:Promise<{slug:string}>}){
 const{slug}=await params,c=cities.find(x=>x.slug===slug);
 if(!c)notFound();
 return <><Header/><main className="inner city-page">
  <div className="page-title"><p className="eyebrow">ŞEHİR PİYASASI</p><h1>{c.name} konut piyasası</h1><p>{c.note}</p></div>
  <div className="city-dashboard">
   <section><ChartNoAxesCombined/><h2>Fiyat eğilimi</h2><b>{c.region}</b><p>TCMB Konut Fiyat Endeksi bu bölge düzeyinde izlenir. İlçe veya tek konut değeri değildir.</p><CityMarket slug={c.slug} region={c.region}/><a href="https://evds3.tcmb.gov.tr/" target="_blank" rel="noreferrer">TCMB EVDS kaynağı →</a></section>
   <section><Building/><h2>Satış hareketi</h2><b>{c.name} ili</b><p>TÜİK aylık konut satışları; toplam, ipotekli, ilk el ve ikinci el kırılımlarıyla yayımlanır.</p><a href="https://veriportali.tuik.gov.tr/tr/databrowser/tuik/categories/9/9_4/TR,DF_SATIS_SEKLI_DURUMU_ILILCE_V3,1.0" target="_blank" rel="noreferrer">Resmî il satış tablosu →</a><span className="waiting">Resmî SDMX veri akışı bulundu. Otomatik aktarım için TÜİK API anahtarı bekleniyor.</span></section>
  </div>
  <aside className="data-warning"><Info/><div><b>Veri sınırı</b><p>Resmî kaynaklarda düzenli ilçe fiyat serisi bulunmadığı için {c.name} ilçelerine tahmini fiyat uydurulmuyor. İlanı <a href="/#analiz">Ev Analizi</a> aracında kendi fiyat ve kira bilgileriyle değerlendirin.</p></div></aside>
 </main><Footer/></>
}
