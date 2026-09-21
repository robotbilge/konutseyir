import Home from '../app/page';
import HomeAnalysis from '../app/ev-analizi/page';
import LoanCalculator from '../app/kredi-hesaplama/page';
import OfficialChecks from '../app/resmi-kontroller/page';
import RentMultiplier from '../app/hesaplama/kira-carpani/page';
import NetRent from '../app/hesaplama/net-kira/page';
import SquareMeter from '../app/hesaplama/metrekare/page';
import RealReturn from '../app/hesaplama/reel-getiri/page';
import PurchaseCost from '../app/hesaplama/alim-maliyeti/page';
import Compare from '../app/karsilastir/page';
import Guides from '../app/rehber/page';
import Guide from '../app/rehber/[slug]/page';
import Cities from '../app/sehirler/page';
import City from '../app/sehirler/[slug]/page';
import Checklist from '../app/kontrol-listesi/page';
import Data from '../app/veri/page';
import About from '../app/hakkimizda/page';
import Contact from '../app/iletisim/page';
import Privacy from '../app/gizlilik/page';
import Terms from '../app/kullanim-kosullari/page';
import CookiePolicy from '../app/cerez-politikasi/page';
import News from '../app/haberler/page';
import NewsDetail from '../app/haberler/haber/page';
import {guides,cities} from '../lib/content';
import {Header,Footer} from '../components/site-chrome';
const fixed:Record<string,{component:any,title:string,description:string}>={
'/':{component:Home,title:'KonutSeyir | Net kira, kredi ve reel konut getirisi',description:'Net kira gelirini TL ve yüzde olarak hesaplayın. Stopaj sonrası mevduat, konut ve altını aynı sermayeyle karşılaştırın.'},
'/ev-analizi':{component:HomeAnalysis,title:'Ev analizi ve kira çarpanı hesaplama',description:'Net kira, kira çarpanı, metrekare fiyatı, alım maliyeti ve reel konut getirisini hesaplayın.'},
'/kredi-hesaplama':{component:LoanCalculator,title:'Konut kredisi toplam maliyet hesaplama',description:'Aylık taksit, toplam geri ödeme, faiz ve ek kredi giderlerini hesaplayın.'},
'/resmi-kontroller':{component:OfficialChecks,title:'Ev almadan önce resmî kontroller',description:'Tapu, parsel, deprem tehlikesi ve satın alma kontrol adımlarına ulaşın.'},
'/hesaplama/kira-carpani':{component:RentMultiplier,title:'Kira çarpanı hesaplama',description:'Satış fiyatı ve aylık kirayla brüt kira çarpanını ay ve yıl olarak hesaplayın.'},
'/hesaplama/net-kira':{component:NetRent,title:'Net kira getirisi hesaplama',description:'Boş kalma, gider, vergi ve alım masrafları sonrası net kira tutarını ve oranını hesaplayın.'},
'/hesaplama/metrekare':{component:SquareMeter,title:'Metrekare fiyatı hesaplama',description:'Satış fiyatı ve alan üzerinden konutun metrekare fiyatını hesaplayın.'},
'/hesaplama/reel-getiri':{component:RealReturn,title:'Reel konut getirisi hesaplama',description:'Konut artışı ve net kirayı enflasyondan arındırarak reel getiriyi hesaplayın.'},
'/hesaplama/alim-maliyeti':{component:PurchaseCost,title:'Konut alım maliyeti hesaplama',description:'Tapu, komisyon, tadilat ve kredi giderleri dahil toplam konut alım maliyetini hesaplayın.'},
'/karsilastir':{component:Compare,title:'Ev, mevduat ve altın karşılaştırması',description:'Alım giderleri, kira, stopaj ve enflasyon dahil bir yıllık yatırım senaryosu.'},
'/rehber':{component:Guides,title:'Konut satın alma ve yatırım rehberleri',description:'Kira çarpanı, net getiri, tapu ve maliyet konularında açıklamalar.'},
'/sehirler':{component:Cities,title:'Şehir konut piyasaları',description:'Bölgesel konut verilerinin kapsamı ve resmî kaynakları.'},
'/kontrol-listesi':{component:Checklist,title:'Ev satın alma kontrol listesi',description:'Tapu, iskân, teknik inceleme ve kiracı kontrollerinizi takip edin.'},
'/veri':{component:Data,title:'Veri kaynakları ve servis durumu',description:'KonutSeyir verilerinin kaynağı, dönemi ve bağlantı durumu.'},
'/haberler':{component:News,title:'Emlak ve konut haberleri',description:'Konut, kira, tapu ve gayrimenkul gündemini tarihe göre izleyin.'},
'/haberler/haber':{component:NewsDetail,title:'Emlak haberi',description:'Haber özeti ve özgün kaynak bağlantısı.'},
'/hakkimizda':{component:About,title:'KonutSeyir hakkında',description:'KonutSeyir hesaplama yöntemi ve amacı.'},
'/iletisim':{component:Contact,title:'İletişim',description:'KonutSeyir iletişim bilgileri.'},
'/gizlilik':{component:Privacy,title:'Gizlilik',description:'KonutSeyir veri işleme ve gizlilik açıklaması.'},
'/cerez-politikasi':{component:CookiePolicy,title:'Çerez politikası',description:'KonutSeyir çerezleri, reklam tercihleri ve tarayıcı ayarları.'},
'/kullanim-kosullari':{component:Terms,title:'Kullanım koşulları',description:'Hesaplama varsayımları ve kullanım koşulları.'}};
export const paths=[...Object.keys(fixed),...guides.map(g=>'/rehber/'+g.slug),...cities.map(c=>'/sehirler/'+c.slug)];
export function meta(path:string){const f=fixed[path];if(f)return {...f,noindex:path==='/haberler'||path==='/haberler/haber'};const g=guides.find(g=>path==='/rehber/'+g.slug);if(g)return {title:g.title,description:g.summary,noindex:false};const c=cities.find(c=>path==='/sehirler/'+c.slug);return {title:c?c.name+' konut piyasası':'Sayfa bulunamadı',description:c?.note||'Aradığınız sayfa bulunamadı.',noindex:!c}}
export async function page(path:string){path=path.replace(/\/$/,'')||'/';if(fixed[path]){const C=fixed[path].component;return <C/>}if(path.startsWith('/haberler/'))return <NewsDetail/>;if(guides.some(g=>path==='/rehber/'+g.slug))return Guide({params:Promise.resolve({slug:path.split('/')[2]})});if(cities.some(c=>path==='/sehirler/'+c.slug))return City({params:Promise.resolve({slug:path.split('/')[2]})});return <><Header back/><main className="inner"><h1>Sayfa bulunamadı</h1><a href="/">Ana sayfaya dön →</a></main><Footer/></>}
