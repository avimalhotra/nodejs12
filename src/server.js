const express=require('express');

let app=express();

// express().use((req,res)=>{
//     res.end('hello world')
// }).listen(8080);

//app.use(express.static('src/public'));

app.use((req,res,next)=>{
    console.log("app running");
    next()
});

app.get("/",(req,res)=>{
    //console.log(req.url);
    res.status(200).send("hello express");
});

app.post("/postdata",(req,res)=>{
    res.status(200).send("hello express post");
});

app.get("/admin",(req,res)=>{
    //console.log(req.url);
    res.status(200).send("hello admin");
});



/* Wildcard handler */
app.get('/**',(req,res)=>{
    res.status(404).send("PAGE not found");
});
app.listen(8080,()=>{
    console.log(`server running at http://127.0.0.1:8080`)
})