import test from 'node:test';
import assert from 'node:assert/strict';
import {isRelevantNews,newsFeeds,parseNewsRSS} from '../worker/news.mjs';

test('news feed keeps only relevant metadata from the approved source',async()=>{
 const xml=`<rss><channel>
 <item><title><![CDATA[Konut kredilerinde yeni dönem]]></title><link><![CDATA[https://www.emlakhaberi.com/konut-kredisi]]></link><description><![CDATA[<b>Kısa</b> emlak özeti]]></description><category>Konut</category><pubDate>Fri, 18 Sep 2026 10:00:00 +0300</pubDate></item>
 <item><title>Spor haberi</title><link>https://www.emlakhaberi.com/spor</link><description>Maç sonucu</description><pubDate>Fri, 18 Sep 2026 10:00:00 +0300</pubDate></item>
 <item><title>Konut haberi</title><link>https://example.com/kopya</link><description>Emlak</description><pubDate>Fri, 18 Sep 2026 10:00:00 +0300</pubDate></item>
 </channel></rss>`;
 const rows=await parseNewsRSS(xml);
 assert.equal(rows.length,1);
 assert.equal(rows[0].title,'Konut kredilerinde yeni dönem');
 assert.equal(rows[0].summary,'Kısa emlak özeti');
 assert.equal(rows[0].sourceName,'Emlak Haberleri');
 assert.equal(rows[0].sourceUrl,'https://www.emlakhaberi.com/konut-kredisi');
 assert.match(rows[0].slug,/^konut-kredilerinde-yeni-donem-/);
});

test('Turkish word boundaries do not classify aşarsa as arsa',()=>{
 assert.equal(isRelevantNews({title:'Motorin 100 TL’yi aşarsa zam gelebilir',summary:'Akaryakıt gündemi',category:'Ekonomi'}),false);
 assert.equal(isRelevantNews({title:'Arsa satışlarında yeni dönem',summary:'Tapu işlemleri',category:'Emlak'}),true);
});

test('Bloomberg HT feed accepts only housing-related articles from its own host',async()=>{
 const source=newsFeeds.find(x=>x.id==='bloomberght');
 const xml=`<rss><channel>
 <item><title>Konut kredisi faizleri güncellendi</title><link>https://www.bloomberght.com/konut-kredisi?utm_source=rss</link><description>Bankaların yeni oranları</description><pubDate>Sun, 20 Sep 2026 18:00:00 +0300</pubDate></item>
 <item><title>Petrol fiyatı yükseldi</title><link>https://www.bloomberght.com/petrol</link><description>Enerji piyasası</description><pubDate>Sun, 20 Sep 2026 18:00:00 +0300</pubDate></item>
 </channel></rss>`;
 const rows=await parseNewsRSS(xml,source);
 assert.equal(rows.length,1);
 assert.equal(rows[0].sourceName,'Bloomberg HT');
 assert.equal(rows[0].sourceUrl,'https://www.bloomberght.com/konut-kredisi');
 assert.equal(rows[0].imageUrl,null);
});

test('curated emlak feed can retain relevant category items without keyword repetition',async()=>{
 const source=newsFeeds.find(x=>x.id==='sozcu-emlak');
 const xml=`<rss><channel><item><title>Yeni düzenleme yürürlükte</title><link>https://www.sozcu.com.tr/yeni-duzenleme-p1</link><description>Başvuru koşulları açıklandı</description><pubDate>Sun, 20 Sep 2026 18:00:00 +0300</pubDate></item></channel></rss>`;
 const rows=await parseNewsRSS(xml,source);
 assert.equal(rows.length,1);
 assert.equal(rows[0].category,'Emlak');
});
