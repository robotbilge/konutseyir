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
verify('logo altında finansal karar desteği',footer.includes('header-brand-tagline') && footer.includes('Kamu Verileriyle Karar Destek Platformu') && home.includes('<Header/>') && !footer.includes('tagline&&'));
verify('ana sayfada ilçe liste bileşeni kaldırılmış',!home.includes('<DistrictSalesRanking'));
verify('ana sayfada önceki dönem uyarısı yok',!home.includes('İlçe verisi 2026-08'));
verify('rehberler buton görünümünde',home.includes('reading-action-buttons')&&css.includes('.reading-action-buttons a'));
verify('hero sonrası üç kullanıcı avantajı görünür',home.includes('className="value-strip home-value-strip inner"')&&home.includes('Ücretsiz ve üyeliksiz başlayın')&&home.includes('Kaynağı ve veri dönemini görün')&&home.includes('Varsayımları siz belirleyin')&&css.includes('.home-value-strip'));
verify('son makaleler ve web push ana sayfada öne çıkar',home.includes('<LatestArticles/>')&&home.includes('<PushSignup variant="home"/>')&&home.includes('Ana ekrana nasıl eklerim?'));
verify('ana sayfa hero bölümünde görsel arka plan var',home.includes('className="home-hero-image"')&&css.includes(".home-page>.home-hero .home-hero-image")&&home.includes('src="/images/articles/housing-market.jpg"')&&css.includes('.home-page>.home-hero::before'));
const liveData = readFileSync('components/live-data.tsx','utf8');
verify('üç kullanıcı yolunda konuyla ilgili görseller var',[...home.matchAll(/className="home-path-image"/g)].length===3&&css.includes('.home-path-image'));
verify('Kentsel Dönüşüm alanı görsel ve vurgulu',home.includes('className="home-renewal-image"')&&css.includes('.home-renewal-image')&&css.includes('.home-renewal{border:1px solid #b5d3c2'));
verify('Konut satış radarı görsel ve vurgulu',home.includes('TÜRKİYE KONUT SATIŞ RADARI')&&home.includes('className="home-sales-radar-image"')&&css.includes('.home-sales-radar-image')&&css.includes('.home-sales-radar.home-sales-radar-compact>div>p:not(.eyebrow)'));
verify('son gelişmeler kartlarında tematik görseller var',liveData.includes('className="news-card-image"')&&liveData.includes('function newsImageFor')&&liveData.includes('housing-budget.jpg')&&css.includes('.news-card-image'));
verify('footer alan adı bağlantısı',footer.includes('href="https://konutseyir.com/" aria-label="KonutSeyir ana sayfası">konutseyir.com</a>'));
if (!local){
  if(!apiOnly){
  const page = await fetch(base+'/',{signal:AbortSignal.timeout(15000)}).then(r=>{if(!r.ok)throw Error('Homepage HTTP '+r.status);return r.text()});
  verify('canlı logo altında finansal karar desteği',page.includes('Kamu Verileriyle Karar Destek Platformu')&&page.includes('header-brand-tagline'));
  verify('canlı ana sayfada görsel hero arka planı var',page.includes('home-hero-image')&&page.includes('/images/articles/housing-market.jpg'));
  verify('canlı kullanıcı avantajları, makaleler ve bildirim paneli görünür',page.includes('Ücretsiz ve üyeliksiz başlayın')&&page.includes('Kaynağı ve veri dönemini görün')&&page.includes('Varsayımları siz belirleyin')&&page.includes('Konut gündemindeki son yazılar')&&page.includes('Tüm makaleler')&&page.includes('KonutSeyir’i ana ekranınıza ekleyin.')&&page.includes('Ana ekrana nasıl eklerim?')&&(page.match(/class="latest-article-image"/g)||[]).length===3);
  verify('canlı ana sayfada eski ilçe uyarısı yok',!page.includes('İlçe verisi 2026-08'));
  verify('canlı footer alan adı bağlantısı',/<a[^>]+href="https:\/\/konutseyir\.com\/"[^>]*>konutseyir\.com<\/a>/.test(page));
  }
  if(pagesOnly){
    for(const path of ['/rehber/','/ev-analizi/','/sehirler/ankara/']){
      const response=await fetch(base+path,{signal:AbortSignal.timeout(15000)});
      verify(path+' logo altında finansal karar desteği',response.ok&&/<span class="header-brand-tagline">Kamu Verileriyle Karar Destek Platformu<\/span>/.test(await response.text()));
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
