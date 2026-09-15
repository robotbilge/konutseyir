import {readFileSync,writeFileSync} from 'node:fs';
const id=process.env.CLOUDFLARE_D1_DATABASE_ID;
if(!/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(id||'')||id==='00000000-0000-0000-0000-000000000000')throw Error('CLOUDFLARE_D1_DATABASE_ID must be a real D1 database UUID.');
const config=JSON.parse(readFileSync('worker/wrangler.jsonc','utf8'));config.d1_databases[0].database_id=id;
for(const field of ['CPI','HOUSING','DEPOSIT'])config.vars[`EVDS_${field}_SERIES`]=process.env[`EVDS_${field}_SERIES`]||'';
writeFileSync('worker/wrangler.deploy.json',JSON.stringify(config,null,2));
