import {readFile,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {districtSalesSql} from '../worker/tuik.mjs';

const DATA_FILE=process.env.TUIK_DISTRICT_MAP_DATA||'tuik-district-map-data.json';
const DISTRICT_GEOMETRY_FILE=process.env.TUIK_DISTRICT_GEOMETRY||'tuik-district-geometry.json';
const PROVINCE_GEOMETRY_FILE=process.env.TUIK_PROVINCE_GEOMETRY||'tuik-province-geometry.json';

const manualProvinceByDistrictCode={
 '1103':'İSTANBUL', // Adalar: harita temsil noktası il poligonunun dışında kalabiliyor.
 '1734':'ADANA', // Yumurtalık kıyı geometrisi.
 '1819':'İZMİR', // Konak kıyı geometrisi.
};

function slugify(value){return String(value).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ı','i').replaceAll('ş','s').replaceAll('ğ','g').replaceAll('ü','u').replaceAll('ö','o').replaceAll('ç','c').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function titleCase(value){return String(value).toLocaleLowerCase('tr-TR').replace(/(^|[\s-])([\p{L}])/gu,(_,gap,char)=>gap+char.toLocaleUpperCase('tr-TR'))}

function rings(geometry){
 if(geometry?.type==='Polygon')return geometry.coordinates;
 if(geometry?.type==='MultiPolygon')return geometry.coordinates.flat();
 return [];
}

function pointInRing([x,y],ring){
 let inside=false;
 for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  const [xi,yi]=ring[i],[xj,yj]=ring[j];
  if(((yi>y)!==(yj>y))&&x<((xj-xi)*(y-yi))/(yj-yi)+xi)inside=!inside;
 }
 return inside;
}

function pointInGeometry(point,geometry){
 if(geometry?.type==='Polygon')return pointInRing(point,geometry.coordinates[0])&&!geometry.coordinates.slice(1).some(ring=>pointInRing(point,ring));
 if(geometry?.type==='MultiPolygon')return geometry.coordinates.some(polygon=>pointInRing(point,polygon[0])&&!polygon.slice(1).some(ring=>pointInRing(point,ring)));
 return false;
}

function representativePoint(geometry){
 const outer=rings(geometry).filter(ring=>ring.length>=4).sort((a,b)=>b.length-a.length)[0];
 if(!outer)throw Error('İlçe geometrisi boş');
 const xs=outer.map(([x])=>x),ys=outer.map(([,y])=>y),center=[(Math.min(...xs)+Math.max(...xs))/2,(Math.min(...ys)+Math.max(...ys))/2];
 if(pointInGeometry(center,geometry))return center;
 let twiceArea=0,xSum=0,ySum=0;
 for(let i=0,j=outer.length-1;i<outer.length;j=i++){
  const cross=outer[j][0]*outer[i][1]-outer[i][0]*outer[j][1];twiceArea+=cross;xSum+=(outer[j][0]+outer[i][0])*cross;ySum+=(outer[j][1]+outer[i][1])*cross;
 }
 if(twiceArea){const centroid=[xSum/(3*twiceArea),ySum/(3*twiceArea)];if(pointInGeometry(centroid,geometry))return centroid}
 for(const point of outer){const candidate=[(point[0]+center[0])/2,(point[1]+center[1])/2];if(pointInGeometry(candidate,geometry))return candidate}
 return outer[0];
}

export function buildDistrictDirectory(districtGeometry,provinceGeometry){
 const provinces=provinceGeometry?.features||[],districts=districtGeometry?.features||[];
 if(provinces.length!==81)throw Error(`TÜİK il geometrisi beklenen 81 kayıt yerine ${provinces.length} kayıt içeriyor`);
 if(districts.length<970)throw Error(`TÜİK ilçe geometrisi eksik: ${districts.length}`);
 const byRegion=new Map();for(const province of provinces){const region=String(province.properties?.bolgeKodu||'');byRegion.set(region,[...(byRegion.get(region)||[]),province])}
 const directory=new Map();
 for(const district of districts){
  const code=String(district.properties?.duzeyKodu||''),districtName=String(district.properties?.name||'').trim(),region=String(district.properties?.bolgeKodu||''),candidates=byRegion.get(region)||[];
  const manual=manualProvinceByDistrictCode[code],province=manual?provinces.find(item=>item.properties?.name===manual):candidates.length===1?candidates[0]:candidates.find(item=>pointInGeometry(representativePoint(district.geometry),item.geometry));
  if(!code||!districtName||!province)throw Error(`İlçe il eşlemesi kurulamadı: ${code} ${districtName}`);
  directory.set(code,{citySlug:slugify(province.properties.name),districtName:titleCase(districtName),provinceName:titleCase(province.properties.name)});
 }
 if(directory.size!==districts.length)throw Error('TÜİK ilçe kodları benzersiz değil');
 return directory;
}

export function parseDistrictMapData(payload,directory,retrievedAt=new Date().toISOString(),now=new Date()){
 if(payload?.gostergeNo!=='KNT-GK217340-O27002'||payload?.period!=='aylik')throw Error('TÜİK ilçe göstergesi veya periyodu değişti');
 const periods=(payload.tarihler||[]).map((value,index)=>({index,period:String(value).replace(/^(\d{4})\/(\d)$/,'$1/0$2').replace('/','-')})).filter(item=>/^\d{4}-\d{2}$/.test(item.period)).sort((a,b)=>b.period.localeCompare(a.period));
 const latest=periods[0];if(!latest)throw Error('TÜİK ilçe dönemleri boş');
 const [year,month]=latest.period.split('-').map(Number),age=(now.getUTCFullYear()*12+now.getUTCMonth())-(year*12+month-1);
 if(age<0||age>3)throw Error(`TÜİK ilçe verisi güncel değil: ${latest.period}`);
 const rows=[];
 for(const item of payload.veriler||[]){const mapped=directory.get(String(item.duzeyKodu)),raw=String(item.veri?.[latest.index]??'').trim();if(!mapped||!/^\d+$/.test(raw))continue;rows.push({...mapped,period:latest.period,total:Number(raw),retrievedAt})}
 const provinces=new Set(rows.map(row=>row.citySlug));
 // Portal bazı küçük ilçelerde değeri boş döndürür. Boş değeri sıfır saymayız;
 // buna karşılık 81 ilin tamamının ve olağan yayın kapsamının bulunmasını zorunlu tutarız.
 if(rows.length<750||provinces.size!==81)throw Error(`TÜİK ilçe kapsamı eksik: ${rows.length} ilçe, ${provinces.size} il`);
 return rows.sort((a,b)=>a.citySlug.localeCompare(b.citySlug,'tr')||a.districtName.localeCompare(b.districtName,'tr'));
}

if(import.meta.url===pathToFileURL(process.argv[1]).href){
 const [payload,districtGeometry,provinceGeometry]=await Promise.all([DATA_FILE,DISTRICT_GEOMETRY_FILE,PROVINCE_GEOMETRY_FILE].map(async file=>JSON.parse(await readFile(file,'utf8'))));
 const directory=buildDistrictDirectory(districtGeometry,provinceGeometry),rows=parseDistrictMapData(payload,directory);
 await writeFile('tuik-district-sales.sql',districtSalesSql(rows));
 await writeFile('tuik-district-sync-summary.json',JSON.stringify({indicator:payload.gostergeNo,period:rows[0].period,officialRows:rows.length,districtUniverse:directory.size,unpublishedDistricts:directory.size-rows.length,provinces:new Set(rows.map(row=>row.citySlug)).size,retrievedAt:rows[0].retrievedAt},null,2));
 console.log(`${rows.length} doğrulanmış ilçe kaydı ${new Set(rows.map(row=>row.citySlug)).size} il için hazırlandı; dönem ${rows[0].period}.`);
}
