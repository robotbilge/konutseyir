import {useState} from "react";
import {Building2,Menu,X,ArrowUpRight,ArrowLeft} from "lucide-react";

const navItems=[
 ["Konut Analizi","/ev-analizi"],
 ["Hesap Araçları","/hesaplama"],
 ["Karşılaştır","/karsilastir"],
 ["Şehirler","/sehirler"],
 ["Rehber","/rehber"],
 ["Haberler","/haberler"]
];

export function Header({back=false}:{back?:boolean}){
 const[open,setOpen]=useState(false);
 return <header className="site-header">
  <div className="topbar">
   <a className="brand" href="/" aria-label="KonutSeyir ana sayfa"><span><Building2 size={20}/></span><span>Konut<b>Seyir</b></span></a>
   <button className="menu-button" type="button" aria-label={open?"Menüyü kapat":"Menüyü aç"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
   <nav className={open?"open":""} aria-label="Ana menü">{navItems.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
   <a className="header-cta" href="/ev-analizi">Konutunu analiz et <ArrowUpRight size={16}/></a>
  </div>
  {back&&<div className="backbar"><button className="header-back" type="button" onClick={()=>{if(history.length>1)history.back();else location.assign('/')}}><ArrowLeft size={18}/> Geri</button></div>}
 </header>
}

export function Footer(){return <footer className="site-footer">
 <div className="footer-main">
  <div className="footer-intro">
   <a className="brand footer-brand" href="/"><span><Building2 size={18}/></span><span>Konut<b>Seyir</b></span></a>
   <p>Konut fiyatını değil, yatırım mantığını ölçen bağımsız karar destek platformu.</p>
   <a className="footer-email" href="mailto:iletisim@konutseyir.com">iletisim@konutseyir.com</a>
  </div>
  <div className="footer-nav">
   <div><strong>Hesap Araçları</strong><a href="/ev-analizi">Konut yatırım analizi</a><a href="/hesaplama/kira-carpani">Kira çarpanı</a><a href="/hesaplama/net-kira">Net kira getirisi</a><a href="/hesaplama/kira-artis-orani">Kira artış oranı</a><a href="/hesaplama/tapu-harci">Tapu harcı</a><a href="/hesaplama/emlak-komisyonu">Emlakçı komisyonu</a><a href="/kredi-hesaplama">Konut kredisi</a></div>
   <div><strong>Araştırma</strong><a href="/karsilastir">Konut · mevduat · altın</a><a href="/hesaplama/altin-bazli-konut">Konutun altın karşılığı</a><a href="/sehirler">Şehir konut verileri</a><a href="/kontrol-listesi">Alım kontrol listesi</a><a href="/resmi-kontroller">Resmî kontroller</a><a href="/rehber">Konut rehberleri</a><a href="/haberler">Emlak gündemi</a></div>
   <div><strong>KonutSeyir</strong><a href="/hakkimizda">Hakkımızda</a><a href="/veri">Veri kaynakları</a><a href="/yayin-ilkeleri">Yayın ilkeleri</a><a href="/iletisim">İletişim</a><a href="/gizlilik">Gizlilik</a><a href="/cerez-politikasi">Çerez politikası</a><a href="/kullanim-kosullari">Kullanım koşulları</a></div>
  </div>
 </div>
 <div className="network-strip">
  <div><strong>konutseyir.com</strong><a href="https://altinseyir.com/" target="_blank" rel="noopener noreferrer">altinseyir.com <ArrowUpRight size={14}/></a></div>
  <p>KonutSeyir ve AltınSeyir aynı bağımsız yayın ağı tarafından sunulur. KonutSeyir konut maliyeti, kira ve yatırım karşılaştırmalarına; AltınSeyir altın verileri ve hesaplamalarına odaklanır.</p>
 </div>
 <div className="footer-bottom"><small>© 2026 KonutSeyir</small><nav aria-label="Alt bağlantılar"><a href="/yayin-ilkeleri">Hesaplama yöntemi</a><a href="/veri">Veri kaynakları</a><a href="/gizlilik">Gizlilik</a><a href="/cerez-politikasi">Çerezler</a><a href="/kullanim-kosullari">Kullanım koşulları</a></nav><span>Yatırım tavsiyesi değildir.</span></div>
 </footer>}