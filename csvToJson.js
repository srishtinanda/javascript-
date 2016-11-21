var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var heading=true;
var instream = fs.createReadStream('csv/Indicators.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
var head;
var lem=[];
var lef=[];
var bem=[];
var bri=[];
var dri=[];
var bdri=["birthrate:"];
rl.on('line', function(line) {

 if(heading){
head=line.split(",");
heading=false;
 }
 // process line here
 
 var countries = ["MNA","JOR","KAZ","KOR","OMAN","MAC","IND","NEP","KWT","MYS","PHL"];
 for(var i=0,len=countries.length ; i<len; i++){
 if(line.indexOf(countries[i])>-1) {
if((line.indexOf("SP.DYN.LE00.MA.IN")>-1)||(line.indexOf("SP.DYN.LE00.FE.IN")>-1)) {

    var obj = {} ;
    var currentline=line.split( /,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/ );

      for(var j=0;j<head.length;j++){
   if(head[j]=="Year"||head[j]=="Value"||head[j]=="CountryName"){
    obj[head[j]] = currentline[j];
    }
  }
 if((line.indexOf("SP.DYN.LE00.MA.IN")>-1)){
              lem.push(obj); 
         }//push the obj of each line
         else{
            lef.push(obj);
         }
    }
}
}
      if((line.indexOf("IND")>-1)&&((line.indexOf("SP.DYN.CDRT.IN")>-1))) {
 
                            var obj = {} ;
                            var currentline=line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
                             for(var j=0;j<head.length;j++){
                                if(head[j]=="Year"||head[j]=="Value"){
                                 obj[head[j]] = currentline[j];
                                 }
                               }
                              
                             bri.push(obj); //push the obj of each line
     }
     if((line.indexOf("IND")>-1)&&((line.indexOf("SP.DYN.CBRT.IN")>-1))) {
 
                            var obj = {} ;
                            var currentline=line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
                               for(var j=0;j<head.length;j++){
                                if(head[j]=="Year"||head[j]=="Value" ){
                                 obj[head[j]] = currentline[j];
                                 }
                               }
                              
                             dri.push(obj); //push the obj of each line
     }



});

rl.on('close', function() {
 // do something on finish here
 var p1=JSON.stringify(lem);
 p1=p1.replace("[","[\n\t");
 p1= p1.replace(/},/g,"},\n\t");

 p1= p1.replace(/\\"/g,"");
 p1=p1.replace(/,/g,",\n\t");
 console.log(p1);
 var p2=JSON.stringify(lef);
 p2=p2.replace("[","[\n\t");
 p2= p2.replace(/},/g,"},\n\t");
 p2= p2.replace(/\\"/g,"");
 p2=p2.replace(/,/g,",\n\t");
 console.log(p2);
 var q=JSON.stringify(bri);
 q=q.replace("[","[\n\t");
 q=q.replace(/},/g,"},\n\t");
 q=q.replace(/,/g,",\n\t");
 
 var r=JSON.stringify(dri);
 r=r.replace("[","[\n\t");
 r=r.replace(/},/g,"},\n\t");
 r=r.replace(/,/g,",\n\t");
 console.log('["BirthRate":'+q+"\n"+'"DeathRate":'+r+"]");
 fs.writeFile("text2.JSON",'["BirthRate":'+q+"\n"+'"DeathRate":'+r+"]",function(err) {
if(err){
    throw err;
}
//file.close();
});
 fs.writeFile("text1.JSON",'["Life Expectancy At Birth,Male":'+p1+"\n"+'"Life Expectancy At Birth,Female":'+p2+"]",function(err) {
if(err){
    throw err;
}
//file.close();
});
});