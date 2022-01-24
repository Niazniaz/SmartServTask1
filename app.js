
const exp=require('express');
var app=exp();
app.set("view engine","ejs");
const request = require('request');
var fin=[];
let url = "https://s3.amazonaws.com/open-to-cors/assignment.json";

function GetSortOrder(prop){
    return function(a,b){
       if( parseInt(a[prop]) > parseInt(b[prop])) {
           return -1;
       }else if( parseInt(a[prop]) < parseInt(b[prop] ) ){
           return 1;
       }
       return 0;
    }
 }



request(url,(error,res,body)=>{
    if (error)
    {
        console.log("DIe bart,die");
    }
    else
    {
        console.log("Req ok");
        let dat=JSON.parse(body)
        dat=(dat['products']);
        console.log(typeof(dat));
        //dat.sort(GetSortOrder("popularity"));
        const keys = Object.keys(dat);
        keys.forEach((key, index) => {
            //console.log(`${key}: ${dat[key]["popularity"]}`);
            fin.push(dat[key]);
        });
        //console.log(fin);
        fin.sort(GetSortOrder("popularity"));
        //console.log(fin);
        // fin.forEach(element => {
        //    resul.push(element["title"]," ",element["price"]); 
        // });
    }
})

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/res",(req,res)=>{
    res.render("res",{fin:fin});
});

app.listen(3000);