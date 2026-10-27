import test from 'node:test';import assert from 'node:assert/strict';
import {goldTransferUrl,readGoldTransfer,formatWholeLira} from '../lib/gold-transfer.mjs';
import {depositReference} from '../lib/deposit-reference.mjs';
test('gold amount transfers in fragment with legacy aliases and no financial query data',()=>{
 for(const qty of [0,321,1250.5,1000000]){const u=new URL(goldTransferUrl('gram',qty));assert.equal(u.pathname,'/altindan-konuta');assert.equal(u.search,'?source=konutseyir');const q=new URLSearchParams(u.hash.slice(1));assert.equal(Number(q.get('gold_quantity')),qty);assert.equal(q.get('gold_type'),'gram');assert.equal(Number(q.get('quantity')),qty)}
 for(const qty of [-1,Infinity,1000001,NaN])assert.equal(goldTransferUrl('gram',qty),null);
});
test('incoming query and fragment preserve pure grams and multi-million TL snapshot without the former one-million TL cap',()=>{
 const input=readGoldTransfer('?source=altinseyir','#asset=ceyrek&quantity=1000&pure_gram=1606.5&gram_ref_try=7000.45&gold_value_try=11246222.93&price_at=2026-10-27');
 assert.equal(input.pureGrams,1606.5);assert.equal(input.value,11246222.93);assert.equal(input.reference,7000.45);
 assert.equal(readGoldTransfer('?source=altinseyir&pure_gram=5&gold_value_try=40000').reference,8000);
 assert.equal(readGoldTransfer('?source=other&pure_gram=100'),null);
 assert.equal(readGoldTransfer('?source=altinseyir&pure_gram=-5').pureGrams,null);
});
test('reference price is a Turkish grouped integer with no decimals',()=>{assert.equal(formatWholeLira(6789.67),'6.790');assert.equal(formatWholeLira(6789.12),'6.789');assert.equal(formatWholeLira(NaN),'0')});
test('deposit auto reference selects correct term and rejects unavailable or stale rates',()=>{
 const items=[{series:'deposit',status:'available',value:43.22,period:'2026-10-16'},{series:'deposit1m',status:'available',value:42.74,period:'2026-10-16'}];
 assert.equal(depositReference(items,31).value,42.74);assert.equal(depositReference(items,32).value,43.22);assert.equal(depositReference(items,91).value,43.22);
 for(const days of [0,-1,92,NaN])assert.equal(depositReference(items,days),null);
 assert.equal(depositReference([{...items[0],status:'stale'}],32),null);assert.equal(depositReference([{...items[0],value:NaN}],32),null);assert.equal(depositReference([],32),null);
});
import worker from '../worker/index.mjs';
test('district API exposes stale periods and last import instead of presenting them as current',async()=>{
 const db={prepare(sql){return {bind(){return this},async all(){return {results:[{districtName:'Örnek',period:'2026-08',total:20,retrievedAt:'2026-09-18T08:00:00Z'}]}},async first(){return {period:'2026-09'}}}}};
 const r=await worker.fetch(new Request('https://test/api/district-sales?city=istanbul'),{DB:db});const j=await r.json();assert.equal(j.status,'stale');assert.equal(j.latestCityPeriod,'2026-09');assert.equal(j.retrievedAt,'2026-09-18T08:00:00Z');
});
