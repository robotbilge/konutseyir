import {grossRentMetrics} from './finance.mjs';
export function listingSummary(input={}){
 const read=(key,max)=>{const raw=input[key];if(raw==null||raw==='')return null;const n=Number(raw);return Number.isFinite(n)&&n>=(key==='price'?1:0.01)&&n<=max?n:null};
 const price=read('price',1e12),net=read('netArea',100000),gross=read('grossArea',100000),rent=read('monthlyRent',1e10);
 /** @type {Record<string,string>} */
 const errors={};
 for(const [key,max] of [['price',1e12],['netArea',100000],['grossArea',100000],['monthlyRent',1e10]])if(input[key]!=null&&input[key]!==''&&!read(key,max))errors[key]='Sıfırdan büyük, sınırlar içinde geçerli bir sayı girin.';
 if(net&&gross&&net>gross)errors.netArea='Net alan brüt alandan büyük olamaz; alanları kontrol edin.';
 const ready=!!price&&!!(net||gross)&&!Object.keys(errors).length;
 return {ready,errors,netM2Price:price&&net&&!errors.netArea?price/net:null,grossM2Price:price&&gross&&!errors.grossArea?price/gross:null,rent:price&&rent&&!errors.monthlyRent?grossRentMetrics(price,rent):null};
}
export function listingRequestBody(form,{url='',extractOnly=false,listingFetched=false}={}){
 if(extractOnly)return {url,extractOnly:true};
 return {url:listingFetched?'':url,extractOnly:false,city:url&&!listingFetched?'':form.city,price:form.price,area:form.area,areaType:form.areaType,netArea:form.netArea,grossArea:form.grossArea,monthlyRent:form.monthlyRent};
}
