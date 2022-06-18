const http = require('http');

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, { 'Set-Cookie' : 'mycookie=test'});
  res.end('Hello Cookie');
})
.listen(8083, ()=>{
  console.log("http://localhost:8083");
})

/* 
첫 request에서 

/ undefined
/favicon.ico mycookie=test

의 결과가 나타나는데, 브라우저가 파비콘이 뭔지 유추할 수 없으면 
서버에 파비콘에 대한 요청 또한 보내기 때문!
*/