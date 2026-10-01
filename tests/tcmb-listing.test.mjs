import test from 'node:test';
import assert from 'node:assert/strict';
import {validateListingInput,differencePercent,rentMetrics,parseQuarterlyObservations,resolveProvinceSeries,calculateTcmc,validateQuarterlyMetadata,readEvdsJson} from '../worker/tcmb-listing.mjs';

test('listing input requires positive price, area, province and explicit net/gross type',()=>{
 assert.deepEqual(validateListingInput({price:'0',area:'-2',city:'',areaType:'unknown'}).missing,['city','price','area','areaType']);
 assert.deepEqual(validateListingInput({price:'6.500.000 TL',area:'100 m²',city:'İstanbul',areaType:'net'}).missing,[]);
 assert.deepEqual(validateListingInput({price:'1',area:'1',city:'İstanbul',areaType:'net',monthlyRent:'0'}).missing,['monthlyRent']);
});
test('percent difference is relative to official provincial unit-price indicator',()=>{
 assert.equal(differencePercent(120000,100000),20);
 assert.equal(differencePercent(80000,100000),-20);
 assert.equal(differencePercent(1,0),null);
});
test('gross monthly rent, annual yield and simple payback use monthly unit rent',()=>{
 assert.deepEqual(rentMetrics(300,100,6000000),{monthlyGrossRent:30000,annualGrossYieldPercent:6,paybackYears:16.666666666666668});
 assert.equal(rentMetrics(300,100,6000000).monthlyGrossRent,30000);
 assert.equal(rentMetrics(0,100,6000000),null);
});
test('quarterly EVDS rows parse Turkish numbers and never fill missing province values',()=>{
 const rows=parseQuarterlyObservations({items:[{Tarih:'2026-2Ç',TP_BK_ISTANBUL:'442,57'},{Tarih:'2026-1Ç',TP_BK_ISTANBUL:''}]},'TP_BK_ISTANBUL','rent:istanbul');
 assert.equal(rows.length,2);assert.equal(rows[0].period,'2026-04-01');assert.equal(rows[0].displayPeriod,'2026-Q2');assert.equal(rows[0].value,442.57);assert.equal(rows[1].value,null);
 const decimalRows=parseQuarterlyObservations({items:[{Tarih:'2026-2Ç',TP_BK_ISTANBUL:'442.57'}]},'TP_BK_ISTANBUL','rent:istanbul');assert.equal(decimalRows[0].value,442.57);
});
test('official EVDS series catalogue resolves province series and quarterly metadata without inventing an absent unit field',()=>{
 const match=resolveProvinceSeries({items:[{SERIE_CODE:'VERIFIED_BY_EVDS_CATALOG',SERIE_NAME:'İstanbul Konut Birim Fiyatları',FREQUENCY_STR:'Üç Aylık',METADATA_LINK:'https://evds3.tcmb.gov.tr/tumSeriler/2003/bie_birimfiyat'}]},'İstanbul','price');
 assert.equal(match.code,'VERIFIED_BY_EVDS_CATALOG');
 assert.equal(match.unit,'TL/m²');
 assert.match(match.unitSourceUrl,/bie_birimfiyat/);
 assert.equal(resolveProvinceSeries({items:[{SERIE_CODE:'VERIFIED_TURKEY_SERIES',SERIE_NAME:'Türkiye Konut Birim Fiyatları',FREQUENCY_STR:'Üç Aylık'}]},'İstanbul','price'),null);
 assert.throws(()=>resolveProvinceSeries({items:[{SERIE_CODE:'WRONG_FREQUENCY',SERIE_NAME:'İstanbul Konut Birim Fiyatları',FREQUENCY_STR:'Aylık'}]},'İstanbul','price'),{message:'metadata_mismatch'});
});
test('quarterly rent metadata uses verified monthly unit basis from TCMB methodology',()=>{
 const match=resolveProvinceSeries({items:[{SERIE_CODE:'VERIFIED_RENT_SERIES',SERIE_NAME:'Değerlemesi Yapılan Konutların Birim Kiraları İstanbul',FREQUENCY_STR:'Üç Aylık'}]},'İstanbul','rent');
 assert.equal(match.unit,'TL/m²/ay');
 assert.ok(match.methodologyUrl.includes('tcmb.gov.tr'));
 assert.equal(validateQuarterlyMetadata({...match,frequency:'Çeyreklik'},'rent'),true);
 assert.throws(()=>validateQuarterlyMetadata({...match,frequency:'Aylık'},'rent'),{message:'metadata_mismatch'});
});
test('missing TCMB data returns the required unavailable message without estimated values',()=>{
 const result=calculateTcmc({price:5000000,area:100,city:'İstanbul',areaType:'gross'},{housePrice:null,rent:{value:300}});
 assert.equal(result.status,'no_data');assert.match(result.message,/karşılaştırılabilir TCMB verisi bulunamadı/);assert.equal(result.rent,null);
});
test('EVDS API failures are controlled and the API key is sent only in a server-side header',async()=>{
 await assert.rejects(()=>readEvdsJson(async(_url,options)=>{assert.equal(options.headers.key,'server-only');return {ok:false,status:503,json:async()=>({})}},'https://evds3.tcmb.gov.tr/private-series','server-only'),{message:'tcmb_unavailable'});
 await assert.rejects(()=>readEvdsJson(async()=>({ok:true,json:async()=>({unexpected:true})}),'https://evds3.tcmb.gov.tr/private-series',''),{message:'tcmb_not_configured'});
});

test('20 percent and larger absolute differences raise a review warning without a price verdict',()=>{
 const result=calculateTcmc({price:12000000,area:100,city:'İstanbul',areaType:'net',thresholdPercent:20},{housePrice:{value:100000,period:'2026-Q2'},rent:null});
 assert.equal(result.comparison.differencePercent,20);assert.equal(result.comparison.provinceUnitPriceM2,100000);assert.equal(result.comparison.reviewRecommended,true);assert.equal(result.rent,null);assert.equal(result.userRent,null);
});
