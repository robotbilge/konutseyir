import {useEffect,useState} from 'react';
import {ArrowLeft,ExternalLink} from 'lucide-react';
import {Header,Footer} from '../../../components/site-chrome';
const date=(value:string)=>new Intl.DateTimeFormat('tr-TR',{dateStyle:'long',timeStyle:'short',timeZone:'Europe/Istanbul'}).format(new Date(value));
export default function NewsDetail(){
 const[item,setItem]=useState<any>(null),[error,setError]=useState('');
 useEffect(()=>{const slug=new URLSearchParams(location.search).get('slug');if(!slug){setError('Haber bağlantısı geçersiz.');return}fetch('/api/news/'+encodeURIComponent(slug)).then(async r=>{if(!r.ok)throw Error();return r.json()}).then(setItem).catch(()=>setError('Haber bulunamadı.'))},[]);
 return <><Header back/><main className="article news-detail ad-free-page" data-ad-free="true"><a className="back" href="/haberler"><ArrowLeft/> Haberlere dön</a>{error&&<p className="error">{error}</p>}{!item&&!error&&<p className="data-loading">Haber yükleniyor…</p>}{item&&<><p className="eyebrow">{item.category}</p><h1>{item.title}</h1><p className="news-meta">{date(item.publishedAt)} · Kaynak: {item.sourceName}</p>{item.imageUrl&&<img src={item.imageUrl} alt="" referrerPolicy="no-referrer"/>}<p className="lead">{item.summary}</p><aside><h2>Haberin tamamı kaynak sitededir</h2><p>KonutSeyir yalnız başlık, kısa özet, tarih ve kaynak bağlantısını saklar.</p><a href={item.sourceUrl} target="_blank" rel="noreferrer">Özgün haberi {item.sourceName} sitesinde aç <ExternalLink/></a></aside></>}</main><Footer/></>
}
