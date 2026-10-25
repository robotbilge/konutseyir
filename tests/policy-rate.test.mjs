import test from 'node:test';
import assert from 'node:assert/strict';
import {parsePolicyRate,policyRefreshDue,refreshPolicyRate,policyStorageSeries} from '../worker/policy-rate.mjs';
import {observation,parseEVDS} from '../worker/data.mjs';
const row=(date,value)=>`<tr><td>${date}</td><td>-</td><td>${value}</td></tr>`;
const table=rows=>`<table><tr><td>Tarih</td><td>Borç Alma</td><td>Borç Verme</td></tr>${rows}</table>`;
const now=Date.parse('2026-10-25T10:00:00Z');
test('repo parser selects latest effective date independently of row order and excludes future dates',()=>{
 assert.deepEqual(parsePolicyRate(table(row('23.10.2026','36,00')+row('23.01.2026','37.00')+row('10.12.2026','35')),now),{series:policyStorageSeries,period:'2026-10-23',value:36});
});
test('repo parser rejects changed markup, invalid dates, missing, infinite and implausible rates',()=>{
 for(const html of ['<html>unavailable</html>',table(row('31.02.2026','36')),table(row('23.10.2026','')),table(row('23.10.2026','Infinity')),table(row('23.10.2026','101'))])assert.throws(()=>parsePolicyRate(html,now));
 assert.equal(parsePolicyRate(table(row('23.10.2026','0')),now).value,0);
});
test('daily EVDS policy dates are not collapsed to start of month',()=>{
 assert.equal(parseEVDS({items:[{Tarih:'23-10-2026',TP_TEST:'36'}]},'TP.TEST','policy')[0].period,'2026-10-23');
});
test('unchanged policy remains current when recently checked; stale checks and failed fetches are explicit',()=>{
 const rows=[{period:'2026-01-23',value:37,retrieved_at:'2026-10-25T09:00:00Z'}];
 assert.equal(observation('policy',rows,{state:'available'},now).status,'available');
 assert.equal(observation('policy',rows,{state:'error'},now).status,'cached');
 assert.equal(observation('policy',[{...rows[0],retrieved_at:'2026-10-21T09:00:00Z'}],{state:'available'},now).status,'stale');
});
test('on-demand refresh throttles successes for six hours and failures for one hour',()=>{
 assert.equal(policyRefreshDue(null,now),true);
 assert.equal(policyRefreshDue({state:'available',attempted_at:'2026-10-25T05:00:00Z'},now),false);
 assert.equal(policyRefreshDue({state:'available',attempted_at:'2026-10-25T04:00:00Z'},now),true);
 assert.equal(policyRefreshDue({state:'error',attempted_at:'2026-10-25T09:30:00Z'},now),false);
 assert.equal(policyRefreshDue({state:'error',attempted_at:'2026-10-25T09:00:00Z'},now),true);
});
test('refresh persists only validated official values and preserves last successful value on failure',async()=>{
 const writes=[],states=[],deps={fetchText:async()=>table(row('23.10.2026','36')),save:async(_,rows)=>writes.push(...rows),status:async(_,series,state)=>states.push({series,state})};
 assert.equal(await refreshPolicyRate({},deps),true);
 assert.equal(writes[0].value,36);
 assert.equal(states.at(-1).state,'available');
 for(const fetchText of [async()=>'<html>error</html>',async()=>{throw Error('timeout')}]){
 assert.equal(await refreshPolicyRate({},{...deps,fetchText}),false);
 assert.equal(writes.length,1);assert.equal(states.at(-1).state,'error');
 }
});
