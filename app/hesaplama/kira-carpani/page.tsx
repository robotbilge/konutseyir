import {FocusedToolPage} from '../../../components/focused-tool-page';
import {RentMultiplierCalculator} from '../../../components/focused-calculators';
import {ToolEditorial} from '../../../components/tool-editorial';
export default function Page(){return <FocusedToolPage active="/hesaplama/kira-carpani" eyebrow="KİRA ÇARPANI" title="Ev, kirasına göre kaç yılda geri döner?" description="Satış fiyatı, bugünkü kira ve yıllık artış varsayımıyla sabit ve artışlı brüt geri dönüşü görün."><RentMultiplierCalculator/><ToolEditorial slug="kira-carpani"/></FocusedToolPage>}
