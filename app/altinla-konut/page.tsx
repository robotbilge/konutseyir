import {Header,Footer} from '../../components/site-chrome';
import {GoldHousing} from '../../components/gold-housing';
import '../../components/gold-housing.css';
export default function Page(){return <><Header back/><main><div className="inner page-title"><p className="eyebrow">ALTIN · KONUT ALIM GÜCÜ</p><h1>Altının Ne Kadar Konut Alıyor?</h1><p>Altın birikiminizin farklı şehirlerde yaklaşık kaç brüt metrekare konuta karşılık geldiğini güncel TCMB birim fiyatlarıyla karşılaştırın.</p></div><GoldHousing/></main><Footer/></>}
