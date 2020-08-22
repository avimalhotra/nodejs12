const express=require('express');
let app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 



app.use(express.static('src/public'));

app.use((req,res,next)=>{
    console.log('Session starts at : %d', Date.now());
    next()
});

app.get("/",(req,res)=>{
    res.status(200).send("home page")
    //res.status(200).send(res.json({"search":req.query}));
});

app.get("/admin.html",(req,res)=>{
    res.status(200).send("hello admin html page");
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
   
    console.log(`Name is ${req.body.username} and password is ${req.body.userpass}`);
    //res.send(req.query)
    //res.json(req.body);

    res.json({"parameters":req.body});
   
});


// router

var admin=require('./router/admin');
var user=require('./router/user');


app.use('/admin',admin);
app.use('/user',user);


/* Wildcard handler */
app.get('/**',(req,res)=>{
    res.status(404).send("PAGE not found");
});
app.listen(3000,()=>{
    console.log(`server running at http://127.0.0.1:3000`)
})