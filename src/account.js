const y=require('./server');

y.once("account",(res)=>{
    console.log("account process done");
});