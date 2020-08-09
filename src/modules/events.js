const event=require('events').EventEmitter;
let emitter=new event();

module.exports=emitter;

 fs.ReadStream('src/data.txt').on("open",()=>{
     console.log("file is open");
 });

emitter.on("login",(x)=>{
    console.log(`login process started at ${x}` );
});
emitter.on("login",(y)=>{
    console.log(`login session started at ${y}` );
});
emitter.on("sessionStart",(x)=>{
    console.log(` session started` );
    x.handled=true;
});
emitter.on("sessionStart",(x)=>{
    if( x.handled==true){
        console.log(` session already started` );
    }
    else{
        console.log(` session not started` )
    }
});

emitter.once("callonce",()=>{
    console.log(" only once");
});

function eventHandler(){
    console.log(`handled`);
    
    // unsubscribe
    emitter.removeListener("done",eventHandler);
}

emitter.on('done',eventHandler);



// import login and account
let login=require('./login');
let account=require('./account');



//emitter.emit("login",10);
//emitter.emit("login",12);
//emitter.emit('sessionStart',{ handled:false})

//emitter.emit('callonce');


//emitter.emit('done');        // will emit
//emitter.emit('done');         // will not emit

emitter.emit("logIn",10);
emitter.emit("account");
