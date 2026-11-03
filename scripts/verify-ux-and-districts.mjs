import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const local = process.argv.includes('--local');
const apiOnly = process.argv.includes('--api-only');
const pagesOnly = process.argv.includes('--pages-only');
const base = process.env.KONUTSEYIR_URL || 'https://konutseyir.com';
const checks = [];
const verify = (name, ok) => {checks.push({name, ok}); console.log((ok ? 'PASS ' : 'FAIL ')+name);};
const home = readFileSync('app/page.tsx','utf8');
const footer = readFileSync('components/site-chrome.tsx','utf8');
const css = readFileSync('src/style.css','utf8');
verify('logo altında finansal karar desteği',footer.includes('header-brand-tagline') && footer.includes('Kamu verileriyle finansal karar desteği') && home.includes('<Header/>') && !footer.includes('tagline&&'));
verify('ana sayfada ilçe liste bileşeni kaldırılmış',!home.includes('<DistrictSalesRanking'));
verify('ana sayfada önceki dönem uyarısı yok',!home.includes('İlçe verisi 2026-08'));
verify('rehberler buton görünümünde',home.includes('reading-action-buttons')&&css.includes('.reading-action-buttons a'));
verify('üç kullanıcı avantajı eski etiketin yerinde',home.includes('hero-proof hero-proof-top')&&home.includes('Hesaplamaya üyelik olmadan başlayın')&&home.includes('Verilerin hangi döneme ait olduğunu görün')&&home.includes('Hesaplama varsayımlarını kendiniz belirleyin')&&!home.includes('className="trust-label"')&&css.includes('.hero-proof-top'));
verify('footer alan adı bağlantısı',footer.includes('href="https://konutseyir.com/" aria-label="KonutSeyir ana sayfası">konutseyir.com</a>'));
if (!local){
  if(!apiOnly){
  const page = await fetch(base+'/',{signal:AbortSignal.timeout(15000)}).then(r=>{if(!r.ok)throw Error('Homepage HTTP '+r.status);return r.text()});
  verify('canlı logo altında finansal karar desteği',page.includes('Kamu verileriyle finansal karar desteği')&&page.includes('header-brand-tagline'));
  verify('canlı kullanıcı avantajları üst sırada',page.includes('hero-proof-top')&&page.includes('Hesaplamaya üyelik olmadan başlayın'));
  verify('canlı ana sayfada eski ilçe uyarısı yok',!page.includes('İlçe verisi 2026-08'));
  verify('canlı footer alan adı bağlantısı',/<a[^>]+href="https:\/\/konutseyir\.com\/"[^>]*>konutseyir\.com<\/a>/.test(page));
  }
  if(pagesOnly){
    for(const path of ['/rehber/','/ev-analizi/','/sehirler/ankara/']){
      const response=await fetch(base+path,{signal:AbortSignal.timeout(15000)});
      verify(path+' logo altında finansal karar desteği',response.ok&&/<span class="header-brand-tagline">Kamu verileriyle finansal karar desteği<\/span>/.test(await response.text()));
    }
  }
  if(!pagesOnly){
  const cities=['istanbul','ankara','izmir','adana','antalya','bursa','kocaeli','konya','gaziantep','trabzon','balikesir','mugla'];
  const coverage=[];
  for(const city of cities){
    try{
      const r=await fetch(base+'/api/district-sales?city='+city,{signal:AbortSignal.timeout(12000)});
      if(!r.ok)throw Error('HTTP '+r.status);
      const j=await r.json();
      const valid=Array.isArray(j.items)&&['available','stale','unavailable','error'].includes(j.status);
      verify(city+' ilçe API şeması',valid);
      coverage.push({city,status:j.status,period:j.period??null,count:j.items?.length??0,latestCityPeriod:j.latestCityPeriod??null});
    }catch(e){verify(city+' ilçe API erişimi: '+String(e.message),false);}
  }
  console.log('District coverage:',JSON.stringify(coverage));
  console.log('NOT: unavailable olan şehirlerde otomatik ilçe verisi uydurulmaz. Kaynak ve D1 aktarımı ayrıca doğrulanmalıdır.');
  }
}
assert.equal(checks.every(x=>x.ok),true,'Denetim başarısız: '+checks.filter(x=>!x.ok).map(x=>x.name).join(', '));
