import {Header,Footer} from '../../components/site-chrome';
import {CityComparison} from '../../components/city-comparison';
import {cities} from '../../lib/content';

export default function CityComparisonPage(){return <><Header back/><main className="inner city-compare-page">
 <div className="page-title"><p className="eyebrow">ŞEHİR PİYASASI</p><h1>Şehirlerin konut fiyat eğilimini karşılaştırın</h1><p>TCMB Konut Fiyat Endeksi bölgesel serilerini aynı başlangıç noktasına göre inceleyin. İstanbul, Ankara ve İzmir’i veya listedeki başka şehirleri seçin. Yeterli ortak dönem yoksa grafik gösterilmez.</p></div>
 <CityComparison/>
 <section className="city-compare-method"><h2>Bu karşılaştırma neyi gösterir?</h2><p>Her şehir endeksi seçilen dönemin ilk ortak ayında 100 kabul edilir. Grafik, bölgesel endekslerin o tarihten bu yana yüzde değişimini karşılaştırır. Şehirler arasındaki bugünkü konut fiyat seviyesini veya bir evin değerini göstermez.</p><p>TCMB endeksi bölge düzeyindedir. Örneğin İstanbul, Ankara ve İzmir serileri ilgili bölgesel kapsama dayanır; şehir içindeki mahalle, ilçe, bina yaşı ve konut niteliği farklarını yansıtmaz.</p><p>Karşılaştırılan dönemin tüm şehirlerde ortak ve kesintisiz aylık verisi bulunmadığında sonuç üretilmez. Kaynağı ve dönem bilgisi grafiğin altında yer alır.</p><h3>Şehir sayfalarına geçin</h3><div>{cities.slice(0,6).map(city=><a href={`/sehirler/${city.slug}`} key={city.slug}>{city.name} →</a>)}</div></section>
 </main><Footer/></>}
