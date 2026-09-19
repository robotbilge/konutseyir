import test from 'node:test';
import assert from 'node:assert/strict';
import {parseNewsRSS} from '../worker/news.mjs';

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
