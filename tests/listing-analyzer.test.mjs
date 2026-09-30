import test from 'node:test';
import assert from 'node:assert/strict';
import {getProvider,parseListingData,analyzeListing,valuation,parseJsonLd} from '../worker/listing-analyzer.mjs';

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
