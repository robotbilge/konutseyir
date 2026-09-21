import {useState} from "react";
import {Building2, Menu, X, ArrowUpRight, ArrowLeft} from "lucide-react";

const navItems = [["Ev Analizi", "/ev-analizi"], ["Karşılaştır", "/karsilastir"], ["Şehirler", "/sehirler"], ["Haberler", "/haberler"], ["Kontrol Listesi", "/kontrol-listesi"], ["Rehber", "/rehber"], ["Veri", "/veri"]];

export function Header({back=false}:{back?:boolean}){
  const [open,setOpen]=useState(false);
  return <header className="site-header"><div className="topbar">
    {back&&<button className="header-back" type="button" aria-label="Önceki sayfaya dön" onClick={()=>{if(history.length>1)history.back();else location.assign('/')}}><ArrowLeft size={18}/><span>Geri</span></button>}
    <a className="brand" href="/" aria-label="KonutSeyir ana sayfa"><span><Building2 size={20}/></span><span>Konut<b>Seyir</b></span></a>
    <button className="menu-button" type="button" aria-label={open?"Menüyü kapat":"Menüyü aç"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
    <nav className={open?"open":""} aria-label="Ana menü">{navItems.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
    <a className="header-cta" href="/ev-analizi">Hemen hesapla <ArrowUpRight size={16}/></a>
  </div></header>
}

export function Footer(){return <footer className="site-footer"><div className="footer-main"><div><a className="brand footer-brand" href="/"><span><Building2 size={18}/></span><span>Konut<b>Seyir</b></span></a><p>Konut kararlarını kira, maliyet, enflasyon ve alternatif getirilerle birlikte değerlendirin.</p><a className="footer-email" href="mailto:iletisim@konutseyir.com">iletisim@konutseyir.com</a></div><div className="footer-nav"><div><strong>Araçlar</strong><a href="/ev-analizi">Ev analizi</a><a href="/kredi-hesaplama">Kredi hesaplama</a><a href="/karsilastir">Yatırım karşılaştırma</a><a href="/kontrol-listesi">Alım kontrol listesi</a></div><div><strong>Bilgi</strong><a href="/rehber">Rehberler</a><a href="/sehirler">Şehir sayfaları</a><a href="/resmi-kontroller">Resmî kontroller</a><a href="/veri">Veri kaynakları</a></div><div><strong>KonutSeyir</strong><a href="/hakkimizda">Hakkımızda</a><a href="/iletisim">İletişim</a><a href="/gizlilik">Gizlilik</a><a href="/cerez-politikasi">Çerez politikası</a><a href="/kullanim-kosullari">Kullanım koşulları</a></div></div></div><div className="footer-bottom"><small>© 2026 KonutSeyir</small><span>Bağımsız karar destek platformu · Yatırım tavsiyesi değildir.</span></div></footer>}
