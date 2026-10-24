import test from 'node:test';
import assert from 'node:assert/strict';
import {rentMetrics} from '../worker/tcmb-listing.mjs';

test('TCMB monthly unit rent produces annual gross yield and amortization',()=>{
 const actual=rentMetrics(250,100,5000000);
 assert.equal(actual.monthlyGrossRent,25000);
 assert.equal(actual.annualGrossYieldPercent,6);
 assert.ok(Math.abs(actual.paybackYears-16.6666666667)<0.001);
});
test('TCMB missing unit rent never produces fabricated estimates',()=>{
 assert.equal(rentMetrics(null,100,5000000),null);
 assert.equal(rentMetrics(250,0,5000000),null);
 assert.equal(rentMetrics(250,100,0),null);
});
