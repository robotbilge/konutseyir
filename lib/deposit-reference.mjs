export function depositReference(items,days){
 const series=days>=1&&days<=31?'deposit1m':days<=91&&days>=32?'deposit':null;
 if(!series)return null;
 const item=items.find(x=>x.series===series);
 return item?.status==='available'&&Number.isFinite(item.value)&&item.value>=0&&item.value<=100&&/^\d{4}-\d{2}-\d{2}$/.test(item.period||'')?item:null;
}
