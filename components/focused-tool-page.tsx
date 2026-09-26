import {Header,Footer} from './site-chrome';

export const focusedTools=[
 {href:'/hesaplama/kira-carpani',label:'Kira çarpanı'},
 {href:'/hesaplama/net-kira',label:'Net kira'},
 {href:'/hesaplama/metrekare',label:'Metrekare'},
 {href:'/hesaplama/reel-getiri',label:'Reel getiri'},
 {href:'/hesaplama/alim-maliyeti',label:'Alım maliyeti'},
 {href:'/hesaplama/tapu-harci',label:'Tapu harcı'},
 {href:'/hesaplama/emlak-komisyonu',label:'Emlak komisyonu'},
 {href:'/hesaplama/kira-artis-orani',label:'Kira artışı'},
 {href:'/hesaplama/altin-bazli-konut',label:'Altın / konut'},
 {href:'/hesaplama/hisseli-tapu',label:'Hisseli tapu'}
];

export function FocusedToolPage({active,eyebrow,title,description,children}:{active:string,eyebrow:string,title:string,description:string,children:React.ReactNode}){return <><Header back/><main className="inner focused-tool-page"><div className="page-title"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div><nav className="tool-jumps" aria-label="Konut hesaplama araçları">{focusedTools.map(tool=><a className={tool.href===active?'active':''} aria-current={tool.href===active?'page':undefined} href={tool.href} key={tool.href}>{tool.label}</a>)}</nav>{children}<p className="tool-next"><a href="/ev-analizi">Tüm verileri tek analizde birleştir →</a></p></main><Footer/></>}
