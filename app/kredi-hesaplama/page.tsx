import {Header,Footer} from '../../components/site-chrome';
import {Credit} from '../../components/calculator';

export default function LoanCalculator(){return <><Header back/><main className="inner focused-tool-page narrow-tool-page">
 <div className="page-title"><p className="eyebrow">KONUT KREDİSİ</p><h1>Aylık taksiti değil, toplam maliyeti hesaplayın</h1><p>Kredi tutarı, aylık faiz, vade ve ek giderleri girerek toplam geri ödemeyi görün.</p></div>
 <div className="standalone-calculator"><Credit/></div>
 </main><Footer/></>}
