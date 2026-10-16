import {ToolEditorial} from '@/components/tool-editorial';
import {Header,Footer} from '../../../components/site-chrome';
import {Deposit} from '../../../components/calculator';
export default function DepositPage(){return <><Header back/><main className="inner focused-tool-page narrow-tool-page"><div className="page-title"><p className="eyebrow">MEVDUAT</p><h1>Stopaj sonrası net mevduat getirisi</h1><p>Bankanızın yıllık brüt faiz teklifini, vade gününü ve hesabınız için geçerli stopaj oranını girin.</p></div><Deposit/><p className="tool-next"><a href="/karsilastir">TÜİK geçmiş dönem getirilerini karşılaştır →</a></p><ToolEditorial slug="mevduat"/></main><Footer/></>}
