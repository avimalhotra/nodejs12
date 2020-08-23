const express=require('express');
let app=express();
var cookie=require('cookie-parser');
var bodyParser=require('body-parser');
var session=require('express-session');
var parseurl=require('parseurl');


app.use(cookie());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

 // trust first proxy
 app.set('trust proxy', 1); 
 app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false,maxAge:86400}
}))

//app.use(express.static('src/public'));

app.use((req,res,next)=>{
    console.log('Session starts at : %d', Date.now());
    next()
});

app.use( (req, res, next)=>{
    if (!req.session.views) {
      req.session.views = {}
    }
  
    // get the url pathname
    var pathname = parseurl(req).pathname
  
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  
    next()
  });

app.get("/",(req,res)=>{
    //res.status(200).send("home page")
    //res.status(200).send(res.json({"search":req.query}));
    //res.status(200).send(req.cookies);
    //res.status(200).send(req.signedCookies);
    //res.status(200).send(req.sessionID);
    res.send('Session Views :  '+ req.session.views['/'] + ' times');
});

app.get("/setcookie",(req,res)=>{
    res.cookie("name","avinash", {maxAge:86400});
     res.send('Cookie has been set');
    
 });
 app.get("/getcookie",(req,res)=>{
    const name=req.cookies.name;
    if(name){
        return res.send(name)
    }
    return res.send("no cookies found");
    
 })


app.get("/admin.html",(req,res)=>{
    res.status(200).send("hello admin html page");
});


app.get("/tv/:brand/:model",(req,res)=>{
    res.send(req.params);
});


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
});