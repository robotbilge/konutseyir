import {ArrowUpRight,Building2,MapPinned,ShieldCheck,ClipboardCheck} from 'lucide-react';
import {Header,Footer} from '../../components/site-chrome';

export default function OfficialChecks(){return <><Header back/><main className="inner focused-tool-page">
 <div className="page-title"><p className="eyebrow">RESMÎ KONTROLLER</p><h1>Satın almadan önce kaynağından doğrulayın</h1><p>Bölgesel gösterge ile tek bir binanın hukuki veya teknik durumunu birbirine karıştırmayın.</p></div>
 <div className="official-check-grid">
  <a href="https://parselsorgu.tkgm.gov.tr/" target="_blank" rel="noreferrer"><MapPinned/><div><h2>TKGM Parsel Sorgu</h2><p>Ada, parsel ve konum bilgisini resmî ekrandan inceleyin.</p></div><ArrowUpRight/></a>
  <a href="https://tdth.afad.gov.tr/" target="_blank" rel="noreferrer"><ShieldCheck/><div><h2>AFAD Tehlike Haritası</h2><p>Bölgesel deprem tehlikesini görün; bunu bina dayanıklılık raporu saymayın.</p></div><ArrowUpRight/></a>
  <a href="https://parselsorgu.tkgm.gov.tr/" target="_blank" rel="noreferrer"><Building2/><div><h2>Tapu ve parsel doğrulaması</h2><p>Malik, bağımsız bölüm ve takyidat için yetkili kanallardan güncel kayıt alın.</p></div><ArrowUpRight/></a>
  <a href="/kontrol-listesi"><ClipboardCheck/><div><h2>KonutSeyir kontrol listesi</h2><p>Tapu, iskân, proje, aidat, kiracı ve teknik inceleme adımlarını takip edin.</p></div><ArrowUpRight/></a>
 </div>
 <aside className="data-warning"><ShieldCheck/><div><b>Önemli sınır</b><p>AFAD haritası tek binanın sağlamlığını; parsel ekranı da mülkiyet üzerindeki bütün kısıtlamaları tek başına göstermez. Gerektiğinde tapu müdürlüğü, belediye, yetkili mühendis ve hukukçudan doğrulama alın.</p></div></aside>
 </main><Footer/></>}
