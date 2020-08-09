const http=require('http');
const ip='127.0.0.1';
const fs=require('fs');

const port=3000;

// http.createServer((req,res)=>{
//     res.end("hello node http server");
// }).listen(3000);


var server=http.createServer((req,res)=>{
    //res.end(req.url);
    //res.end(req.method);
    //res.end(req.httpVersion);

    //res.statusCode=200;
    //res.setHeader('Content-Type','text/html');
    //res.writeHead(200,{'Content-Type':'text/html'});
    //res.end("hello node js");

    fs.readFile('./src/home.html',(err,data)=>{
        if(err){
            res.writeHead(404);
            res.write(err);
            res.end();
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        }
       
    })
});

server.listen(port,ip,()=>{
    console.log(`server running at http://${ip}:${port}`);
})
