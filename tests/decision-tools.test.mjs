import test from 'node:test';
import assert from 'node:assert/strict';
import {buyRentScenario,comparableReference,maximumBudget,netSale,paymentFor} from '../lib/decision-tools.mjs';

test('maximum budget covers zero and positive rates with down payment',()=>{
 assert.equal(maximumBudget(500000,0,0,10).budget,500000);
 assert.equal(maximumBudget(500000,10000,0,10).loan,1200000);
 const r=maximumBudget(500000,25000,30,10);assert.ok(r.loan>0);assert.equal(r.budget,r.loan+500000);assert.ok(Math.abs(paymentFor(r.loan,30,120)-25000)<1e-7);
});
test('maximum budget validates empty, negative, invalid and extreme inputs',()=>{
 for(const x of [[-1,1000,10,5],[0,-1,10,5],[0,1000,101,5],[0,1000,10,51],[0,1000,10,0],[0,Infinity,10,5],[1_000_000_000_001,1000,10,5]])assert.throws(()=>maximumBudget(...x));
});
test('buy versus rent compares same duration, returns nominal and real values',()=>{
 const x=buyRentScenario({price:5000000,downPayment:1500000,annualRate:30,years:5,monthlyRent:25000,rentGrowth:20,buyCost:200000,annualMaintenance:30000,houseGrowth:15,inflation:25,investReturn:30,saleCostPct:2});
 assert.equal(x.months,60);assert.ok(x.monthlyPayment>0);assert.ok(x.rentTotal>0);assert.ok(x.ownerReal<x.ownerEquity);assert.ok(x.rentReal<x.alternativeCapital);assert.ok(Number.isFinite(x.ownerAdvantage));
});
test('buy versus rent rejects zero, empty, invalid and out-of-range inputs',()=>{
 const x={price:1000000,downPayment:0,annualRate:10,years:5,monthlyRent:0,rentGrowth:0,buyCost:0,annualMaintenance:0,houseGrowth:0,inflation:0,investReturn:0,saleCostPct:0};
 assert.ok(buyRentScenario(x).monthlyPayment>0);
 for(const patch of [{price:0},{price:1_000_000_000_001},{downPayment:1000001},{years:0},{annualRate:101},{houseGrowth:-91},{inflation:-1},{saleCostPct:101},{monthlyRent:NaN}])assert.throws(()=>buyRentScenario({...x,...patch}));
});
test('seller net proceeds subtract only user-entered amounts and allow a negative result',()=>{
 assert.deepEqual(netSale(5000000,1000000,100000,50000,20000,30000),{price:5000000,costs:1200000,net:3800000});
 assert.equal(netSale(100,101,0,0,0,0).net,-1);
 for(const x of [[-1,0,0,0,0,0],[0,0,0,0,0,0],[100,-1,0,0,0,0],[NaN,0,0,0,0,0]])assert.throws(()=>netSale(...x));
});
test('seller reference requires at least three valid user-entered comparables',()=>{
 assert.deepEqual(comparableReference(100,[{price:1000000,area:100},{price:0,area:0},{price:0,area:0}]),{status:'insufficient',count:1});
 const r=comparableReference(100,[{price:1000000,area:100},{price:1200000,area:100},{price:900000,area:100}]);assert.equal(r.status,'user-input');assert.equal(r.medianPerM2,10000);assert.equal(r.reference,1000000);assert.ok(r.low/100<=r.medianPerM2&&r.high/100>=r.medianPerM2);
 assert.throws(()=>comparableReference(0,[]));assert.throws(()=>comparableReference(100,[{price:-1,area:10}]));
});
