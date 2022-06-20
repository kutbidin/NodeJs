const http=require('http');
const fs=require('fs');

if(!fs.existsSync('./log/')){
    fs.mkdir('./log/',()=>{
        console.log('log folder created');
    });
}
const fwriter=fs.createWriteStream('./log/log.txt');
const hostName='127.0.0.1';
const port= 3000;  //process.env.PORT; //3000;
const server=http.createServer((req,res)=>{
    //res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    res.write('first line by Write \n',()=>{console.log('Error \n');})
    res.end('Hello Node \n');
    fwriter.write(` \n request url : http://${hostName}:${port}${req.url}`);
});
server.listen(port,hostName,()=>{
    fwriter.write(' \n  Server is started -----');
    console.log(`Server is Running at http://${hostName}:${port}/`);
});
server.on('close',()=>{
    fwriter.end(' \n ----- Server is Closed');   
});