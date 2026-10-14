import {Header,Footer} from '../../components/site-chrome';
import {Credit} from '../../components/calculator';
import {BudgetCalculator} from '../../components/decision-tools';

export default function LoanCalculator(){return <><Header back/><main className="inner focused-tool-page narrow-tool-page">
 <div className="page-title"><p className="eyebrow">KONUT KREDİSİ</p><h1>Aylık taksiti değil, toplam maliyeti hesaplayın</h1><p>Kredi tutarı, aylık faiz, vade ve ek giderleri girerek toplam geri ödemeyi görün.</p></div>
 <nav className="tool-jumps" aria-label="Kredi hesapları"><a href="#kredi">Kredi tutarından taksit hesapla</a><a href="#maksimum-butce">Aylık bütçeden kredi hesapla</a></nav><div className="standalone-calculator"><Credit/></div><BudgetCalculator/>
 </main><Footer/></>}
