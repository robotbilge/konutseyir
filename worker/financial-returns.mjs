const instruments=[
 {id:'deposit',label:'Mevduat faizi (brüt)',patterns:[/mevduat/i,/deposit/i]},
 {id:'bist100',label:'BIST 100',patterns:[/bist\s*[- ]?100/i,/borsa.*100/i,/stock exchange/i]},
 {id:'gold',label:'Külçe altın',patterns:[/külçe altın/i,/altın.*külçe/i,/gold.*bullion/i,/bullion/i]},
 {id:'usd',label:'Amerikan doları',patterns:[/amerikan doları/i,/abd doları/i,/us dollar/i,/\bdollar\b/i]},
 {id:'eur',label:'Euro',patterns:[/\beuro\b/i]},
 {id:'dibs',label:'Devlet iç borçlanma senetleri (DİBS)',patterns:[/dibs/i,/devlet iç borçlanma/i,/government domestic debt/i,/gdds/i]}
];
const horizons=[
 {id:'1m',label:'1 ay',patterns:[/monthly/i,/aylık/i]},
 {id:'3m',label:'3 ay',patterns:[/quarterly/i,/three.?month/i,/üç aylık/i,/3 aylık/i]},
 {id:'6m',label:'6 ay',patterns:[/semi.?annual/i,/six.?month/i,/altı aylık/i,/6 aylık/i]},
 {id:'12m',label:'1 yıl',patterns:[/\bannual\b/i,/\byearly\b/i,/yıllık/i]}
];
// Official CSV dimension codes from the TÜİK dataflow export. Unknown codes
// are rejected instead of being interpreted by position or guessed.
const instrumentCodes={F_MF:'deposit',F_BIST:'bist100',F_ALTIN:'gold',F_ADOL:'usd',F_EURO:'eur',F_DIBS:'dibs'};
const horizonCodes={M:'1m',Q:'3m',S:'6m',A:'12m'};
const returnCodes={1:{kind:'nominal',deflator:'all'},2:{kind:'real',deflator:'ppi'},3:{kind:'real',deflator:'cpi'}};
function csvRows(text){
 const lines=String(text).replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean);
 if(lines.length<2)throw new Error('empty_tuik_csv');
 const split=line=>{const cells=[];let value='',quoted=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(quoted&&line[i+1]==='"'){value+='"';i++}else quoted=!quoted}else if(c===','&&!quoted){cells.push(value);value=''}else value+=c}cells.push(value);return cells};
 const header=split(lines[0]).map(x=>x.trim().toUpperCase());
 return lines.slice(1).map(line=>{const cells=split(line);return Object.fromEntries(header.map((key,i)=>[key,(cells[i]||'').trim()]))});
}
function classify(row){
 const values=Object.entries(row).filter(([key])=>key!=='OBS_VALUE'&&key!=='TIME_PERIOD').map(([key,value])=>key+' '+value).join(' ');
 const text=values.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const instrument=instruments.find(item=>item.id===instrumentCodes[row.INDICATOR])||instruments.find(item=>item.patterns.some(pattern=>pattern.test(values)))||instruments.find(item=>item.patterns.some(pattern=>pattern.test(text)));
 // Yearly average is a distinct TÜİK metric, not the trailing 12-month return.
 if(row.DONEM==='YO'||/yearly average|annual average|ortalama yillik|yillik ortalama/i.test(text))return {instrument,horizon:null,deflator:null,kind:null};
 const horizon=horizons.find(item=>item.id===horizonCodes[row.DONEM])||horizons.find(item=>item.patterns.some(pattern=>pattern.test(values)))||horizons.find(item=>item.patterns.some(pattern=>pattern.test(text)));
 const codedReturn=returnCodes[row.GETIRI];
 const deflator=codedReturn?.deflator&&codedReturn.deflator!=='all'?codedReturn.deflator:/CPI|TÜFE|consumer price|tufe/i.test(values)?'cpi':/D.?PPI|Yİ.?ÜFE|domestic producer|yi-ufe/i.test(values)?'ppi':/cpi|tufe/i.test(text)?'cpi':/d.?ppi|yi-ufe/i.test(text)?'ppi':null;
 const real=/real profit|reel getiri|real return/i.test(values)||/real profit|reel getiri|real return/i.test(text);
 const nominal=/nominal profit|nominal getiri|nominal return/i.test(values)||/nominal profit|nominal getiri|nominal return/i.test(text);
 return {instrument,horizon,deflator,kind:codedReturn?.kind||(real?'real':nominal?'nominal':null)};
}
function expectedKeys(){const result=[];for(const instrument of instruments)for(const horizon of horizons){result.push(`${instrument.id}|${horizon.id}|nominal|all`);for(const deflator of ['cpi','ppi'])result.push(`${instrument.id}|${horizon.id}|real|${deflator}`)}return result}
export function parseFinancialReturnsCsv(csv,retrievedAt=new Date().toISOString()){
 const rows=csvRows(csv);
 if(!rows[0]||!('TIME_PERIOD'in rows[0])||!('OBS_VALUE'in rows[0]))throw new Error('tuik_schema_changed');
 const parsed=[];
 for(const row of rows){
  const {instrument,horizon,deflator,kind}=classify(row);
  if(!instrument||!horizon||!kind)continue;
  if(kind==='real'&&!deflator)continue;
  const value=Number(String(row.OBS_VALUE).replace(',','.'));
  if(!Number.isFinite(value)||!/^\d{4}-\d{2}$/.test(row.TIME_PERIOD||''))continue;
  parsed.push({period:row.TIME_PERIOD,instrument:instrument.id,instrumentLabel:instrument.label,horizon:horizon.id,horizonLabel:horizon.label,deflator:kind==='real'?deflator:'all',kind,value,retrievedAt});
 }
 if(!parsed.length)throw new Error('tuik_return_rows_unrecognized');
 const latest=parsed.reduce((value,row)=>row.period>value?row.period:value,'');
 const recent=parsed.filter(row=>row.period===latest);
 const keys=new Set(recent.map(row=>row.instrument+'|'+row.horizon+'|'+row.kind+'|'+row.deflator));
 const missing=expectedKeys().filter(key=>!keys.has(key));
 if(missing.length||keys.size!==recent.length)throw new Error('tuik_return_data_incomplete');
 return recent.sort((a,b)=>a.instrument.localeCompare(b.instrument)||a.horizon.localeCompare(b.horizon)||a.kind.localeCompare(b.kind)||a.deflator.localeCompare(b.deflator));
}
export function calculateInvestmentAmount(amount,returnPercent){
 const principal=Number(amount),rate=Number(returnPercent);
 if(!Number.isFinite(principal)||principal<=0||!Number.isFinite(rate)||rate<=-100)throw new Error('invalid_financial_input');
 return {change:principal*rate/100,endingAmount:principal*(1+rate/100)};
}
const q=value=>"'"+String(value).replaceAll("'","''")+"'";
export function financialReturnsSql(rows){
 return rows.map(row=>'INSERT INTO financial_returns(period,instrument,horizon,deflator,kind,value,retrieved_at) VALUES('+[q(row.period),q(row.instrument),q(row.horizon),q(row.deflator),q(row.kind),row.value,q(row.retrievedAt)].join(',')+') ON CONFLICT(period,instrument,horizon,deflator,kind) DO UPDATE SET value=excluded.value,retrieved_at=excluded.retrieved_at;').join('\n');
}
export const financialReturnCatalog={instruments,horizons};
