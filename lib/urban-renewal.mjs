const moneyKeys=['construction','rent','moving','deposit','other','savings','grant','credit','rentAid','monthlyPayment'];
const integerKeys=['months','delay','roofMonth','grantMonth','creditMonth','aidStart','aidMonths','repaymentStart'];
export const urbanExample={construction:2400000,rent:25000,moving:50000,deposit:50000,other:50000,savings:1000000,months:18,delay:6,upfrontPercent:30,roofPercent:40,roofMonth:9,rentIncrease:0,grant:600000,grantMonth:9,credit:600000,creditMonth:9,rentAid:5000,aidStart:1,aidMonths:18,monthlyPayment:10000,repaymentStart:19,supportsConfirmed:false};
export function urbanBudget(p){
 for(const k of [...moneyKeys,...integerKeys,'upfrontPercent','roofPercent','rentIncrease'])if(typeof p[k]!=='number'||!Number.isFinite(p[k]))throw Error('Boş veya hatalı sayı var. Tüm alanları kontrol edin; bilinmeyen tutarı tahminle doldurmayın.');
 for(const k of moneyKeys)if(p[k]<0||p[k]>1e9)throw Error('TL tutarları 0–1.000.000.000 arasında olmalı.');
 if(p.construction<=0)throw Error('Yapım bedeli sıfırdan büyük olmalı.');
 for(const k of integerKeys)if(!Number.isInteger(p[k]))throw Error('Ay alanlarına tam sayı girin.');
 if(p.months<1||p.delay<0||p.months+p.delay>120)throw Error('Planlanan süre en az 1 ay, gecikmeyle toplam süre en fazla 120 ay olmalı.');
 if(p.roofMonth<0||p.roofMonth>p.months)throw Error('Ara ödeme ayı 0 ile planlanan teslim ayı arasında olmalı.');
 if(p.upfrontPercent<0||p.roofPercent<0||p.upfrontPercent+p.roofPercent>100)throw Error('Peşin ve ara ödeme yüzdeleri negatif olamaz; toplamları %100’ü aşamaz.');
 if(p.rentIncrease<0||p.rentIncrease>100)throw Error('Yıllık kira artışı varsayımı %0–100 arasında olmalı. Bu oran yasal artış sınırı değildir.');
 const horizon=p.months+p.delay,enabled=p.supportsConfirmed===true;
 if(enabled&&((p.grant>0&&(p.grantMonth<0||p.grantMonth>horizon))||(p.credit>0&&(p.creditMonth<0||p.creditMonth>horizon))||p.aidStart<1||p.aidStart>120||p.aidMonths<0||p.aidMonths>120||p.repaymentStart<1||p.repaymentStart>120))throw Error('Hibe/kredi ödeme ayı hesap süresinde, destek ve taksit başlangıcı 1–120 arasında olmalı; destek süresi 0–120 ay olmalı.');
 if(enabled&&p.credit===0&&p.monthlyPayment>0)throw Error('Kredi anaparası sıfırken bu kredi için taksit girilemez. Kredi/taksit alanlarını birlikte kontrol edin.');
 const grant=enabled?p.grant:0,credit=enabled?p.credit:0;
 const upfront=p.construction*p.upfrontPercent/100,roof=p.construction*p.roofPercent/100,delivery=p.construction-upfront-roof;
 let balance=p.savings,totalRent=0,totalAid=0,totalPayments=0,peakGap=0,firstGap=null,lateRent=0;
 const rows=[];
 for(let month=0;month<=horizon;month++){
  const build=(month===0?upfront:0)+(month===p.roofMonth?roof:0)+(month===horizon?delivery:0);
  const rent=month>0?p.rent*Math.pow(1+p.rentIncrease/100,Math.floor((month-1)/12)):0;
  const aid=enabled&&month>=p.aidStart&&month<p.aidStart+p.aidMonths?p.rentAid:0;
  const grantIn=month===p.grantMonth?grant:0,creditIn=month===p.creditMonth?credit:0;
  const repayment=enabled&&credit>0&&month>=p.repaymentStart?p.monthlyPayment:0;
  const oneOff=month===0?p.moving+p.deposit+p.other:0,outflow=build+rent+repayment+oneOff,inflow=grantIn+creditIn+aid;
  balance+=inflow-outflow;const gap=Math.max(0,-balance);
  if(gap>0&&firstGap===null)firstGap=month;
  peakGap=Math.max(peakGap,gap);totalRent+=rent;totalAid+=aid;totalPayments+=repayment;if(month>p.months)lateRent+=rent;
  rows.push({month,build,rent,aid,grant:grantIn,credit:creditIn,repayment,oneOff,outflow,inflow,balance,gap});
 }
 const projectExpenses=p.construction+p.moving+p.other+totalRent,nonRepayable=grant+totalAid,totalOutflow=projectExpenses+p.deposit+totalPayments;
 const personalCash=Math.max(0,totalOutflow-nonRepayable-credit),excessFunding=Math.max(0,nonRepayable+credit-totalOutflow);
 const totalInflow=nonRepayable+credit;
 if(![balance,totalRent,peakGap,totalOutflow,totalInflow].every(Number.isFinite)||Math.max(totalOutflow,totalInflow)>1e12)throw Error('Senaryo toplamı hesap sınırını aşıyor; tutar ve artış varsayımını azaltın.');
 return {horizon,rows,upfront,roof,delivery,totalRent,lateRent,totalAid,grant,credit,totalPayments,projectExpenses,nonRepayable,totalOutflow,personalCash,peakGap,firstGap,balance,excessFunding,deposit:p.deposit,supportsIncluded:enabled};
}
export function compareUrbanOffers(a,b){
 for(const o of [a,b]){
  if(!o||![o.price,o.extras,o.area,o.months].every(v=>typeof v==='number'&&Number.isFinite(v)))throw Error('Her iki teklifin tutar, net alan ve teslim süresini tamamlayın.');
  if(o.price<=0||o.price>1e9||o.extras<0||o.extras>1e9||o.area<=0||o.area>10000||!Number.isInteger(o.months)||o.months<1||o.months>120)throw Error('Teklif tutarı/alanı sıfırdan büyük, ek gider negatif olmayan, teslim süresi 1–120 tam ay olmalı.');
 }
 const offer=o=>({total:o.price+o.extras,perNetM2:(o.price+o.extras)/o.area,months:o.months});const first=offer(a),second=offer(b);
 return {first,second,difference:second.total-first.total,areaDifference:b.area-a.area,monthDifference:b.months-a.months};
}
