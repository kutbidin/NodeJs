const fs=require('fs');
const Calendar=(year,mon)=>{
    const cal=[];
    const header=['',`${year}`,'','',`${mon}`,'',''];
    const dayNames=['MON','TUE','WED','THU','FRI','SAT','SUN'];
    cal.push(header);
    cal.push(dayNames);
    let date=new Date(year,mon-1,1);
    let firstDay=date.getDay();
    let dayCount=(new Date(year,mon,0)).getDate();
    let days=new Array((6+firstDay)%7);
    days.fill('');
    for(let i=1;i<=dayCount;i++){
        days.push(i.toString());
        if(days.length==7){
            cal.push(days); 
            days=[];       
        } 
    }
    if(days.length>0){
        cal.push(days);
    }
    return cal;
}
const printCalMonth=(year,mon,writer)=>{
    let days="";
    let calendar=Calendar(year,mon);
    calendar.forEach((weekDays)=>{
        weekDays.forEach((day)=>{
            day=day.padStart(2,' ').padEnd(4,' ');
            days+=` ${day}`;   
        });
        //console.log(days);
        writer.write('\n'+days)
        days="";
    });
}
const printCalendar=(year,mon=0)=>{
   const writer=fs.createWriteStream('D:\calendar.txt');
   if(mon==0){
       for(let i=1;i<13;i++){
           printCalMonth(year,i,writer);
        }
        return;
    }
    printCalMonth(year,mon,writer);    
}
//printCalendar(2022,02);
printCalendar(2022);

