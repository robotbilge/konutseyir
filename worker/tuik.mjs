export const cityCodes={TR100:'istanbul',TR510:'ankara',TR310:'izmir',TR621:'adana',TR611:'antalya',TR411:'bursa',TR421:'kocaeli',TR521:'konya',TRC11:'gaziantep',TR901:'trabzon'};

function csvLine(line){
 const values=[];let value='',quoted=false;
 for(let i=0;i<line.length;i++){const char=line[i];if(char==='"'){if(quoted&&line[i+1]==='"'){value+='"';i++}else quoted=!quoted}else if(char===','&&!quoted){values.push(value);value=''}else value+=char}
 values.push(value);return values;
}

export function parseTuikSales(csv,retrievedAt=new Date().toISOString()){
 const lines=String(csv).replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean);if(lines.length<2)throw Error('TÜİK CSV boş');
 const header=csvLine(lines[0]),required=['SATIS_TURU','REF_AREA','KONUT_ISYERI_SAHP','INDICATOR','TIME_PERIOD','OBS_VALUE'];
 if(required.some(key=>!header.includes(key)))throw Error('TÜİK CSV sütunları değişti');
 const grouped=new Map();
 for(const line of lines.slice(1)){const values=csvLine(line),row=Object.fromEntries(header.map((key,index)=>[key,values[index]??''])),slug=cityCodes[row.REF_AREA];if(!slug||row.INDICATOR!=='MII_KSS'||row.KONUT_ISYERI_SAHP!=='2'||!/^\d{4}-\d{2}$/.test(row.TIME_PERIOD))continue;const value=Number(row.OBS_VALUE);if(!Number.isInteger(value)||value<0)continue;const key=`${slug}|${row.TIME_PERIOD}`,item=grouped.get(key)||{citySlug:slug,period:row.TIME_PERIOD,total:null,mortgaged:null,firstSale:null,secondHand:null,retrievedAt};if(row.SATIS_TURU==='_T')item.total=value;if(row.SATIS_TURU==='1')item.mortgaged=value;if(row.SATIS_TURU==='2')item.firstSale=value;if(row.SATIS_TURU==='3')item.secondHand=value;grouped.set(key,item)}
 const rows=[...grouped.values()].filter(row=>[row.total,row.mortgaged,row.firstSale,row.secondHand].every(Number.isInteger));
 if(!rows.length)throw Error('TÜİK CSV içinde doğrulanmış il satışı yok');
 for(const row of rows)if(row.firstSale+row.secondHand!==row.total)throw Error(`TÜİK toplam kontrolü başarısız: ${row.citySlug} ${row.period}`);
 return rows.sort((a,b)=>a.period.localeCompare(b.period)||a.citySlug.localeCompare(b.citySlug));
}

export function salesSql(rows){
 const q=value=>`'${String(value).replaceAll("'","''")}'`;
 return ['BEGIN TRANSACTION;',...rows.map(row=>`INSERT INTO city_sales(city_slug,period,total,mortgaged,first_sale,second_hand,retrieved_at) VALUES(${q(row.citySlug)},${q(row.period)},${row.total},${row.mortgaged},${row.firstSale},${row.secondHand},${q(row.retrievedAt)}) ON CONFLICT(city_slug,period) DO UPDATE SET total=excluded.total,mortgaged=excluded.mortgaged,first_sale=excluded.first_sale,second_hand=excluded.second_hand,retrieved_at=excluded.retrieved_at;`),'COMMIT;'].join('\n');
}
