export const definitions={usd:{label:'ABD doları satış kuru',unit:'TL',source:'TCMB',url:'https://www.tcmb.gov.tr/kurlar/today.xml',maxDays:7},eur:{label:'Euro satış kuru',unit:'TL',source:'TCMB',url:'https://www.tcmb.gov.tr/kurlar/today.xml',maxDays:7},cpi:{label:'TÜFE endeksi',unit:'endeks',source:'TÜİK / TCMB EVDS',url:'https://evds3.tcmb.gov.tr/',maxDays:75},housing:{label:'Konut Fiyat Endeksi · Türkiye',unit:'endeks',source:'TCMB EVDS',url:'https://evds3.tcmb.gov.tr/',maxDays:90},deposit:{label:'3 aya kadar vadeli TL mevduat faizi',unit:'%',source:'TCMB EVDS',url:'https://evds3.tcmb.gov.tr/',maxDays:21}};
export const cityHousingSeries={
 istanbul:{code:'TP.KFE.TR10',region:'İstanbul'},
 ankara:{code:'TP.KFE.TR51',region:'Ankara'},
 izmir:{code:'TP.KFE.TR31',region:'İzmir'},
 adana:{code:'TP.KFE.TR62',region:'Adana ve Mersin'},
 antalya:{code:'TP.KFE.TR61',region:'Antalya, Burdur ve Isparta'},
 bursa:{code:'TP.KFE.TR41',region:'Bursa, Eskişehir ve Bilecik'},
 kocaeli:{code:'TP.KFE.TR42',region:'Kocaeli, Sakarya, Düzce, Bolu ve Yalova'},
 konya:{code:'TP.KFE.TR52',region:'Konya ve Karaman'},
 gaziantep:{code:'TP.KFE.TRC1',region:'Gaziantep, Adıyaman ve Kilis'},
 trabzon:{code:'TP.KFE.TR90',region:'Trabzon, Ordu, Giresun, Rize, Artvin ve Gümüşhane'}
};
export function parseFX(xml){const date=xml.match(/Tarih="(\d{2})\.(\d{2})\.(\d{4})"/);if(!date)throw Error('TCMB tarih alanı bulunamadı');const period=`${date[3]}-${date[2]}-${date[1]}`;return ['USD','EUR'].map(code=>{const block=xml.match(new RegExp(`<Currency\\b[^>]*CurrencyCode="${code}"[\\s\\S]*?<\\/Currency>`))?.[0];const value=Number(block?.match(/<ForexSelling>([\d.]+)<\/ForexSelling>/)?.[1]),unit=Number(block?.match(/<Unit>(\d+)<\/Unit>/)?.[1]);if(!(value>0)||!(unit>0))throw Error('TCMB kur formatı tanınmadı');return {series:code.toLowerCase(),period,value:value/unit}})}
function evdsPeriod(value,monthly=true){const text=String(value||'').trim();let m=text.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);if(m)return `${m[1]}-${m[2].padStart(2,'0')}-${monthly?'01':(m[3]||'1').padStart(2,'0')}`;m=text.match(/^(\d{1,2})[-.](\d{1,2})[-.](\d{4})$/);return m?`${m[3]}-${m[2].padStart(2,'0')}-${monthly?'01':m[1].padStart(2,'0')}`:null}
export function parseEVDS(payload,code,series){if(!Array.isArray(payload.items))throw Error('EVDS yanıtı tanınmadı');const key=code.replaceAll('.','_');return payload.items.flatMap(row=>{const period=evdsPeriod(row.Tarih,series!=='deposit');const raw=row[key];if(!period||raw==null||raw==='')return [];const value=Number(String(raw).replace(',','.'));if(!Number.isFinite(value))return [];return [{series,period,value}]})}
export function yearChange(rows){if(!rows.length)return null;const sorted=[...rows].sort((a,b)=>a.period.localeCompare(b.period)),last=sorted.at(-1),prior=`${Number(last.period.slice(0,4))-1}${last.period.slice(4)}`,base=sorted.find(r=>r.period===prior);return base&&base.value>0?(last.value/base.value-1)*100:null}
export function observation(series,rows,status,now=Date.now()){const d=definitions[series],last=[...rows].sort((a,b)=>a.period.localeCompare(b.period)).at(-1);return {...d,series,value:last?.value??null,period:last?.period??null,retrievedAt:last?.retrieved_at??null,status:!last?(status?.state||'unavailable'):now-Date.parse(last.period)>d.maxDays*86400000?'stale':status?.state==='error'?'cached':'available',annualChange:series==='cpi'||series==='housing'?yearChange(rows):null,lastAttempt:status?.attempted_at??null}}
