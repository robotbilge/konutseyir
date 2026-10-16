import {CityEditorial} from '@/components/city-editorial';
import {cityEditorial} from '@/lib/city-editorial';
import {EditorialSources} from '@/components/editorial-evidence';
import {notFound} from 'next/navigation';
import {Header,Footer} from '@/components/site-chrome';
import {CityMarket,CitySales,DistrictSalesRanking} from '@/components/live-data';
import {cities} from '@/lib/content';
import {Building,ChartNoAxesCombined,Info} from 'lucide-react';

export function generateStaticParams(){return cities.map(c=>({slug:c.slug}))}

export default async function City({params}:{params:Promise<{slug:string}>}){
 const{slug}=await params,c=cities.find(x=>x.slug===slug);
 if(!c)notFound();
 
 return <><Header back/><main className="inner city-page">
  <div className="page-title"><p className="eyebrow">ŞEHİR PİYASASI</p><h1>{c.name} konut piyasası</h1><p>{c.note}</p></div>
  <nav className="tool-jumps" aria-label="Şehir sayfasında ilerleyin"><a href="#resmi-veriler">Resmî veri kartları</a><a href="#karar-dosyasi">Konut seçimi karar dosyası</a></nav><div className="city-dashboard" id="resmi-veriler">
   <section><ChartNoAxesCombined/><h2>Fiyat eğilimi</h2><b>{c.region}</b><p>TCMB Konut Fiyat Endeksi bu bölge düzeyinde izlenir. İlçe veya tek konut değeri değildir.</p><CityMarket slug={c.slug} region={c.region}/><a href="https://evds3.tcmb.gov.tr/" target="_blank" rel="noreferrer">TCMB EVDS kaynağı →</a></section>
   <section><Building/><h2>Satış hareketi</h2><b>{c.name} ili</b><p>TÜİK aylık konut satışları; toplam, ipotekli, ilk el ve ikinci el kırılımlarıyla gösterilir.</p><CitySales slug={c.slug}/><a href="https://veriportali.tuik.gov.tr/tr/databrowser/tuik/categories/9/9_4/TR,DF_SATIS_SEKLI_DURUMU_ILILCE_V3,1.0" target="_blank" rel="noreferrer">Resmî il satış tablosu →</a></section>
  </div>
  <section className="city-evaluation"><p className="eyebrow">İLÇE SATIŞ RADARI</p><h2>En çok konut satılan ilçeler</h2><p>{c.name} için son mevcut dönemde satış adedine göre ilçe sıralaması. Veri bulunmadığında tahmini sıralama gösterilmez.</p><DistrictSalesRanking city={c.slug}/></section>
  <CityEditorial slug={slug}/>
  <section className="city-method"><h2>Bu iki gösterge birlikte nasıl okunur?</h2><p>Konut Fiyat Endeksi fiyatların yönünü, il satış sayısı ise işlem hareketini gösterir. İkisinin birlikte yükselmesi hareketlenen bir piyasaya işaret edebilir; ancak tek başına gelecekteki getiriyi kanıtlamaz.</p><p>İpotekli satış oranındaki değişim, kredi koşullarının işlem hacmine etkisini anlamaya yardım eder. İlk el ve ikinci el dağılımı da yeni konut arzı ile mevcut stokun ağırlığı hakkında bağlam sağlar.</p><p>Bu seriler il veya bölge ortalamasıdır. İlçe, mahalle, bina yaşı, kat, cephe ve hukuki durum farklarını içermez; tek bir konuta otomatik değer biçilmesinde kullanılmamalıdır.</p></section>
  <aside className="data-warning"><Info/><div><b>Veri sınırı</b><p>Resmî kaynaklarda düzenli ilçe fiyat serisi bulunmadığı için {c.name} ilçelerine tahmini fiyat uydurulmuyor. İlanı <a href="/ev-analizi">Ev Analizi</a> aracında kendi fiyat ve kira bilgileriyle değerlendirin.</p></div></aside>
 <EditorialSources sources={[...cityEditorial[slug].sources,{label:"TCMB Konut Fiyat Endeksi",url:"https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Istatistikler/Reel+Sektor+Istatistikleri/Konut+Fiyat+Endeksi/",scope:`${c.region} bölgesi endeksinin değişimi; ilçe veya tek konut fiyatı değildir. Veri dönemi canlı kartta belirtilir.`},{label:"TÜİK Konut Satış İstatistikleri",url:"https://data.tuik.gov.tr/Kategori/GetKategori?p=insaat-ve-konut-116",scope:"İl ve ilçe satış adetleri; ortalama fiyat veya yatırım getirisi ölçmez. Veri dönemi ilgili tabloda gösterilir."}]}/></main><Footer/></>
}
