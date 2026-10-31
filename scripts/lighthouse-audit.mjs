import {mkdir,readFile,appendFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const site=process.argv[2];
if(!['altinseyir','konutseyir'].includes(site))throw Error('Unknown site');
const paths=site==='altinseyir'?['/','/altin-maliyet-ortalamasi']:['/','/hesaplama/emlak-komisyonu/'];
const directory=`artifacts/lighthouse/${site}`;await mkdir(directory,{recursive:true});
const summaries=[];
for(const [index,path]of paths.entries())for(const device of ['mobile','desktop']){
 const output=`${directory}/${index}-${device}.json`,url=`https://${site}.com${path}`;
 const args=[url,'--quiet','--only-categories=performance,accessibility,best-practices,seo','--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage','--output=json',`--output-path=${output}`,'--max-wait-for-load=45000'];
 if(device==='desktop')args.push('--preset=desktop');
 const result=spawnSync('/tmp/seo-lighthouse/node_modules/.bin/lighthouse',args,{stdio:'inherit',timeout:180000});
 if(result.status!==0)throw Error(`Lighthouse failed for ${url} ${device}`);
 const report=JSON.parse(await readFile(output,'utf8'));if(report.runtimeError)throw Error(JSON.stringify(report.runtimeError));
 const scores=Object.fromEntries(Object.entries(report.categories).map(([k,v])=>[k,Math.round(v.score*100)]));
 const item={url,device,scores,LCP_ms:report.audits['largest-contentful-paint']?.numericValue,CLS:report.audits['cumulative-layout-shift']?.numericValue,TBT_ms:report.audits['total-blocking-time']?.numericValue,INP:'Field data required; not a lab interaction test',consoleErrors:report.audits['errors-in-console']?.details?.items||[],issues:Object.entries(report.audits).filter(([,v])=>v.score!==null&&v.score<1&&v.details).map(([id,v])=>({id,title:v.title,displayValue:v.displayValue})).slice(0,30)};
 summaries.push(item);console.log('LIGHTHOUSE_SUMMARY '+JSON.stringify(item));
}
if(process.env.GITHUB_STEP_SUMMARY){const rows=summaries.map(x=>`| ${x.url} | ${x.device} | ${x.scores.performance} | ${x.scores.accessibility} | ${x.scores.seo} | ${(x.LCP_ms/1000).toFixed(2)} s | ${x.CLS.toFixed(3)} |`).join('\n');await appendFile(process.env.GITHUB_STEP_SUMMARY,'| URL | Device | Performance | Accessibility | SEO | LCP | CLS |\n|---|---|---:|---:|---:|---:|---:|\n'+rows+'\n\nINP requires real-user field data. Lighthouse TBT is not INP.\n')}
