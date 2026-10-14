import {Header,Footer} from '../../components/site-chrome';
import {EnvironmentMap} from '../../components/environment-map';
export default function EnvironmentPage(){return <><Header back/><main className="inner environment-page"><div className="page-title"><p className="eyebrow">KONUMU İNCELEYİN</p><h1>Çevresel yaşam noktaları ve geçmiş depremler</h1><p>Haritada bir nokta seçin; açık harita kayıtlarında görünen ulaşım, market, eczane, sağlık, okul ve yeşil alan noktalarını inceleyin.</p></div><EnvironmentMap/></main><Footer/></>}
