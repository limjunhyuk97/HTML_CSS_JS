// server 여러개 동시에 열기

const http = require('http');

const server1 = http.createServer((req, res)=> {
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('server1 out')
})
.listen(8080, ()=>{
  console.log("http://localhost:8080");
});

const server2 = http.createServer((req, res)=> {
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('server2 out')
})
.listen(8081, ()=>{
  console.log("http://localhost:8081");
});