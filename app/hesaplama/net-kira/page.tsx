import {FocusedToolPage} from '../../../components/focused-tool-page';
import {NetRentCalculator} from '../../../components/focused-calculators';
import {ToolEditorial} from '../../../components/tool-editorial';
export default function Page(){return <FocusedToolPage active="/hesaplama/net-kira" eyebrow="NET KİRA" title="Giderlerden sonra elinizde ne kalır?" description="Boş kalma, işletme gideri, vergi ve alım masraflarını ekleyerek yıllık net kira tutarını ve oranını hesaplayın."><NetRentCalculator/><ToolEditorial slug="net-kira"/></FocusedToolPage>}
