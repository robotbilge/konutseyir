export function analyze(p){
 for(const v of Object.values(p))if(!Number.isFinite(v))throw Error('Tüm alanlara geçerli sayı girin.');
 if(p.price<=0||p.area<=0)throw Error('Fiyat ve alan sıfırdan büyük olmalı.');
 for(const k of ['rent','costs','expenses','tax','saleCosts'])if(p[k]<0)throw Error('Tutarlar negatif olamaz.');
 if(p.vacancy<0||p.vacancy>12)throw Error('Boş kalma süresi 0–12 ay olmalı.');
 if(p.inflation<=-100||p.growth< -100||p.gold< -100||p.deposit<0||p.withholding<0||p.withholding>100)throw Error('Oranları kontrol edin. Enflasyon −%100’den büyük olmalı.');
 const capital=p.price+p.costs,gross=p.rent*12,collected=p.rent*(12-p.vacancy),net=collected-p.expenses-p.tax;
 const outcome=end=>({end,profit:end-capital,rate:(end/capital-1)*100,realRate:(end/capital/(1+p.inflation/100)-1)*100,realProfit:end/(1+p.inflation/100)-capital});
 const depositGross=capital*p.deposit/100,withheld=depositGross*p.withholding/100;
 return {capital,gross,collected,net,monthlyNet:net/12,emptyLoss:gross-collected,grossYield:gross/capital*100,netYield:net/capital*100,pricePerM2:p.price/p.area,multiplierMonths:p.rent>0?p.price/p.rent:null,payback:net>0?capital/net:null,depositGross,withheld,home:outcome(p.price*(1+p.growth/100)+net-p.saleCosts),deposit:outcome(capital+depositGross-withheld),gold:outcome(capital*(1+p.gold/100))};
}
export function loan(principal,monthlyRate,months,fees=0){
 if(![principal,monthlyRate,months,fees].every(Number.isFinite)||principal<0||monthlyRate<0||fees<0||months<1||months>600||!Number.isInteger(months))throw Error('Kredi alanlarını kontrol edin; vade 1–600 tam ay olmalı.');
 const r=monthlyRate/100,payment=r===0?principal/months:principal*r/(-Math.expm1(-months*Math.log1p(r)));
 return {payment,total:payment*months+fees,interest:payment*months-principal,cost:payment*months-principal+fees};
}
export function termDeposit(capital,rate,days,tax){
 if(![capital,rate,days,tax].every(Number.isFinite)||capital<0||rate<0||days<1||!Number.isInteger(days)||tax<0||tax>100)throw Error('Mevduat alanlarını kontrol edin.');
 const gross=capital*rate/100*days/365,withheld=gross*tax/100;
 return {gross,withheld,net:gross-withheld,total:capital+gross-withheld};
}
