import test from 'node:test';import assert from 'node:assert/strict';
import {listingSummary,listingRequestBody} from '../lib/listing-summary.mjs';
import {monthlyRefreshDue} from '../worker/market-refresh.mjs';
import {observation} from '../worker/data.mjs';
test('listing own-input calculations work without TCMB data and preserve net/gross basis',()=>{
 const r=listingSummary({price:5000000,netArea:100,grossArea:125,monthlyRent:30000});assert.equal(r.ready,true);assert.equal(r.netM2Price,50000);assert.equal(r.grossM2Price,40000);assert.equal(r.rent.annualRent,360000);assert.ok(Math.abs(r.rent.grossYield-7.2)<1e-10);assert.ok(Math.abs(r.rent.multiplierYears-13.8888888889)<1e-8);
 assert.equal(listingSummary({price:5000000,netArea:100}).grossM2Price,null);
});
test('listing summary clears invalid, blank, zero, negative and excessive inputs',()=>{
 assert.equal(listingSummary({}).ready,false);
 for(const price of ['',0,-1,NaN,Infinity,1e13,'bad'])assert.equal(listingSummary({price,netArea:100}).ready,false);
 assert.equal(listingSummary({price:1,netArea:0.1}).ready,true);
 assert.equal(listingSummary({price:5000000,netArea:130,grossArea:125}).ready,false);
 assert.equal(listingSummary({price:5000000,netArea:100,monthlyRent:-1}).ready,false);
 assert.equal(listingSummary({price:5000000,netArea:1000000}).ready,false);
});
test('CPI demand refresh retries missed daily jobs without polling upstream on every view',()=>{
 const now=Date.parse('2026-10-27T12:00:00Z');assert.equal(monthlyRefreshDue(null,now),true);assert.equal(monthlyRefreshDue({state:'available',attempted_at:'2026-10-27T07:00:00Z'},now),false);assert.equal(monthlyRefreshDue({state:'available',attempted_at:'2026-10-27T06:00:00Z'},now),true);assert.equal(monthlyRefreshDue({state:'error',attempted_at:'2026-10-27T11:00:00Z'},now),true);assert.equal(monthlyRefreshDue({state:'error',attempted_at:'2026-10-27T11:30:00Z'},now),false);
});
test('CPI annual change uses previous year same month and never fabricates a missing base',()=>{
 const rows=[{period:'2026-09-01',value:137.23,retrieved_at:'2026-10-27T10:00:00Z'},{period:'2025-09-01',value:105.78}];const result=observation('cpi',rows,{state:'available'},Date.parse('2026-10-27'));assert.equal(result.status,'available');assert.equal(result.annualChange.toFixed(2),'29.73');assert.equal(observation('cpi',rows.slice(0,1),{state:'available'}).annualChange,null);assert.equal(observation('cpi',rows,{state:'error'},Date.parse('2026-10-27')).status,'cached');
});
import worker from '../worker/index.mjs';
test('market API refreshes missed CPI observations and reuses them on the next view',async()=>{
 const observations=new Map([['cpi',[{period:'2025-09-01',value:100,retrieved_at:'2026-10-01T00:00:00Z'}]]]),states=new Map([['cpi',{state:'available',attempted_at:'2020-01-01'}],['policy:repo:v1',{state:'available',attempted_at:new Date().toISOString()}]]);
 const db={prepare(sql){return {args:[],bind(...args){this.args=args;return this},async first(){return states.get(this.args[0])||null},async all(){return {results:observations.get(this.args[0])||[]}},async run(){if(sql.includes('source_status'))states.set(this.args[0],{state:this.args[1],attempted_at:this.args[2]});return {success:true}}}},async batch(statements){for(const statement of statements){const [series,period,value,retrieved_at]=statement.args;const rows=observations.get(series)||[];observations.set(series,[...rows.filter(r=>r.period!==period),{period,value,retrieved_at}])}return []}};
 const original=globalThis.fetch;let calls=0;globalThis.fetch=async()=>{calls++;return Response.json({items:[{Tarih:'2026-09',TP_TEST_CPI:'129.73'},{Tarih:'2025-09',TP_TEST_CPI:'100'}]})};
 try{for(let n=0;n<2;n++){const response=await worker.fetch(new Request('https://test/api/market-data'),{DB:db,TCMB_EVDS_API_KEY:'test-only',EVDS_CPI_SERIES:'TP.TEST.CPI'});const j=await response.json(),cpi=j.data.find(x=>x.series==='cpi');assert.equal(cpi.period,'2026-09-01');assert.equal(cpi.annualChange.toFixed(2),'29.73');assert.equal(cpi.status,'available')}assert.equal(calls,1)}finally{globalThis.fetch=original}
});

test('importing another listing does not send the previous listing fields as overrides',()=>{const form={city:'İstanbul',price:5000000,netArea:100,grossArea:125,monthlyRent:30000};assert.deepEqual(listingRequestBody(form,{url:'https://www.hepsiemlak.com/example',extractOnly:true,listingFetched:true}),{url:'https://www.hepsiemlak.com/example',extractOnly:true});const body=listingRequestBody(form,{url:'https://www.hepsiemlak.com/example',listingFetched:true});assert.equal(body.url,'');assert.equal(body.price,5000000);assert.equal(body.city,'İstanbul');});
