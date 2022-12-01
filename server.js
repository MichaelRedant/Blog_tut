const http = require('http');
const fs = require('fs');
const _ = require('lodash'); //npm package library

const port = 3000;
const server = http.createServer((req, res)=>{
    //lodash
    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(() =>{
        console.log('hello');
    })

    //set header content-type
    res.setHeader('content-type','text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301; //resource has been moved
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    };

    //send html file
    fs.readFile(path, function(err, data){
        if (err){
            console.log(err);
            res.end();
        }else{
            //res.write(data);
            
            res.end(data);
    }
});
    
});

server.listen(port, 'localhost', () => {
    console.log('listening on port ' + port);
});