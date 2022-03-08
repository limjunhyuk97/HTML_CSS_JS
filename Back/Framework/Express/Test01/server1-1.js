const http = require("http");

http.createServer((req, res)=>{
  // res 객체의 writeHead, write, end 메소드
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});  // header에 응답에 대한 정보 기록 (HTTP status code, 응답에 대한 정보: HTML 형식이며, utf-8의 인코딩 방식 사용) 
  res.write('<h1>Hello Node!</h1>');  // body에 대해서 클라이언트로 보낼 데이터
  res.end('<p>Hello Server!</p>') // 응답을 종료하는 메소드이고, 인수가 있다면 해당 데이터도 클라이언트로 보낸다.
})

// listen 메소드 : 8080 포트로 listening , callback() 호출
.listen(8080, ()=>{
  console.log("Listening on port 8080");
});