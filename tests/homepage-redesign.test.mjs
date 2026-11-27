import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

test('homepage surfaces recent illustrated articles before user pathways and offers an explicit push opt-in',()=>{
  const html=readFileSync('dist/index.html','utf8');
  const pushComponent=readFileSync('components/push-signup.tsx','utf8');
  const home=readFileSync('app/page.tsx','utf8');
  const liveData=readFileSync('components/live-data.tsx','utf8');
  const articles=html.indexOf('id="latest-articles-title"');
  const notifications=html.indexOf('id="home-push-title"');
  const pathways=html.indexOf('id="home-user-paths-title"');
  assert.ok(articles>=0&&articles<notifications&&notifications<pathways,'homepage content order');
  assert.match(html,/class="home-hero-image"[^>]*src="\/images\/articles\/housing-market\.jpg"/);
  assert.equal([...home.matchAll(/className="home-path-image"/g)].length,3,'three user decision cards have imagery');
  assert.match(home,/className="home-renewal-image"[^>]*src="\/images\/articles\/housing-market\.jpg"/);
  assert.match(home,/className="home-sales-radar-image"[^>]*src="\/images\/articles\/housing-market\.jpg"/);
  assert.match(home,/TÜRKİYE KONUT SATIŞ RADARI/);
  assert.match(liveData,/className="news-card-image"/);
  assert.match(liveData,/function newsImageFor\(item:any,index:number\)/);
  const css=readFileSync('src/style.css','utf8');
  assert.match(css,/\.home-page>\.home-hero::before/);
  assert.match(css,/\.home-page>\.home-hero \.home-hero-image/);
  assert.match(css,/\.home-path-image/);
  assert.match(css,/\.home-renewal-image/);
  assert.match(css,/\.news-card-image/);
  assert.match(css,/\.home-sales-radar-image/);
  assert.match(html,/Ücretsiz ve üyeliksiz başlayın/);
  assert.match(html,/Kaynağı ve veri dönemini görün/);
  assert.match(html,/Varsayımları siz belirleyin/);
  assert.match(html,/Yeni makale yayımlandığında bildirim almak/);
  assert.match(html,/iPhone:<\/b> Safari’de Paylaş/);
  assert.match(html,/Android:<\/b>/);
  assert.match(pushComponent,/>Bildirimleri aç<\/button>/);
  assert.match(pushComponent,/Notification\.requestPermission\(\)/);
  assert.match(pushComponent,/isIOS&&!isInstalled/);
  assert.match(pushComponent,/Safari’den Ana Ekrana Ekle/);
  const articleGrid=html.slice(articles,notifications);
  assert.equal([...articleGrid.matchAll(/class="latest-article-image"/g)].length,3);
  assert.equal([...articleGrid.matchAll(/class="latest-article-read"/g)].length,3);
  for(const image of ['home-documents.jpg','housing-budget.jpg','housing-market.jpg']){
    assert.ok(existsSync(`dist/images/articles/${image}`),image);
  }
  for(const [,image] of articleGrid.matchAll(/src="(\/images\/articles\/[^\"]+)"/g))assert.ok(existsSync(`dist${image}`),`${image}: rendered article image missing`);
  assert.equal([...articleGrid.matchAll(/src="\/images\/articles\//g)].length,3);
  assert.match(articleGrid,/alt="Konut/);
});
