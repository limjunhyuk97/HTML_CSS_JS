# HTTP 모듈 사용하여 서버 만들기

- express 사용 전에 node.js의 HTTP 모듈 사용하여 실제 서버 동작 과정에 대한 학습 진행

## 목차

### [01. 요청과 응답의 이해](#01-요청과-응답의-이해)

### [02. REST와 라우팅 사용](#02-rest와-라우팅-사용)

### [03. 쿠키와 세션](#03-쿠키와-세션)

### [04. https와 http2](#04-https와-http2)

### [05. cluster](#05-cluster)

## 01. 요청과 응답의 이해

- http 모듈을 통해서 서버를 만들고 하나의 요청에 대한 하나의 응답을 보내는 과정을 수행하는 예시 코드

- 예1

```js
// server 열기

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
```

- 예2

```js
// server 열고, on으로 여러 event listening 수행

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
```

- 예3

```js
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
```

- 예4

```js
// 미리 만들어둔 html 파일 -> fs 모듈로 읽어서 전송
const http = require('http');
const fs = require('fs').promises;  // 파일을 읽어들이는 fs 모듈을 promise 형식으로 바꿔주는 방법으로 사용

http.createServer( async (req, res)=>{
  try {
    const data = await fs.readFile('./server2.html'); // 비동기적으로 data 가져옴
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  }
  catch(err) {
    console.error(err)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });  // 에러가 발생했다면 500 error 내보낸다.
    res.end(err.message);
  }
})
.listen(8081, ()=>{
  console.log("http://localhost:8081");
});
```

## 02. REST와 라우팅 사용

- 서버에 보내는 **요청은 주소를 통해 표현**되며, html만 요청할 수 있는 것이 아니고, css, js, img 파일들도 요청할 수 있다.
- 그러므로 **서버가 이해하기 쉬운 주소를 사용하는 것이 좋다.**

### REST

- REpresentational State Transfer 의 줄임말
- **서버의 자원에 대한 주소 지정의 방식**을 뜻함. RESTful API에는 다양한 규칙이 존재
- **구성요소**
  1. **자원** : **URI** 를 통해 자원을 명시
  2. **자원에 대한 행위** : 행위인 **HTTP Method**를 통해 CRUD(Create/Read/Update/Delete) 적용
  3. **자원에 대한 행위의 내용** : **HTTP Message Pay Load**

### REST API

- REST 기반으로 만들어진 API

### HTTP Method



## 03. 쿠키와 세션

## 04. https와 http2

## 05. cluster