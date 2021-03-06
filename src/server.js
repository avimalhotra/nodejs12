const express=require('express');
let app=express();
var path=require('path');
var cookie=require('cookie-parser');
var bodyParser=require('body-parser');
var session=require('express-session');
var parseurl=require('parseurl');
require('dotenv').config();
app.use(express.static('src/public'));

const nunjucks=require("nunjucks");

//nunjucks.configure('public', { autoescape: true });

nunjucks.configure(path.resolve(__dirname,'public'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'public/ejs'));

app.use(cookie());
app.use(bodyParser.text());
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
    //res.send('Session Views :  '+ req.session.views['/'] + ' times,, session id'+ req.sessionID );
    //.render("index",{ month:["jan","feb"],user:{ name:"abcd",id:212  }});
    //res.render("index.html",{ name:"avi" });
    res.render("home.html",{ month:["jan","feb"],user:{ name:"abcd",id:212  }});
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


var data=[
        [1,23,45,66,34,56,78],
        [2,23,45,66,34,56,78],
        [3,23,45,66,34,56,78],
        [4,23,45,66,34,56,78],
        [5,23,45,66,34,56,78],
    ];
    

app.get("/api",(req,res)=>{
    res.header('Access-Control-Allow-Origin',"*");
   return res.status(200).send(data);
})
app.post("/api",(req,res)=>{
    var input=req.body.split(":")[1];              // from ajax send method
    input=Number(input)-1;
    res.header('Access-Control-Allow-Origin',"*");
   
    return res.status(200).send(data[input]);

})




app.post("/login",(req,res)=>{
   
    //console.log(`Name is ${req.body.username} and password is ${req.body.userpass}`);
    //res.send(req.query)
    //res.json(req.body);

    //res.json({"parameters":req.body});
   //res.render("login",{user:{name:req.body.username, id:req.body.userpass}})
   res.render("login.html",{user:{name:req.body.username, id:req.body.userpass}})
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
app.listen(process.env.PORT,process.env.IP,()=>{
    console.log(`server running at http://127.0.0.1:3000`)
});