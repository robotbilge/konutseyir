import test from 'node:test';
import assert from 'node:assert/strict';
import {marketChart} from '../lib/market-chart.mjs';

test('şehir grafiği aylık, yıllık ve 2024 başlangıç değişimini ayrı hesaplar',()=>{
 const result=marketChart([
  {period:'2023-12-01',value:90},
  {period:'2024-01-01',value:100},
  {period:'2024-02-01',value:110},
  {period:'2025-01-01',value:125},
  {period:'2025-02-01',value:132},
 ]);
 assert.equal(result.items.length,4);
 assert.equal(result.baseline.period,'2024-01');
 assert.equal(result.items[1].monthlyChange.toFixed(2),'10.00');
 assert.equal(result.items[2].annualChange.toFixed(2),'25.00');
 assert.equal(result.latest.sinceBaseline.toFixed(2),'32.00');
});

test('şehir grafiği eksik karşılaştırma döneminde oran uydurmaz',()=>{
 const result=marketChart([{period:'2024-09-01',value:150},{period:'2025-10-01',value:180}]);
 assert.equal(result.latest.annualChange,null);
 assert.equal(result.latest.monthlyChange,null);
 assert.equal(result.latest.sinceBaseline.toFixed(2),'20.00');
});
