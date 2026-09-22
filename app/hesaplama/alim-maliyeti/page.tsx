import {FocusedToolPage} from '../../../components/focused-tool-page';
import {PurchaseCostCalculator} from '../../../components/focused-calculators';
import {ToolEditorial} from '../../../components/tool-editorial';
export default function Page(){return <FocusedToolPage active="/hesaplama/alim-maliyeti" eyebrow="ALIM MALİYETİ" title="İlan fiyatının üstüne ne kadar eklenir?" description="Tapu, komisyon, tadilat, kredi ve diğer başlangıç giderleriyle toplam yatırım maliyetini hesaplayın."><PurchaseCostCalculator/><ToolEditorial slug="alim-maliyeti"/></FocusedToolPage>}
