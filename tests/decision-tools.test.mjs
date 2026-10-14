import test from 'node:test';
import assert from 'node:assert/strict';
import {maximumBudget,netSale,paymentFor} from '../lib/decision-tools.mjs';

test('maximum budget covers zero and positive rates with down payment',()=>{
 assert.equal(maximumBudget(500000,0,0,10).budget,500000);
 assert.equal(maximumBudget(500000,10000,0,10).loan,1200000);
 const r=maximumBudget(500000,25000,30,10);assert.ok(r.loan>0);assert.equal(r.budget,r.loan+500000);assert.ok(Math.abs(paymentFor(r.loan,30,120)-25000)<1e-7);
});
test('maximum budget validates empty, negative, invalid and extreme inputs',()=>{
 for(const x of [['',1000,10,5],[null,1000,10,5],[-1,1000,10,5],[0,-1,10,5],[0,1000,101,5],[0,1000,10,51],[0,1000,10,0],[0,Infinity,10,5],[1_000_000_000_001,1000,10,5]])assert.throws(()=>maximumBudget(...x));
});
test('seller net proceeds subtract only user-entered amounts and allow a negative result',()=>{
 assert.deepEqual(netSale(5000000,1000000,100000,50000,20000,30000),{price:5000000,costs:1200000,net:3800000});
 assert.equal(netSale(100,101,0,0,0,0).net,-1);
 for(const x of [[-1,0,0,0,0,0],[0,0,0,0,0,0],[100,-1,0,0,0,0],[NaN,0,0,0,0,0]])assert.throws(()=>netSale(...x));
});
