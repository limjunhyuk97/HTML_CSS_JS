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
- 요청과 응답은 이벤트 리스너 방식으로, 요청에 대한 응답을 미리 정의해두는 것이 서버에서 하는 일이다!

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
- **REST의 이점**
  1. 주소와 메소드만으로 내용 이해 가능하다.
  2. GET의 경우 캐싱이 가능하다는 이점이 있다.
  3. 서버, 클라이언트의 분리로, 서버 확장 시 클라이언트에 구애받지 않는다.

### REST API

- REST 기반으로 만들어진 API

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/158003035-42dd4a93-ad85-4bae-ac69-02720d423131.png" width="50%"></p>

### HTTP Method

- REST 에서 주소 정보 외에 사용하는 작업 정보

#### GET

- 서버 자원 가져올 때 사용
- 요청 본문에 데이터 X (데이터가 필요하면 querystring에 넣어서 보냄)

#### POST

- 서버 자원 새로등록할 때 사용
- 요청 본문에 데이터 O

#### PUT

- 서버 자원, 요청에 들어있는 자원으로 치환할 때 사용
- 요청 본문에 데이터 O

#### PATCH

- 서버 자원, 요청에 들어있는 자원으로 일부 수정할 때 사용
- 요청 본문에 데이터 O

#### DELETE

- 서버 자원 삭제하고자할 때 사용
- 요청 본문에 데이터 X

#### OPTIONS

- 요청 전에 통신 옵션 설명하기 위해 사용

## 03. 쿠키와 세션

- 클라이언트가 보내는 요청이 **누가 보내는 요청인지 확인**하기 위해서 **로그인 을 구현**해야 함
- **로그인 구현** 위해서 **쿠키, 세션**이 필요 (웹 사이트 방문 시 내부적으로는 쿠키와 세션을 이용함)

### 쿠키

- **서버** : 미리 클라이언트에 요청자를 추적할 수 있는 수단인 **쿠키를 만들어 제공**
- **클라이언트** : **다음 request** 부터는 **헤더의 'Cookie'에 담겨** 보내진다.
- 쿠키는 문자열 형식으로 존재, 세미콜론으로 구분됨
- 유효기간이 있고, key(name)-value 쌍으로 존재
- 쿠키에는 한글과, 줄바꿈이 들어가서는 안된다! (한글을 encodeURIComponent로 인코딩하는 방식 사용 가능)
- 구성
  - 쿠키명=쿠키값
  - Expires=만료기한 (만료일자)
  - Max-age=초 (Expires보다 우선되면, 특정 '초'가 지나면 쿠키는 만료된다)
  - Domain=도메인명 (쿠키가 전송될 도메인 특정 가능, 기본값은 현재 도메인)
  - Path=URL (쿠키가 전송될 URL 특정가능, 기본값은 '/' : 이 경우 모든 하위 URL에서 쿠키 전송 가능)
  - Secure (HTTPS일 경우만 쿠키를 전송)
  - HttpOnly (JS에서 쿠키에 접근 불가능하며, 쿠키 조작 방지를 위해 설정이 요구된다.)

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/158006076-860216a9-d57f-4ad9-b9af-bcea52f2f1ea.png" width="50%"></p>

### 세션

- 사용자 정보는 Server, DB에서만 다루고, 연관된 세션ID를 생성하여 클라이언트에 대한 인증 수행
- 세션 ID는 반드시 쿠키로 전달될 필요는 없다.

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/158010522-a89bce03-c5c5-4b5b-8439-dca86e5be921.png" width="50%"></p>

## 04. https와 http2

- https : 웹서버에 SSL 암호화를 추가하여, GET - POST 요청 시 오가는 데이터를 암호화 하여 다른 사람이 중간에서 정보를 가로채갈 수 없도록 한다.
- http/2 : http2 모듈로 사용할 수 있으며, http/1.1 보다 효율적으로 웹 요청, 응답의 과정을 수행할 수 있게 한다.

## 05. cluster

- 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
- 1코어당 1노드 프로세스 동작하게 할 수 있지만, 메모리가 공유되지 않기 때문에 공유되지 않은 session 데이터와 같은 이슈가 발생할 수 있다.