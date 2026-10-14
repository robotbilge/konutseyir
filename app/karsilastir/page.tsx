import {Header,Footer} from '../../components/site-chrome';
import {FinancialReturns} from '../../components/financial-returns';
import '../financial-returns.css';
export default function Compare(){return <><Header back/><main className="inner compare-page">
 <div className="page-title"><p className="eyebrow">GERÇEKLEŞMİŞ DÖNEM · TÜİK</p><h1>Yatırım araçlarının geçmiş reel getirilerini karşılaştırın</h1><p>Altın, mevduat, döviz, BIST 100 ve DİBS için yayımlanan 1, 3, 6 ve 12 aylık sonuçları aynı tutarda inceleyin. Nominal değişimi ve TÜFE/Yİ-ÜFE sonrası satın alma gücünü ayrı görün.</p></div>
 <FinancialReturns/>
 <section className="compare-editorial"><h2>Geçmiş getiri nasıl okunmalı?</h2><p>Bu ekran TÜİK’in yayımladığı dönemin gerçekleşmiş istatistiklerini kullanır. Gelecekteki getiri tahmini değildir. Girilen tutar, yayımlanan oranı TL karşılığına çevirir; kişisel portföy sonucu olarak sunulmaz.</p><p>Mevduat serisi brüttür. Stopaj, yatırım aracına özgü vergiler, işlem maliyetleri ve alış-satış farkları bu serilerde kişisel hesabınıza göre düşülmez. TÜFE tüketici fiyatlarını, Yİ-ÜFE üretici fiyatlarını ölçer.</p><nav className="tool-jumps" aria-label="Diğer veri ve hesaplar"><a href="/ev-analizi">Konut ilanını TCMB ile incele</a><a href="/hesaplama/mevduat">Bankamın teklifine göre net mevduat</a><a href="/sehir-karsilastir">Şehir konut fiyat eğilimleri</a></nav></section>
 </main><Footer/></>}
