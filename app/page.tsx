import {ArrowDown,ArrowUpRight,BadgeCheck,Calculator as CalculatorIcon,Database,SearchCheck,ShieldCheck} from 'lucide-react';
import {Header,Footer} from '../components/site-chrome';
import {Calculator,Credit,Deposit} from '../components/calculator';
import {LatestNews,MarketSnapshot,DistrictSalesRanking} from '../components/live-data';
import {TcmcHousingComparison} from '../components/tcmc-housing-comparison';
import {ListingAnalyzer} from '../components/listing-analyzer';

export default function Home(){return <><Header/><main>
  <section className="hero home-hero">
    <div className="hero-copy">
      <div className="trust-label"><BadgeCheck size={16}/> Kamu verileriyle karar desteği</div>
      <p className="eyebrow">KONUT YATIRIM ANALİZİ</p>
      <h1>Bir evin fiyatını değil,<br/><em>yatırım mantığını</em> ölçün.</h1>
      <p className="lead">Kira gelirini, alım masraflarını ve alternatif getirileri aynı hesapta karşılaştırın.</p>
      <div className="hero-actions"><a className="primary-link" href="#analiz">Hesaplamaya başla <ArrowDown size={17}/></a><a className="text-link" href="/veri">Veri kaynakları <ArrowUpRight size={16}/></a></div>
      <div className="hero-proof"><span><ShieldCheck/> Üyelik gerekmez</span><span><CalculatorIcon/> Sonuç anında güncellenir</span><span><Database/> Varsayımlar size ait</span></div>
    </div>
    <TcmcHousingComparison/>
  </section>
  <ListingAnalyzer/>
  <div className="inner">
    <Calculator/>
    <div className="section-heading support-heading"><div><p className="eyebrow">BAĞIMSIZ HESAP ARAÇLARI</p><h2>Nakit getirisi ve kredi maliyeti</h2></div><p>Mevduat vadesini ve kredi masraflarını ayrı hesaplayın. Bu hesaplar, üstteki konut karşılaştırmasının yerine geçmez.</p></div>
    <div className="support-tools">
      <div className="support-tool-row deposit-tool"><div className="support-tool-copy"><span>NAKİT GETİRİSİ</span><h3>Paranız mevduatta ne kazanır?</h3><p>Seçtiğiniz vade sonunda stopaj sonrası net tutarı hesaplayın.</p></div><Deposit/></div>
      <div className="support-tool-row credit-tool"><div className="support-tool-copy"><span>FİNANSMAN MALİYETİ</span><h3>Konut kredisi gerçekte neye mal olur?</h3><p>Aylık taksiti, toplam geri ödemeyi ve ek masrafları birlikte görün.</p></div><Credit/></div>
    </div>
  </div>
  <MarketSnapshot/>
  <LatestNews/>
  <div className="inner">
    <section className="home-sales-radar"><div><p className="eyebrow">TÜRKİYE KONUT SATIŞ RADARI</p><h2>En çok konut satılan ilçeleri izleyin</h2><p>Resmî TÜİK kayıtlarında doğrulanmış ilçe kırılımı bulunan şehirlerin satış hareketini inceleyin.</p><DistrictSalesRanking city="istanbul"/></div><a className="primary-link" href="/sehirler">Şehir verilerini incele <ArrowUpRight size={17}/></a></section>
    <section className="cross-network-card"><div><span className="cross-network-badge">AYNI YAYIN AĞI · DOĞRUDAN ARAÇLAR</span><h2>Altın birikiminizi konut bütçesine çevirin</h2><p>Konut için peşinat ve bütçeyi hesaplayın; canlı altın grafiği ve altından konuta geçiş senaryosu için AltınSeyir’in ilgili aracını açın.</p></div><div><a href="/hesaplama/altin-bazli-konut">Altın / konut bütçesini hesapla <ArrowUpRight size={16}/></a><a className="gold-external" href="https://altinseyir.com/altindan-konuta" target="_blank" rel="noopener noreferrer">AltınSeyir geçiş hesabını aç <ArrowUpRight size={16}/></a><a className="gold-price-link" href="https://altinseyir.com/gram-altin" target="_blank" rel="noopener noreferrer">Canlı gram altın grafiği <ArrowUpRight size={16}/></a></div></section>
    <section className="checklist-banner"><div><p className="eyebrow">HIZLI KONTROL LİSTESİ</p><h2>Rakam doğru olsa da ev yanlış olabilir.</h2></div><a href="/kontrol-listesi">Kontrol listesini aç <ArrowUpRight size={18}/></a></section>
    <section id="kontrol" className="official-section"><div><p className="eyebrow">SATIN ALMADAN ÖNCE</p><h2>Resmî kaynaktan kontrol edin</h2><p>KonutSeyir resmî sorgu ekranlarının yerine geçmez; doğru kaynağa yönlendirir.</p></div><div className="official-links"><a href="https://parselsorgu.tkgm.gov.tr/" target="_blank" rel="noreferrer"><SearchCheck/><span><b>TKGM Parsel Sorgu</b><small>Ada ve parsel bilgisini doğrulayın</small></span><ArrowUpRight/></a><a href="https://tdth.afad.gov.tr/" target="_blank" rel="noreferrer"><ShieldCheck/><span><b>AFAD Tehlike Haritası</b><small>Bölgesel deprem tehlikesini inceleyin</small></span><ArrowUpRight/></a><a href="/kontrol-listesi"><BadgeCheck/><span><b>Alım Kontrol Listesi</b><small>Satın alma adımlarını gözden geçirin</small></span><ArrowUpRight/></a></div></section>
  </div>
</main><Footer/></>}
