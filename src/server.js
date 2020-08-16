const express=require('express');
let app=express();

//app.use(express.static('src/public'));

app.use((req,res,next)=>{
    console.log('Session starts at : %d', Date.now());
    next()
});

app.get("/",(req,res)=>{
    res.status(200).send("hello express");
});
app.get("/admin",(req,res)=>{
    res.status(200).send("hello admin");
});


app.get("/tv/:brand/:model",(req,res)=>{
    res.send(req.params);
})


// for form
app.get("/login",(req,res)=>{
   // res.send(`Thanks ${req.query.username}.`);
    res.json({"data":req.query})
});

app.post("/login",(req,res)=>{
    res.send(`Thanks for your query`);
})




/* Wildcard handler */
app.get('/**',(req,res)=>{
    res.status(404).send("PAGE not found");
});
app.listen(3000,()=>{
    console.log(`server running at http://127.0.0.1:3000`)
})