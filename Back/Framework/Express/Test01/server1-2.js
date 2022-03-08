const http = require('http');

const server = http.createServer((req, res)=> {
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('server out')
})
.listen(8080);

// on( event명, callback(){ } ) 
// addListener( event명, callback(){ } ) 
// : 이벤트 이름과 이벤트 발생 시의 callback을 연결짓는다. (이벤트 리스닝)
// : 하나의 이벤트에 여러개의 callback을 붙일 수 있다.
server.on('listening', () =>{
  console.log("Listening on http://localhost:8080");
})
server.on('error', ()=>{
  console.error(error);
});