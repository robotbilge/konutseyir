import test from 'node:test';
import assert from 'node:assert/strict';
import {parseFinancialReturnsCsv,calculateInvestmentAmount,financialReturnsSql} from '../worker/financial-returns.mjs';

const header='INVESTMENT_INSTRUMENT_LABEL,PERIOD_LABEL,RETURN_TYPE_LABEL,INFLATION_INDEX_LABEL,TIME_PERIOD,OBS_VALUE';
function fixture(){
 const instruments=['Deposit interest (gross)','BIST 100 stock exchange','Gold (ingot bullion)','American dollar','Euro','Government domestic debt securities'];
 const periods=[['Monthly','1m'],['Quarterly','3m'],['Semi-annual','6m'],['Annual','12m']];
 const rows=[];
 for(const instrument of instruments)for(const [period] of periods){
  rows.push([instrument,period,'Nominal Profit','', '2026-08','2.5']);
  rows.push([instrument,period,'Real Profit (CPI)','CPI','2026-08','1.5']);
  rows.push([instrument,period,'Real Profit (D-PPI)','D-PPI','2026-08','1.2']);
 }
 return [header,...rows.map(row=>row.map(value=>`"${value}"`).join(','))].join('\n');
}

test('TÜİK export maps six instruments, four horizons and nominal/CPI/PPI returns',()=>{
 const rows=parseFinancialReturnsCsv(fixture(),'2026-10-02T00:00:00.000Z');
 assert.equal(rows.length,72);
 assert.equal(rows[0].period,'2026-08');
 assert.ok(rows.some(row=>row.instrument==='deposit'&&row.horizon==='1m'&&row.kind==='nominal'));
 assert.ok(rows.some(row=>row.instrument==='dibs'&&row.horizon==='12m'&&row.kind==='real'&&row.deflator==='cpi'));
 assert.ok(rows.every(row=>row.retrievedAt==='2026-10-02T00:00:00.000Z'));
});

test('official TÜİK dimension codes map to the 1, 3, 6 and 12 month categories',()=>{
 const header='DATAFLOW,FREQ,REF_AREA,INDICATOR,GETIRI,DONEM,DEGISIM,TIME_PERIOD,OBS_VALUE,OLCU_BIRIMI,UNIT_MULT,DECIMALS,TIME_FORMAT';
 const instruments=['F_MF','F_BIST','F_ALTIN','F_ADOL','F_EURO','F_DIBS'],horizons=['M','Q','S','A'],rows=[];
 for(const instrument of instruments)for(const period of horizons)for(const rate of ['1','2','3'])rows.push(`TR:DF_FINANSAL_YATIRIM_ARAC_REEL_GETIRI(1.0),M,TR,${instrument},${rate},${period},_Z,2026-08,2.5,,,`);
 const parsed=parseFinancialReturnsCsv([header,...rows].join('\n'));
 assert.equal(parsed.length,72);
 assert.ok(parsed.some(row=>row.instrument==='usd'&&row.horizon==='12m'&&row.kind==='nominal'));
 assert.ok(parsed.some(row=>row.instrument==='deposit'&&row.horizon==='3m'&&row.deflator==='ppi'));
 assert.ok(parsed.some(row=>row.instrument==='gold'&&row.horizon==='6m'&&row.deflator==='cpi'));
});

test('yearly average is not mislabeled as trailing one-year return',()=>{
 const csv=fixture(),average=csv.split('\n').find(line=>line.includes('"Annual"')).replace('"Annual"','"Yearly average"');
 const rows=parseFinancialReturnsCsv(`${csv}\n${average}`);
 assert.equal(rows.length,72);
 assert.ok(rows.some(row=>row.horizon==='12m'));
});

test('parser rejects missing series, changed schema and unknown instrument labels',()=>{
 assert.throws(()=>parseFinancialReturnsCsv(`${header}\n"Mystery","Monthly","Nominal Profit","","2026-08","1"`),/tuik_return_rows_unrecognized/);
 assert.throws(()=>parseFinancialReturnsCsv('DATE,VALUE\n2026-08,1'),/tuik_schema_changed/);
 assert.throws(()=>parseFinancialReturnsCsv(fixture().split('\n').slice(0,-1).join('\n')),/tuik_return_data_incomplete/);
});

test('amount calculation reports nominal and real terminal amount, and rejects invalid input',()=>{
 assert.deepEqual(calculateInvestmentAmount(100000,12.5),{change:12500,endingAmount:112500});
 assert.deepEqual(calculateInvestmentAmount(100000,-10),{change:-10000,endingAmount:90000});
 assert.throws(()=>calculateInvestmentAmount(0,3),/invalid_financial_input/);
 assert.throws(()=>calculateInvestmentAmount(100,-100),/invalid_financial_input/);
});

test('SQL output writes period-specific values with safe text quoting',()=>{
 const [row]=parseFinancialReturnsCsv(fixture());
 const sql=financialReturnsSql([row]);
 assert.match(sql,/INSERT INTO financial_returns/);
 assert.match(sql,/ON CONFLICT\(period,instrument,horizon,deflator,kind\)/);
});
