import test from 'node:test';
import assert from 'node:assert/strict';
import {getProvider,parseListingData,analyzeListing,valuation,parseJsonLd,parseListingPage,fetchListing} from '../worker/listing-analyzer.mjs';

test('only HTTPS listing pages on supported hosts are accepted',()=>{
 assert.equal(getProvider('https://www.sahibinden.com/ilan/emlak-konut-satilik-ev-123'), 'sahibinden');
 assert.equal(getProvider('https://hepsiemlak.com/istanbul-kadikoy-satilik-daire-123'), 'hepsiemlak');
 assert.equal(getProvider('https://www.emlakjet.com/satilik-daire/istanbul-kadikoy/ilan-123'), 'emlakjet');
 assert.equal(getProvider('http://sahibinden.com/ilan/x'), null);
 assert.equal(getProvider('https://evil-sahibinden.com/ilan/x'), null);
 assert.equal(getProvider('https://sahibinden.com.evil.test/ilan/x'), null);
 assert.equal(getProvider('https://sahibinden.com:8443/ilan/x'), null);
});

test('listing numbers are normalized and net area is preferred',()=>{
 const listing=parseListingData({price:'6.500.000 TL',netArea:'95 m²',grossArea:'110 m²',city:' İstanbul '});
 assert.equal(listing.price,6500000);
 assert.equal(listing.area,95);
 assert.equal(listing.grossArea,110);
 assert.equal(listing.city,'İstanbul');
});

test('valuation boundaries match the published thresholds',()=>{
 assert.equal(valuation(899.99,1000).label,'Fırsat / Çok ucuz');
 assert.equal(valuation(900,1000).label,'Avantajlı / Ucuz');
 assert.equal(valuation(949.99,1000).label,'Avantajlı / Ucuz');
 assert.equal(valuation(950,1000).label,'Piyasa değerinde / Normal');
 assert.equal(valuation(1050,1000).label,'Piyasa değerinde / Normal');
 assert.equal(valuation(1050.01,1000).label,'Pahalı');
 assert.equal(valuation(1150,1000).label,'Pahalı');
 assert.equal(valuation(1150.01,1000).label,'Çok şişirilmiş / Aşırı pahalı');
 assert.equal(valuation(1000,0),null);
});

test('analysis with missing provider index stays unclassified',()=>{
 const result=analyzeListing({price:'6.500.000',netArea:'100 m²',monthlyRent:'30.000 TL'});
 assert.equal(result.currentM2,65000);
 assert.equal(result.valuation,null);
 assert.equal(result.status,'reference_missing');
 assert.equal(result.grossPaybackYears,6500000/360000);
});

test('JSON-LD listing metadata yields price, area and location',()=>{
 const html='<script type="application/ld+json">{"@type":"Product","name":"Daire","offers":{"price":"6500000"},"floorSize":{"@type":"QuantitativeValue","value":"100"},"address":{"addressRegion":"İstanbul","addressLocality":"Kadıköy"}}</script>';
 const result=parseJsonLd(html);
 assert.equal(result.price,6500000);
 assert.equal(result.area,100);
 assert.equal(result.city,'İstanbul');
 assert.equal(result.district,'Kadıköy');
});

test('Hepsiemlak page text extracts price, both area types, rent and URL location',()=>{
 const html='<html><head><meta property="product:price:amount" content="11950000"></head><body><h1>Satılık Daire</h1><div>11.950.000 TL</div><section>Brüt / Net M2 70 m2 / 55 m2</section><div>Kira Getirisi 60.000 TL</div></body></html>';
 const result=parseListingPage(html,'https://www.hepsiemlak.com/istanbul-kadikoy-erenkoy-satilik/daire/138068-1245');
 assert.equal(result.price,11950000);
 assert.equal(result.netArea,55);
 assert.equal(result.grossArea,70);
 assert.equal(result.city,'İstanbul');
 assert.equal(result.district,'Kadıköy');
 assert.equal(result.neighborhood,'Erenköy');
 assert.equal(result.monthlyRent,60000);
});


test('listing fetch follows only same-provider redirects and returns safe metadata',async()=>{
 const responses=[
  new Response(null,{status:302,headers:{location:'https://www.hepsiemlak.com/istanbul-sisli-satilik/daire/1'}}),
  new Response('<html><body>10.250.000 TL Brüt 120 m2 Net 100 m2</body></html>',{status:200,headers:{'content-type':'text/html; charset=utf-8'}})
 ];
 const result=await fetchListing('https://www.hepsiemlak.com/istanbul-sisli-satilik/daire/1',{fetchImpl:async()=>responses.shift()});
 assert.match(result.html,/10\.250\.000/);
 assert.equal(result.meta.status,200);
 assert.equal(result.meta.redirects,1);
});

test('listing fetch distinguishes access denial and rejects cross-provider redirects',async()=>{
 await assert.rejects(
  ()=>fetchListing('https://www.hepsiemlak.com/istanbul-sisli-satilik/daire/1',{fetchImpl:async()=>new Response('Forbidden',{status:403,headers:{'content-type':'text/html'}})}),
  error=>error.code==='upstream_access_denied'&&error.details.status===403
 );
 await assert.rejects(
  ()=>fetchListing('https://www.hepsiemlak.com/istanbul-sisli-satilik/daire/1',{fetchImpl:async()=>new Response(null,{status:302,headers:{location:'https://evil.example/ilan'}})}),
  error=>error.code==='invalid_redirect'
 );
});
