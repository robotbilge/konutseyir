import {useEffect,useState} from 'react';

declare global{
 interface Window{ksEnableAnalytics?:()=>void}
}

const key='ks_analytics_consent';

export function AnalyticsConsent(){
 const[visible,setVisible]=useState(false);
 useEffect(()=>{try{setVisible(!localStorage.getItem(key))}catch{setVisible(true)}},[]);
 function choose(value:'granted'|'denied'){
  try{localStorage.setItem(key,value)}catch{}
  if(value==='granted')window.ksEnableAnalytics?.();
  setVisible(false);
 }
 if(!visible)return null;
 return <aside className="analytics-consent" role="dialog" aria-label="Ziyaret ölçümü tercihi" aria-live="polite">
  <div><b>Ziyaret ölçümü tercihi</b><p>Siteyi geliştirmek için Google Analytics ile anonimleştirilmiş kullanım istatistikleri toplamak istiyoruz. Reddederseniz Analytics yüklenmez.</p><a href="/cerez-politikasi">Ayrıntılar</a></div>
  <div className="analytics-consent-actions"><button type="button" className="secondary" onClick={()=>choose('denied')}>Reddet</button><button type="button" onClick={()=>choose('granted')}>Kabul et</button></div>
 </aside>
}
