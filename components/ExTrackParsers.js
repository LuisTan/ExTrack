export function pesoString(money,inout){
    absValMoney = money;
    if(money < 0)
        absValMoney = -money;
    sentimo = Math.floor(absValMoney * 100) % 100;
    peso = Math.floor(absValMoney);
    pesoStr = '';
    sentimoStr = '';
    if(inout === "Spend" && money != 0){
        pesoStr = '-';
        sentimoStr = '-';
    }
    pesoStr = pesoStr + '₱' + peso + ".";
    sentimoStr = sentimoStr + sentimo + '¢';
    if(sentimo > 0){
        if(peso == 0){
            return sentimoStr;
        }
        if(sentimo < 10){
            pesoStr = pesoStr + "0" + sentimo;
            return pesoStr;
        }
        else{
            pesoStr = pesoStr + sentimo;
        }
    }
    else{
        pesoStr = pesoStr + "00";
    }
    return pesoStr;
}