import {Header,Footer} from '../../components/site-chrome';
import {NetSaleCalculator} from '../../components/decision-tools';
export default function DecisionToolsPage(){return <><Header back/><main className="inner focused-tool-page"><div className="page-title"><p className="eyebrow">EVİNİ SATACAKLAR</p><h1>Net satış tutarı hesaplama</h1><p>Satış fiyatını, kapanacak borcu ve size düşen giderleri girerek elinizde kalacak yaklaşık tutarı görün.</p></div><NetSaleCalculator/><p className="tool-next"><a href="/hesaplama">Diğer hesap araçları →</a></p></main><Footer/></>}
