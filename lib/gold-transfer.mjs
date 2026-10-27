import {goldAssets,isGoldAsset,parseQueryNumber} from './gold-housing.mjs';
export function transferParams(search='',hash=''){
 const q=new URLSearchParams(search),h=new URLSearchParams(hash.replace(/^#/,''));
 for(const [key,value] of h)if(!q.has(key))q.set(key,value);
 return q;
}
export function readGoldTransfer(search='',hash=''){
 const q=transferParams(search,hash);if(q.get('source')!=='altinseyir')return null;
 const number=(key,max)=>{const n=parseQueryNumber(q.get(key));return Number.isFinite(n)&&n>0&&n<=max?n:null};
 const raw=q.get('asset')||q.get('gold_type'),asset=isGoldAsset(raw)?raw:'gram',quantity=number('quantity',1e6)??number('gold_quantity',1e6);
 const pure=number('pure_gram',1e7)??(quantity?quantity*goldAssets[asset].pureGrams:null);
 const value=number('gold_value_try',1e15),reference=number('gram_ref_try',1e7)??(pure&&value?value/pure:null);
 return {asset,quantity,pureGrams:pure,reference,value,priceAt:q.get('price_at')};
}
export function goldTransferUrl(asset,quantity){
 const n=Number(quantity);if(!isGoldAsset(asset)||!Number.isFinite(n)||n<0||n>1e6)return null;
 // Amounts stay in the fragment, outside server access logs and referrer URLs.
 const url=new URL('https://altinseyir.com/altindan-konuta');url.searchParams.set('source','konutseyir');
 url.hash=new URLSearchParams({asset,quantity:String(n),gold_type:asset,gold_quantity:String(n)}).toString();
 return url.toString();
}
export function wholeLira(value){return Number.isFinite(value)?Math.round(value):0}
export function formatWholeLira(value){return wholeLira(value).toLocaleString('tr-TR',{maximumFractionDigits:0})}
