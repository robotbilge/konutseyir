import {Header,Footer} from '../../components/site-chrome';
import {Calculator} from '../../components/calculator';

export default function HomeAnalysis(){return <><Header back/><main className="inner focused-tool-page">
 <div className="page-title"><p className="eyebrow">EV ANALİZİ</p><h1>İlanı tek hesapta değerlendirin</h1><p>Satış fiyatı, metrekare, net kira, alım giderleri, enflasyon ve alternatif getirileri aynı sermaye üzerinden hesaplayın.</p></div>
 <nav className="tool-jumps" aria-label="Ayrı hesaplama araçları"><a href="/hesaplama/kira-carpani">Kira çarpanı</a><a href="/hesaplama/net-kira">Net kira</a><a href="/hesaplama/metrekare">Metrekare</a><a href="/hesaplama/reel-getiri">Reel getiri</a><a href="/hesaplama/alim-maliyeti">Alım maliyeti</a></nav>
 <Calculator/>
 </main><Footer/></>}
