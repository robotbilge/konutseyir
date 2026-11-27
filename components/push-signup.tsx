import {useEffect,useState} from 'react';
import {Bell,BellOff} from 'lucide-react';

const decodeKey=(value:string)=>{
 const padding='='.repeat((4-value.length%4)%4);
 const raw=atob((value+padding).replace(/-/g,'+').replace(/_/g,'/'));
 return Uint8Array.from([...raw].map(char=>char.charCodeAt(0)));
};

async function saveSubscription(subscription:PushSubscription){
 const response=await fetch('/api/push/subscribe',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(subscription)
 });
 if(!response.ok)throw Error('Push subscription could not be saved');
}

export function PushSignup({variant='default'}:{variant?:'default'|'home'}={}){
 const[state,setState]=useState<'loading'|'ready'|'active'|'unsupported'|'install-required'|'unconfigured'|'denied'|'error'>('loading');
 const[publicKey,setKey]=useState('');
 const[busy,setBusy]=useState(false);

 useEffect(()=>{
  const isIOS=/iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isInstalled=window.matchMedia('(display-mode: standalone)').matches||(navigator as Navigator&{standalone?:boolean}).standalone===true;
  if(isIOS&&!isInstalled){setState('install-required');return}
  if(!('serviceWorker'in navigator)||!('PushManager'in window)||!('Notification'in window)){
   setState('unsupported');
   return;
  }
  async function initialize(){
   const response=await fetch('/api/push/config');
   if(!response.ok)throw Error('Push configuration could not be loaded');
   const config=await response.json();
   if(!config.configured||!config.publicKey){setState('unconfigured');return}
   setKey(config.publicKey);
   if(Notification.permission==='denied'){setState('denied');return}
   const registration=await navigator.serviceWorker.register('/sw.js');
   const subscription=await registration.pushManager.getSubscription();
   if(subscription&&Notification.permission==='granted'){
    await saveSubscription(subscription);
    setState('active');
   }else setState('ready');
  }
  initialize().catch(()=>setState('error'));
 },[]);

 async function enable(){
  setBusy(true);
  try{
   const permission=await Notification.requestPermission();
   if(permission!=='granted'){setState(permission==='denied'?'denied':'ready');return}
   const registration=await navigator.serviceWorker.ready;
   const existing=await registration.pushManager.getSubscription();
   const subscription=existing??await registration.pushManager.subscribe({
    userVisibleOnly:true,
    applicationServerKey:decodeKey(publicKey)
   });
   await saveSubscription(subscription);
   setState('active');
  }catch{setState('error')}
  finally{setBusy(false)}
 }

 async function disable(){
  setBusy(true);
  try{
   const registration=await navigator.serviceWorker.ready;
   const subscription=await registration.pushManager.getSubscription();
   if(subscription){
    await subscription.unsubscribe();
    const response=await fetch('/api/push/subscribe',{
     method:'DELETE',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({endpoint:subscription.endpoint})
    });
    if(!response.ok)throw Error('Push subscription could not be removed');
   }
   setState('ready');
  }catch{setState('error')}
  finally{setBusy(false)}
 }

 const variantClass=variant==='home'?' push-box-home':'';
 if(state==='loading')return <div className={'push-box'+variantClass} role="status"><Bell/><p>Bildirim durumu kontrol ediliyor…</p></div>;
 if(state==='unsupported')return <div className={'push-box'+variantClass} role="status"><BellOff/><p>Bu tarayıcı Web Push bildirimini desteklemiyor.</p></div>;
 if(state==='install-required')return <div className={'push-box'+variantClass} role="status"><BellOff/><p>iPhone veya iPad’de bildirimleri açmak için önce Safari’den Ana Ekrana Ekle’yi seçin, KonutSeyir’i ana ekrandan açın ve burada tekrar deneyin.</p></div>;
 if(state==='unconfigured')return <div className={'push-box'+variantClass} role="status"><BellOff/><p>Bildirim servisi şu anda kullanılamıyor.</p></div>;
 return <div className={'push-box'+variantClass}>
  <Bell/>
  <div>
   <b>{variant==='home'?'Bildirimleri kendi isteğinizle açın':'Emlak haberleri ve yeni makaleler cihazınıza gelsin'}</b>
   <p>{variant==='home'?'Ana ekrana ekledikten sonra izin verin; yalnızca izin verdiğinizde bildirim gönderilir.':'Yeni emlak haberleri ve özgün konut makaleleri için bildirim gönderilir. İstediğiniz zaman kapatabilirsiniz.'}</p>
   {state==='denied'&&<small>Tarayıcı bildirim iznini engelledi. Site ayarlarından izin vermeniz gerekir.</small>}
   {state==='error'&&<small>Bildirim işlemi tamamlanamadı. {publicKey?'Tekrar deneyin.':'Sayfayı yenileyip tekrar deneyin.'}</small>}
  </div>
  {state==='active'
   ?<button onClick={disable} disabled={busy}>Bildirimleri kapat</button>
   :<button onClick={enable} disabled={busy||state==='denied'||!publicKey}>Bildirimleri aç</button>}
 </div>;
}
