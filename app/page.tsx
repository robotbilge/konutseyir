import {ArrowUpRight,BadgeCheck,Calculator as CalculatorIcon,Database,Info,SearchCheck,ShieldCheck} from 'lucide-react';
import {Header,Footer} from '../components/site-chrome';
import {LatestNews,MarketSnapshot,DistrictSalesRanking} from '../components/live-data';

export default function Home(){return <><Header/><main>
  <section className="hero home-hero">
    <div className="hero-copy">
      <div className="trust-label"><BadgeCheck size={16}/> Kamu verileriyle karar desteği</div>
      <p className="eyebrow">SATILIK KONUT İLANI ANALİZİ</p>
      <h1>Satılık konut ilanını m² fiyatı ve <em>kira göstergeleriyle</em> karşılaştırın.</h1>
      <p className="hero-tagline">Bir evin fiyatını değil, <strong>yatırım mantığını</strong> ölçün.</p>
      <p className="lead">İlan bilgilerini bağlantıdan aktarın. Brüt m² fiyatını TCMB’nin il göstergesiyle; kira, getiri ve amortismanı ayrı ayrı inceleyin.</p>
      <div className="hero-actions"><a className="primary-link" href="/ev-analizi">İlanı analiz et <ArrowUpRight size={17}/></a><a className="text-link" href="/veri">Veri kaynakları <ArrowUpRight size={16}/></a></div>
      <div className="hero-proof"><span><ShieldCheck/> Üyelik gerekmez</span><span><CalculatorIcon/> Kaynak dönemi görünür</span><span><Database/> Varsayımlar size ait</span></div>
    </div>
    <aside className="hero-analysis-preview" aria-labelledby="hero-analysis-title">
      <p className="eyebrow">RAPOR ÖNİZLEMESİ</p>
      <h2 id="hero-analysis-title">Analizde ne göreceksiniz?</h2>
      <ol>
        <li><span>01</span><div><b>İlanın m² fiyatı</b><small>Net ve brüt m² fiyatları ayrı hesaplanır.</small></div></li>
        <li><span>02</span><div><b>TCMB il göstergesiyle fark</b><small>Yüzde farkı yalnız brüt alan varsa gösterilir.</small></div></li>
        <li><span>03</span><div><b>Kira ve geri dönüş göstergeleri</b><small>TCMB kira verisi veya girdiğiniz aylık kira kullanılır.</small></div></li>
      </ol>
      <p className="hero-analysis-note"><Info size={16}/> TCMB göstergesi mahalle emsali veya ekspertiz değildir. İlan bilgileri alınamazsa manuel girebilirsiniz.</p>
      
    </aside>
  </section>
  <div className="inner">
    <section className="home-user-paths" aria-labelledby="home-user-paths-title">
      <header><p className="eyebrow">İHTİYACINIZA GÖRE İLERLEYİN</p><h2 id="home-user-paths-title">Konut için hangi adımı atıyorsunuz?</h2><p>Bir sonraki adımı seçin; her araç kendi karar sorusuna odaklanır.</p></header>
      <div className="home-user-path-grid">
        <article><p className="eyebrow">EV ALACAĞIM</p><h3>Satın alma kararını hazırlayın</h3><p>İlanı inceleyin, toplam maliyeti ve kredi yükünü hesaplayın, tapu öncesi kontrolleri tamamlayın.</p><a className="home-path-primary" href="/ev-analizi">Konut analizini aç <ArrowUpRight size={16}/></a><div><a href="/kredi-hesaplama">Kredi taksiti ve maliyeti</a><a href="/hesaplama/alim-maliyeti">Toplam alım gideri</a><a href="/kontrol-listesi">Satın alma kontrol listesi</a><a href="/kredi-hesaplama#maksimum-butce">Bütçeme göre konut tutarı</a></div></article>
        <article><p className="eyebrow">KONUTA YATIRIM YAPACAĞIM</p><h3>Kira ve alternatifleri karşılaştırın</h3><p>Net kira hesabını, TÜİK geçmiş getirilerini ve şehirlerin fiyat eğilimini inceleyin.</p><a className="home-path-primary" href="/karsilastir">Yatırım karşılaştırmasını aç <ArrowUpRight size={16}/></a><div><a href="/hesaplama/net-kira">Net kira getirisi</a><a href="/sehirler">Şehir verileri</a><a href="/rehber/ev-mi-mevduat-mi">Konut mu mevduat mı?</a><a href="/hesaplama/mevduat">Net mevduat getirisi</a></div></article>
        <article><p className="eyebrow">EVİMİ SATACAĞIM</p><h3>Satışı hazırlayın, tutarı görün</h3><p>Satış fiyatından borç ve giderleri düşün; tapu ve resmî kayıt kontrollerini tamamlayın.</p><a className="home-path-primary" href="/karar-araclari#net-satis">Net satış tutarını hesapla <ArrowUpRight size={16}/></a><div><a href="/hesaplama/tapu-harci">Tapu gideri</a><a href="/resmi-kontroller">Resmî kontroller</a></div></article>
      </div>
    </section>
    <section className="cross-network-card gold-housing-promo" aria-labelledby="gold-housing-promo-title"><div><span className="cross-network-badge">AYNI YAYIN AĞI · DOĞRUDAN ARAÇLAR</span><h2 id="gold-housing-promo-title">Altın birikiminiz konutta ne kadar alım gücü sağlıyor?</h2><p>Altın birikiminizin farklı şehirlerde yaklaşık kaç brüt metrekareye karşılık geldiğini hesaplayın. Canlı gram altın grafiği ve AltınSeyir geçiş hesabı da elinizin altında.</p></div><div><a className="gold-external" href="/altinla-konut">Altınla konut alım gücümü hesapla <ArrowUpRight size={16}/></a><a className="gold-price-link" href="https://altinseyir.com/altindan-konuta" target="_blank" rel="noopener noreferrer">AltınSeyir geçiş hesabını aç <ArrowUpRight size={16}/></a><a className="gold-price-link" href="https://altinseyir.com/gram-altin" target="_blank" rel="noopener noreferrer">Canlı gram altın grafiği <ArrowUpRight size={16}/></a></div></section>
  </div>
  <MarketSnapshot/>
  <LatestNews/>
  <div className="inner">
    <section className="home-sales-radar"><div><p className="eyebrow">TÜRKİYE KONUT SATIŞ RADARI</p><h2>En çok konut satılan ilçeleri izleyin</h2><p>Resmî TÜİK kayıtlarında doğrulanmış ilçe kırılımı bulunan şehirlerin satış hareketini inceleyin.</p><DistrictSalesRanking city="istanbul"/></div><a className="primary-link" href="/sehirler">Şehir verilerini incele <ArrowUpRight size={17}/></a></section>

    <section className="checklist-banner"><div><p className="eyebrow">HIZLI KONTROL LİSTESİ</p><h2>Rakam doğru olsa da ev yanlış olabilir.</h2></div><a href="/kontrol-listesi">Kontrol listesini aç <ArrowUpRight size={18}/></a></section>
    <section id="kontrol" className="official-section"><div><p className="eyebrow">SATIN ALMADAN ÖNCE</p><h2>Resmî kaynaktan kontrol edin</h2><p>KonutSeyir resmî sorgu ekranlarının yerine geçmez; doğru kaynağa yönlendirir.</p></div><div className="official-links"><a href="https://parselsorgu.tkgm.gov.tr/" target="_blank" rel="noreferrer"><SearchCheck/><span><b>TKGM Parsel Sorgu</b><small>Ada ve parsel bilgisini doğrulayın</small></span><ArrowUpRight/></a><a href="https://tdth.afad.gov.tr/" target="_blank" rel="noreferrer"><ShieldCheck/><span><b>AFAD Tehlike Haritası</b><small>Bölgesel deprem tehlikesini inceleyin</small></span><ArrowUpRight/></a><a href="/kontrol-listesi"><BadgeCheck/><span><b>Alım Kontrol Listesi</b><small>Satın alma adımlarını gözden geçirin</small></span><ArrowUpRight/></a></div></section>
  </div>
</main><Footer/></>}
