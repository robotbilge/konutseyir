import {test} from 'node:test';
import assert from 'node:assert/strict';
import {adminNewsRequest} from '../worker/admin-news.mjs';
function database({items=[{slug:'h1',title:'Test'}],changes=1}={}){return {prepare(sql){return {bind(...args){return {first:async()=>sql.includes('COUNT(*)')?{count:items.length}:null,all:async()=>({results:items}),run:async()=>({meta:{changes}})}}}}}}
const request=(method='GET',password='pass',url='https://konutseyir.com/api/admin/news')=>new Request(url,{method,headers:{'X-Admin-Password':password,'CF-Connecting-IP':'127.0.0.1'}});
test('admin news API fails closed when password is not configured',async()=>{const response=await adminNewsRequest(request(),{DB:database()});assert.equal(response.status,503)});
test('admin news API rejects a wrong password',async()=>{const response=await adminNewsRequest(request('GET','wrong'),{DB:database(),NEWS_ADMIN_PASSWORD:'pass'});assert.equal(response.status,401);assert.equal((await response.json()).error,'invalid_password')});
test('admin news API lists all stored items after password validation',async()=>{const response=await adminNewsRequest(request(),{DB:database({items:[{slug:'one'},{slug:'two'}]}),NEWS_ADMIN_PASSWORD:'pass'});assert.equal(response.status,200);assert.equal((await response.json()).items.length,2)});
test('admin news API deletes by slug after password validation',async()=>{const response=await adminNewsRequest(request('DELETE','pass','https://konutseyir.com/api/admin/news/story-1'),{DB:database(),NEWS_ADMIN_PASSWORD:'pass'});assert.equal(response.status,200);assert.equal((await response.json()).deleted,1)});
