import {FocusedToolPage} from '../../../components/focused-tool-page';
import {SquareMeterCalculator} from '../../../components/focused-calculators';
import {ToolEditorial} from '../../../components/tool-editorial';
export default function Page(){return <FocusedToolPage active="/hesaplama/metrekare" eyebrow="METREKARE FİYATI" title="İlanın bir metrekaresi kaç TL?" description="Satış fiyatını aynı tür alan ölçüsüne bölerek karşılaştırılabilir metrekare fiyatını bulun."><SquareMeterCalculator/><ToolEditorial slug="metrekare"/></FocusedToolPage>}
