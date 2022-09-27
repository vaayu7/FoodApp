const { write } = require('fs');
const http = require('http');
const fs=require('fs');

const server=http.createServer((req, res)=>{
    console.log('request has been made from server to browser');

    let path = './views';

    switch(req.url){
        case '/' :
            path+='/index.html';
            break;
        case '/about' :
            path+='/about.html';
            break;
        default :
            path+='/Error.html';
            break;
    };
    fs.readFile(path,(err, filedata)=>{
        if(err){
            console.log('err');
        }else{
            res.write(filedata);
            res.end();
        }
    })
   // res.setHeader('Content-Type','text/plain');
    //res.write('hello checking response on server');
   // res.end();
});

server.listen(3000, 'localhost', ()=>{
    console.log('server is listening on port 3000');
});
