import {ArrowUpRight,BadgeCheck,Calculator as CalculatorIcon,Database,Info,SearchCheck,ShieldCheck} from 'lucide-react';
import {Header,Footer} from '../components/site-chrome';
import {LatestNews,MarketSnapshot} from '../components/live-data';
import {LatestArticles} from '../components/latest-articles';
import {PushSignup} from '../components/push-signup';

export default function Home(){return <><Header/><main className="home-page">
  <section className="hero home-hero">
    <div className="hero-copy">
      <p className="eyebrow">KONUT KARARINIZI RAKAMLARLA DEĞERLENDİRİN</p>
      <h1>Bir evin fiyatını değil, <em>kararınızın bütününü</em> görün.</h1>
      <p className="hero-tagline">İlanı, kredi yükünü ve kira senaryosunu <strong>kendi varsayımlarınızla</strong> inceleyin.</p>
      <p className="lead">Satılık konut ilanının net ve brüt m² fiyatını; TCMB’nin il göstergesi, kira, getiri ve amortisman verilerinden ayrı okuyun.</p>
      <div className="hero-actions"><a className="primary-link" href="/ev-analizi">İlanımı analiz et <ArrowUpRight size={17}/></a><a className="text-link" href="/hesaplama">Hesap araçlarını gör <ArrowUpRight size={16}/></a></div>
      
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
  <section className="value-strip home-value-strip inner" aria-label="KonutSeyir nasıl çalışır?">
    <div><span><ShieldCheck aria-hidden="true"/></span><p><b>Ücretsiz ve üyeliksiz başlayın</b><small>Hesaplama araçlarını hesap açmadan kullanın.</small></p></div>
    <div><span><Database aria-hidden="true"/></span><p><b>Kaynağı ve veri dönemini görün</b><small>Veri tarihi ve kapsamı sonuçla birlikte gösterilir.</small></p></div>
    <div><span><CalculatorIcon aria-hidden="true"/></span><p><b>Varsayımları siz belirleyin</b><small>Kira, vade ve giderleri kendi senaryonuza göre girin.</small></p></div>
  </section>
  <div className="inner home-top-content">
    <LatestArticles/>
    <section className="home-push" aria-labelledby="home-push-title">
      <div className="home-push-intro">
        <p className="eyebrow">YENİ MAKALELERİ KAÇIRMAYIN</p>
        <h2 id="home-push-title">KonutSeyir’i ana ekranınıza ekleyin.</h2>
        <p>Yeni makale yayımlandığında bildirim almak için cihazınızda izin verin.</p>
        <details>
          <summary>Ana ekrana nasıl eklerim?</summary>
          <p><b>iPhone:</b> Safari’de Paylaş → Ana Ekrana Ekle. Ana ekrandaki KonutSeyir’i açın ve bildirim iznini aşağıdaki düğmeden verin.</p>
          <p><b>Android:</b> Tarayıcı menüsünden Uygulamayı yükle veya Ana ekrana ekle seçeneğini kullanın. KonutSeyir’i açıp bildirim iznini aşağıdaki düğmeden verin.</p>
        </details>
      </div>
      <PushSignup variant="home"/>
    </section>
  </div>
  <div className="inner home-content">
    <section className="home-user-paths" aria-labelledby="home-user-paths-title">
      <header><p className="eyebrow">İHTİYACINIZA GÖRE İLERLEYİN</p><h2 id="home-user-paths-title">Konut için hangi adımı atıyorsunuz?</h2><p>Bir sonraki adımı seçin; her araç kendi karar sorusuna odaklanır.</p></header>
      <div className="home-user-path-grid">
        <article><p className="eyebrow">EV ALACAĞIM</p><h3>Satın alma kararını hazırlayın</h3><p>İlanı inceleyin, toplam maliyeti ve kredi yükünü hesaplayın, tapu öncesi kontrolleri tamamlayın.</p><a className="home-path-primary" href="/ev-analizi">Konut analizini aç <ArrowUpRight size={16}/></a><div><a href="/kredi-hesaplama">Kredi taksiti ve maliyeti</a><a href="/hesaplama/alim-maliyeti">Toplam alım gideri</a><a href="/kontrol-listesi">Satın alma kontrol listesi</a><a href="/kredi-hesaplama#maksimum-butce">Bütçeme göre konut tutarı</a></div></article>
        <article><p className="eyebrow">KONUTA YATIRIM YAPACAĞIM</p><h3>Kira ve alternatifleri karşılaştırın</h3><p>Net kira hesabını, TÜİK geçmiş getirilerini ve şehirlerin fiyat eğilimini inceleyin.</p><a className="home-path-primary" href="/karsilastir">Yatırım karşılaştırmasını aç <ArrowUpRight size={16}/></a><div><a href="/hesaplama/kira-getirisi">TCMB kira sorgusu</a><a href="/hesaplama/net-kira">Net kira getirisi</a><a href="/sehirler">Şehir verileri</a><a href="/rehber/ev-mi-mevduat-mi">Konut mu mevduat mı?</a><a href="/hesaplama/mevduat">Net mevduat getirisi</a></div></article>
        <article><p className="eyebrow">EVİMİ SATACAĞIM</p><h3>Satışı hazırlayın, tutarı görün</h3><p>Satış fiyatından borç ve giderleri düşün; tapu ve resmî kayıt kontrollerini tamamlayın.</p><a className="home-path-primary" href="/karar-araclari#net-satis">Net satış tutarını hesapla <ArrowUpRight size={16}/></a><div><a href="/hesaplama/tapu-harci">Tapu gideri</a><a href="/resmi-kontroller">Resmî kontroller</a></div></article>
      </div>
    </section>
    <section className="home-renewal" aria-labelledby="home-renewal-title">
      <div className="home-renewal-copy">
        <p className="eyebrow">KENTSEL DÖNÜŞÜM</p>
        <h2 id="home-renewal-title">Yeni evinizi beklerken<br/>bütçeniz hazır mı?</h2>
        <p>Yapım ödemelerini, geçici kirayı ve destek takvimini birlikte değerlendirin. İki müteahhit teklifinin farklarını görün.</p>
        <div className="home-renewal-actions"><a className="primary-link" href="/kentsel-donusum">Dönüşüm bütçesini hesapla <ArrowUpRight size={17} aria-hidden="true"/></a><a className="home-renewal-guide" href="/rehber/kentsel-donusum-butcesi-hibe-kredi-nakit-acigi">Örnekli rehberi oku <ArrowUpRight size={15} aria-hidden="true"/></a></div>
      </div>
      <div className="home-renewal-plan">
        <p className="home-renewal-plan-label"><CalculatorIcon size={16} aria-hidden="true"/> DÖNÜŞÜMÜN NAKİT PLANI</p>
        <ol aria-label="Dönüşüm planının üç aşaması">
          <li><span aria-hidden="true">01</span><strong>Başlangıç</strong><small>Peşinat ve taşınma</small></li>
          <li><span aria-hidden="true">02</span><strong>Yapım süreci</strong><small>Ara ödemeler ve kira</small></li>
          <li><span aria-hidden="true">03</span><strong>Teslim</strong><small>Son ödeme ve gecikme</small></li>
        </ol>
        <div className="home-renewal-tags"><span>Yapım bedeli</span><span>Geçici kira</span><span>Destekler</span></div>
        <p className="home-renewal-note">Sizin tutarlarınızla planlama. Otomatik destek veya hak sahipliği hesabı değildir.</p>
      </div>
    </section>
    <section className="cross-network-card gold-housing-promo" aria-labelledby="gold-housing-promo-title"><div><span className="cross-network-badge">AYNI YAYIN AĞI · DOĞRUDAN ARAÇLAR</span><h2 id="gold-housing-promo-title">Altın birikiminiz konutta ne kadar alım gücü sağlıyor?</h2><p>AltınSeyir’de birikiminizin konut alım gücünü hesaplayın. Güncel gram altın fiyatını ve grafiğini inceleyin.</p></div><div><a className="gold-external" href="https://altinseyir.com/altindan-konuta" target="_blank" rel="noopener noreferrer">Altınla konut alım gücümü hesapla <ArrowUpRight size={16}/></a><a className="gold-price-link" href="https://altinseyir.com/gram-altin" target="_blank" rel="noopener noreferrer">Canlı gram altın grafiği <ArrowUpRight size={16}/></a></div></section>
  </div>
  <MarketSnapshot/>
  <LatestNews/>
  <div className="inner home-content">
    <section className="home-sales-radar home-sales-radar-compact"><div><p className="eyebrow">TÜRKİYE KONUT SATIŞ RADARI</p><h2>En çok konut satılan ilçeleri izleyin</h2><p>Şehir bazında konut satışlarını karşılaştırın. Doğrulanmış ilçe verisi bulunan şehirlerde ilçe sıralamasını da inceleyin.</p></div><a className="primary-link" href="/sehirler">Şehir verilerini incele <ArrowUpRight size={17}/></a></section>

    <section className="checklist-banner"><div><p className="eyebrow">HIZLI KONTROL LİSTESİ</p><h2>Rakam doğru olsa da ev yanlış olabilir.</h2></div><a href="/kontrol-listesi">Kontrol listesini aç <ArrowUpRight size={18}/></a></section>
    <section className="guide-intro home-reading-example"><p className="eyebrow">BİR İLANI OKUMA ÖRNEĞİ</p><h2>Aynı ev, iki farklı m² sonucu</h2><p>Öğretici örnek: 5.000.000 TL fiyatlı, 100 m² net ve 125 m² brüt bir konutun net m² fiyatı 50.000 TL; brüt m² fiyatı 40.000 TL’dir. Fark indirim değil, payda farkıdır. İl göstergesi brüt alana dayanıyorsa 50.000 TL ile karşılaştırmak yanıltır.</p><div className="reading-action-buttons"><a href="/rehber/brut-net-metrekare">Net ve brüt alanı doğrulayın <ArrowUpRight size={16}/></a><a href="/rehber/ev-pahali-mi">Fiyat değerlendirme rehberi <ArrowUpRight size={16}/></a></div></section>
    <section id="kontrol" className="official-section"><div><p className="eyebrow">SATIN ALMADAN ÖNCE</p><h2>Resmî kaynaktan kontrol edin</h2><p>KonutSeyir resmî sorgu ekranlarının yerine geçmez; doğru kaynağa yönlendirir.</p></div><div className="official-links"><a href="https://parselsorgu.tkgm.gov.tr/" target="_blank" rel="noreferrer"><SearchCheck/><span><b>TKGM Parsel Sorgu</b><small>Ada ve parsel bilgisini doğrulayın</small></span><ArrowUpRight/></a><a href="https://tdth.afad.gov.tr/" target="_blank" rel="noreferrer"><ShieldCheck/><span><b>AFAD Tehlike Haritası</b><small>Bölgesel deprem tehlikesini inceleyin</small></span><ArrowUpRight/></a><a href="/kontrol-listesi"><BadgeCheck/><span><b>Alım Kontrol Listesi</b><small>Satın alma adımlarını gözden geçirin</small></span><ArrowUpRight/></a></div></section>
  </div>
</main><Footer/></>}
