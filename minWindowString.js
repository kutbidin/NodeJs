
const strArr=["ahffaksfajeeubsn", "jnfa89uiuiufd8989"];
const getMinWindowString=(arr)=>{
    const N=arr[0];
    const K=arr[1];
    if(K.length>N.length){
        return 'no match :K is longer'
    }
   //check combnation start from min possible length
   for(let len=K.length;len<=N.length;len++){
      for(let i=0;i<=(N.length-len);i++){
          let item=N.substr(i,len); 
          if(containsAllChars(item,K)){
              return item;
          }
          //console.log(item);         
      }
  }
  return 'not found';
}
const containsAllChars=(str,chars)=>{
    for(let c=0;c<chars.length;c++){
      let index=str.indexOf(chars[c]);
      if(index<0){
          return false;
      }
      str=str.substring(0,index).concat(str.substring(index+1));
    }
    return true;
}
let startTime=Date.now();
console.log(getMinWindowString(strArr));
let finishTime=Date.now();
console.log(`task took :${parseInt(finishTime)-parseInt(startTime)}ms`);
console.log('---- End ----');