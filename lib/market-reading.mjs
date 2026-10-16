const finite=v=>typeof v==='number'&&Number.isFinite(v);
export function indexReading(value,annualChange){
 if(!finite(value)||value<=0)return null;
 // The API supplies a change only with the exact same month a year earlier.
 if(!finite(annualChange)||annualChange<=-100)return {level:value,annual:null,rebased:null};
 return {level:value,annual:annualChange,rebased:100*(1+annualChange/100)};
}
export function salesReading(total,mortgaged,firstSale,secondHand){
 if(![total,mortgaged,firstSale,secondHand].every(v=>finite(v)&&Number.isInteger(v)&&v>=0)||total<=0||mortgaged>total||firstSale+secondHand!==total)return null;
 return {mortgageShare:mortgaged/total*100,firstShare:firstSale/total*100,secondShare:secondHand/total*100};
}
