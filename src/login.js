 const x=require('./server');

x.on("logIn",(res)=>{
    console.log("Login process starts at",res)
});

x.on("logIn",()=>{
    console.log("login process done");
})
