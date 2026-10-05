const norm = value => String(value ?? '').replace(/²/g,'2').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('tr-TR').replace(/ı/g,'i').replace(/[^a-z0-9]+/g,' ').trim();
const keyNames = {
 code:['SERIE_CODE','SERIES_CODE','SERIECODE','CODE','code'],
 name:['SERIE_NAME','SERIES_NAME','SERIE_NAME_EN','NAME','name','SERIE'],
 unit:['UNIT','UNIT_NAME','BIRIM','BIRIM_ADI','unit'],
 frequency:['FREQUENCY_STR','FREQUENCY','FREQUENCY_NAME','FREQ','FREQUENCY_NAME_TR','frequency'],
 note:['DESCRIPTION','EXPLANATION','NOTE','ACIKLAMA','description']
};
function field(row, keys) {
 for (const key of keys) if (row?.[key] != null && String(row[key]).trim()) return String(row[key]).trim();
 const wanted = new Set(keys.map(k => k.toLowerCase()));
 const entry = Object.entries(row || {}).find(([key,value]) => wanted.has(key.toLowerCase()) && value != null && String(value).trim());
 return entry ? String(entry[1]).trim() : '';
}
export async function readEvdsJson(fetcher,url,key) {
 if(!key)throw new Error('tcmb_not_configured');
 try {
  const response=await fetcher(url,{headers:{key,Accept:'application/json'},signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw new Error('tcmb_unavailable');
  const payload=await response.json();
  if(!payload||typeof payload!=='object')throw new Error('tcmb_format');
  return payload;
 } catch(error) {
  if(['tcmb_unavailable','tcmb_format'].includes(error?.message))throw error;
  throw new Error('tcmb_unavailable');
 }
}
export function asCatalogRows(payload) {
 if (Array.isArray(payload)) return payload;
 if (Array.isArray(payload?.items)) return payload.items;
 if (Array.isArray(payload?.data)) return payload.data;
 if (Array.isArray(payload?.result)) return payload.result;
 return [];
}
const officialUnits = {
 price:{
  unit:'TL/m²',
  areaBasis:'brüt kullanım alanı',
  sourceUrl:'https://evds3.tcmb.gov.tr/tumSeriler/2003/bie_birimfiyat',
  methodologyUrl:'https://www.tcmb.gov.tr/wps/wcm/connect/b4628fa9-11a7-4426-aee6-dae67fc56200/KFE-Metaveri.pdf?CACHEID=ROOTWORKSPACE-b4628fa9-11a7-4426-aee6-dae67fc56200-nwWPcfR&MOD=AJPERES'
 },
 rent:{
  unit:'TL/m²/ay',
  areaBasis:'brüt kullanım alanı',
   sourceUrl:'https://evds3.tcmb.gov.tr/charts/portlet/Njk5NDEzNTFjNjAxMWY0MDU2MDdmZjJm/tr',
  methodologyUrl:'https://www.tcmb.gov.tr/wps/wcm/connect/b4628fa9-11a7-4426-aee6-dae67fc56200/KFE-Metaveri.pdf?CACHEID=ROOTWORKSPACE-b4628fa9-11a7-4426-aee6-dae67fc56200-nwWPcfR&MOD=AJPERES'
 }
};
export function validateQuarterlyMetadata(meta, kind) {
 const unit = norm(meta?.unit || meta?.verifiedUnit);
 const frequency = norm(meta?.frequency);
 const hasLira = /tl|turk lirasi|lira/.test(unit);
 const hasSquareMeter = /m2|metrekare/.test(unit);
 const quarterly = /ceyrek|quarter|3 ay|uc aylik|3 month/.test(frequency);
 if (!meta?.code || !hasLira || !hasSquareMeter || !quarterly) throw new Error('metadata_mismatch');
 if (kind === 'rent') {
   const note = norm(meta.note);
   if (!/kira|rent/.test(norm(meta.name)) && !/kira|rent/.test(note)) throw new Error('metadata_mismatch');
   if (!/ay|month|monthly/.test(unit) && !/aylik|monthly/.test(note)) throw new Error('metadata_mismatch');
 }
 return true;
}
export function resolveProvinceSeries(payload, province, kind) {
 const expectedProvince = norm(province);
 const rows = asCatalogRows(payload).map(row => ({
   code:field(row,keyNames.code),
   name:field(row,keyNames.name),
   unit:field(row,keyNames.unit),
   frequency:field(row,keyNames.frequency),
   note:field(row,keyNames.note)
 })).filter(row => row.code && row.name);
 const exactName = kind === 'price'
   ? new Set([norm(province+' Konut Birim Fiyatları'), norm(province+' Housing Unit Prices')])
   : new Set([norm('Değerlemesi Yapılan Konutların Birim Kiraları '+province),norm('Değerlemesi Yapılan Konutların Birim Kiraları - '+province),norm('Valued Residential Property Unit Rents '+province)]);
 const match = rows.find(row => {
   const name=norm(row.name);
   const exact=exactName.has(name);
   const rentMatch=kind === 'rent' && name.includes('degerlemesi yapilan konutlarin birim kiralari') && name.endsWith(expectedProvince);
   // TCMB catalogue labels vary in token order across provinces; require both the province token and the official series subject.
   const priceMatch=kind === 'price' && (name.includes('konut birim fiyat') || name.includes('housing unit price')) && name.split(' ').includes(expectedProvince);
   return exact || rentMatch || priceMatch;
  });
 if (!match) return null;
 // EVDS serieList metadata exposes the official frequency and source links but does not expose a unit field.
 // Units are taken from the matching official EVDS dataset page; rent's monthly basis is documented by TCMB's
 // 100 m² quarterly rent examples (the quarter is the observation period, while the reported rent is monthly).
 const verifiedUnit = officialUnits[kind];
 if (!verifiedUnit) throw new Error('metadata_mismatch');
 const resolved={...match,unit:match.unit||verifiedUnit.unit,areaBasis:verifiedUnit.areaBasis,unitSourceUrl:verifiedUnit.sourceUrl,methodologyUrl:verifiedUnit.methodologyUrl||null};
 validateQuarterlyMetadata({...resolved,verifiedUnit:verifiedUnit.unit},kind);
 return resolved;
}
export function discoverGroups(payload) {
 const rows = asCatalogRows(payload);
 const find = terms => rows.find(row => {
   const name = norm(field(row,['DATAGROUP_NAME','GROUP_NAME','NAME','name','DATAGROUP']));
   return terms.every(term => name.includes(norm(term)));
 });
 const price = find(['konut','birim','fiyat']);
 const rent = find(['degerlemesi','konut','birim','kira']);
 const codeOf = row => field(row,['DATAGROUP_CODE','GROUP_CODE','CODE','code','DATAGROUP']);
 if (!price || !rent || !codeOf(price) || !codeOf(rent)) throw new Error('catalog_unavailable');
 return {price:codeOf(price),rent:codeOf(rent)};
}
function parseQuarter(value) {
 const text=String(value??'').trim();
 let m=text.match(/^(\d{4})\s*[-/.]?\s*(?:Q|Ç|C)?\s*([1-4])\s*(?:Ç|C|Q)?$/i);
 if(m)return {period:`${m[1]}-Q${m[2]}`,date:`${m[1]}-${String((Number(m[2])-1)*3+1).padStart(2,'0')}-01`};
 m=text.match(/^(\d{4})[-.](\d{1,2})$/);
 if(m && Number(m[2])<=4)return {period:`${m[1]}-Q${m[2]}`,date:`${m[1]}-${String((Number(m[2])-1)*3+1).padStart(2,'0')}-01`};
 m=text.match(/^(\d{1,2})[-.](\d{1,2})[-.](\d{4})$/);
 if(m){const quarter=Math.ceil(Number(m[2])/3);return {period:`${m[3]}-Q${quarter}`,date:`${m[3]}-${String((quarter-1)*3+1).padStart(2,'0')}-01`}}
 return null;
}
export function parseQuarterlyObservations(payload, code, series) {
 const rows=asCatalogRows(payload);
 if(!rows.length)throw new Error('empty_data');
 const key=code.replaceAll('.','_');
 const out=[];
 for(const row of rows){
  const parsed=parseQuarter(row.Tarih??row.DATE??row.date??row.Period??row.period);
  const raw=row[key]??row[code]??row.value;
  if(!parsed)continue;
  if(raw==null||String(raw).trim()===''){out.push({series,period:parsed.date,displayPeriod:parsed.period,value:null});continue}
  const rawText=String(raw).trim();
  const normalized=rawText.includes(',')?rawText.replace(/\./g,'').replace(',','.'):rawText.replace(/\.(?=\d{3}(?:\D|$))/g,'');
  const value=Number(normalized);
  if(Number.isFinite(value)&&value>0)out.push({series,period:parsed.date,displayPeriod:parsed.period,value});
 }
 return out;
}
export function parsePositive(value) {
 if (typeof value==='number') return Number.isFinite(value)&&value>0?value:null;
 if (typeof value!=='string') return null;
 let s=value.replace(/[^0-9,.-]/g,'').trim();
 if(!s)return null;
 if(s.includes(',')&&s.includes('.'))s=s.lastIndexOf(',')>s.lastIndexOf('.')?s.replace(/\./g,'').replace(',','.'):s.replace(/,/g,'');
 else if(s.includes(','))s=s.replace(',','.');
 else if((s.match(/\./g)||[]).length>1)s=s.replace(/\./g,'');
 const n=Number(s);return Number.isFinite(n)&&n>0?n:null;
}
export function validateListingInput(input={}) {
 const price=parsePositive(input.price), city=typeof input.city==='string'?input.city.trim().slice(0,100):'';
 const grossArea=parsePositive(input.grossArea) ?? (input.areaType==='gross'?parsePositive(input.area):null);
 const netArea=parsePositive(input.netArea) ?? (input.areaType==='net'?parsePositive(input.area):null);
 const area=grossArea??netArea;
 const areaType=grossArea?'gross':netArea?'net':null;
 const monthlyRent=input.monthlyRent==null||input.monthlyRent===''?null:parsePositive(input.monthlyRent);
 const missing=[];
 if(!city)missing.push('city');
 if(!price)missing.push('price');
 if(!area)missing.push('area');
 if(input.monthlyRent!=null&&input.monthlyRent!==''&&!monthlyRent)missing.push('monthlyRent');
 return {city,price,area,areaType,netArea,grossArea,monthlyRent,missing};
}
export function differencePercent(listingM2, provinceUnitPriceM2) {
 if(!(listingM2>0)||!(provinceUnitPriceM2>0))return null;
 return Number(((listingM2/provinceUnitPriceM2-1)*100).toFixed(10));
}
export function rentMetrics(monthlyUnitRent, area, salePrice) {
 if(!(monthlyUnitRent>0)||!(area>0)||!(salePrice>0))return null;
 const monthly=monthlyUnitRent*area;
 const annualYieldPercent=monthly*12/salePrice*100;
 const paybackYears=salePrice/(monthly*12);
 return {monthlyGrossRent:monthly,annualGrossYieldPercent:annualYieldPercent,paybackYears};
}
export function calculateTcmc(input, series) {
 const validated=validateListingInput(input);
 if(validated.missing.length)throw new Error('invalid_input');
 const housePrice=series?.housePrice, rent=series?.rent;
 if(!housePrice?.value) return {status:'no_data',message:'Bu il için karşılaştırılabilir TCMB verisi bulunamadı.',listing:validated,housePrice:null,rent:null};
 const grossM2Price=validated.grossArea?validated.price/validated.grossArea:null;
 const netM2Price=validated.netArea?validated.price/validated.netArea:null;
 // Express TCMB's gross-area reference on a net-area basis only from the
 // listing's own supplied areas. Never assume a generic conversion ratio.
 const netAreaRatio=validated.netArea&&validated.grossArea?validated.grossArea/validated.netArea:null;
 const netEquivalentM2Price=netAreaRatio?housePrice.value*netAreaRatio:null;
 const grossDifferencePercent=grossM2Price?differencePercent(grossM2Price,housePrice.value):null;
 const netDifferencePercent=netM2Price&&netEquivalentM2Price?differencePercent(netM2Price,netEquivalentM2Price):null;
 const delta=netDifferencePercent??grossDifferencePercent;
 const threshold=Number.isFinite(Number(input.thresholdPercent))&&Number(input.thresholdPercent)>0?Number(input.thresholdPercent):20;
 return {
  status:'available',
  listing:{...validated,grossM2Price,netM2Price,listingM2:grossM2Price},
  comparison:{provinceUnitPriceM2:housePrice.value,netEquivalentM2Price,netAreaRatio,grossDifferencePercent,netDifferencePercent,differencePercent:delta,reviewRecommended:[grossDifferencePercent,netDifferencePercent].some(value=>value!=null&&Math.abs(value)>=threshold),thresholdPercent:threshold,areaBasis:'brüt/brüt ve net/net'},
  rent:rent?.value&&validated.grossArea?{unitMonthlyRentPerM2:rent.value,...rentMetrics(rent.value,validated.grossArea,validated.price),areaBasis:'brüt kullanım alanı',series:rent}:null,
  userRent:validated.monthlyRent?{monthlyRent:validated.monthlyRent,annualGrossYieldPercent:validated.monthlyRent*12/validated.price*100,paybackYears:validated.price/(validated.monthlyRent*12)}:null,
  sources:{housePrice,rent:rent||null},
  disclaimer:'Bu sonuçlar TCMB’nin il bazlı değerleme verilerinden üretilen yaklaşık göstergelerdir; belirli bir konut için ekspertiz, gerçekleşmiş satış fiyatı, kira garantisi veya yatırım tavsiyesi değildir. Brüt kira getirisi ve amortisman hesabı vergi, aidat, bakım, boş kalma süresi ve diğer masrafları içermez. İl göstergesi mahalle veya daire özelliklerine göre emsal karşılaştırmasının yerine geçmez.'
 };
}
export function normalizeMetadataRows(payload) { return asCatalogRows(payload).map(row=>({code:field(row,keyNames.code),name:field(row,keyNames.name),unit:field(row,keyNames.unit),frequency:field(row,keyNames.frequency),note:field(row,keyNames.note)})); }
