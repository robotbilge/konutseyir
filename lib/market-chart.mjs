const periodKey=value=>String(value||'').slice(0,7);
const change=(value,base)=>Number.isFinite(value)&&Number.isFinite(base)&&base>0?(value/base-1)*100:null;

export function marketChart(history){
 const clean=(Array.isArray(history)?history:[])
  .map(item=>({period:periodKey(item?.period),value:Number(item?.value)}))
  .filter(item=>/^\d{4}-\d{2}$/.test(item.period)&&Number.isFinite(item.value)&&item.value>0&&item.period>='2024-01')
  .sort((a,b)=>a.period.localeCompare(b.period));
 const unique=[...new Map(clean.map(item=>[item.period,item])).values()],byPeriod=new Map(unique.map(item=>[item.period,item.value])),baseline=unique[0];
 const items=unique.map(item=>{
  const [year,month]=item.period.split('-').map(Number),previousDate=new Date(Date.UTC(year,month-2,1)),previous=byPeriod.get(`${previousDate.getUTCFullYear()}-${String(previousDate.getUTCMonth()+1).padStart(2,'0')}`),yearAgo=byPeriod.get(`${year-1}-${String(month).padStart(2,'0')}`);
  return {...item,monthlyChange:change(item.value,previous),annualChange:change(item.value,yearAgo),sinceBaseline:change(item.value,baseline?.value)};
 });
 const values=items.map(item=>item.value),min=Math.min(...values),max=Math.max(...values);
 return {items,baseline:items[0]??null,latest:items.at(-1)??null,min:Number.isFinite(min)?min:null,max:Number.isFinite(max)?max:null};
}
