# Express

## 개요

- Node.Js를 위한 빠르고 개방적인 웹 프레임워크. 즉, Node.Js를 사용하여 서버를 개발하고자 하는 개발자들을 위해 서버를 구성할 수 있게 만든 프레임워크
  - 정적파일과, 데이터베이스에서 가져온 서버자원들의 수가 많아지면, http모듈을 사용하여 if / else 를 남발하며 서버를 구성할 수는 있으나, 가독성이 떨어지게 된다.
  - 이러한 문제에 효과적으로 대처 가능
- 자체적인 최소한의 기능을 갖춘 **라우팅 및 미들웨어 웹 프레임워크**
- Express 애플리케이션은 기본적으로 **일련의 미들웨어 함수 호출**이다!

## express 설치

```bash
npm install express
```

## server 시작하기

- 3000번 포트에서 server에 대한 연결읠 청취
- root URL 또는 Route에 대한 요청에 응답하게 구성한 예
- 다른 경로에 대해서는 404 로 응답함

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

## express generator

- express를 사용하기 위한 뼈대를 제공한다.
- **generator package 설치**

```bash
// 뼈대 생성 위한 패키지 설치 // 
npm install -g express-generator
```

- **generator로 뼈대 생성**

```bash
// 뼈대 생성 //
express 디렉토리위치경로 --view=ejs testServer

// (생성 결과) //
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.ejs
    └── index.ejs
```

- **package.json** : 모듈 의존성에 대한 정보와 프로젝트 명세에 대한 정보 들이 모여있는 파일
- **public** : 정적파일들 저장. js, css, 이미지 파일을 저장
- **routes** : 라우팅할 url path들에 대한 로직들을 저장
- **views** : 서버가 랜더링하는 template들을 저장 / .ejs 파일들 저장

## 라우터와 미들웨어

### 라우터

- app.set(key, value)

- app.get(key) : app.set 에서 세팅한 key에 대한 value 값을 가져올 수 있다.

- app.get(주소, (req, res) => {})

- app.post()

- app.patch()

- app.delete()

- app.options()

- app.listen(포트, callback)

### 미들웨어

- **app.use(주소, 미들웨어, 미들웨어 ..) / app.get(주소, 미들웨어, 미들웨어 ..) 꼴**
  - 미들웨어로 **(req, res, next) => { }** 의 함수를 사용
    - 하나의 라우터에 미들웨어를 여러개 끼워넣을 수 있다.
    - **req를 보낼 수 있다면 next()로 안가**고 / **req 보낼 수 없으면 next()로 간다**.
    - **req를 보낼 수 있다**는 것 = **res.send() , res.sendFile() 등 존재**한다는 것.
    - next() 코드가 아예 없으면, 다음 미들웨어 실행 안된다.
  - 주소를 첫번째 인자로 넣지 않으면 : 모든 요청에서 실행
  - 주소를 첫번째 인자로 넣으면 : 특정 요청에서만 실행

- **next()**
  - next('route') : 다음 라우터의 미들웨어를 바로 실행
  - next(err) : err가 에러처리 미들웨어의 변수가 됨

- 에러처리 미들웨어 **app.use((err, res, req, next)=> {}) 꼴**
  - 에러처리 미들웨어는 반드시 인자가 네개 필요
  - 마지막 위치에서 에러들을 처리한다.

#### 미들웨어 활용

- **req.data에 데이터 저장**
  - session 단위의 데이터 저장은 session이 종료될때까지 데이터 유지됨
  - req.data에 정보를 저장하여, **1 요청 단위**로 **미들웨어 간의 데이터 공유** 가능
- **조건문에 따른 미들웨어 적용**
  - 분기를 활용하여 특정 조건일 때에만 미들웨어를 적용

```js
// 두 경우는 같다
app.use(morgan('dev'));
app.use((req, res, next)=> {
  morgan('dev')(req, res, next);
})

// 예시
app.use((req, res, next)=> {
  if(process.env.NODE_ENV === 'production'){
    morgan('combined')(req, res, next);
  }
  else {
    morgan('dev')(req, res, next);
  }
})
```

### static

- express에서 자체적으로 지원. 정적 파일들을 제공하는 라우터 역할 수행
- 서버의 폴더경로와 요청경로를 다르게 할 수 있다. (파일 구조를 숨킬 수 있음)
- 정적폴더들을 알아서 제공해줌
  - 요청경로에 해당하는 파일이 없으면 : next() 호출 / 즉 다음 미들웨어 실행O
  - 요청경로에 해당하는 파일이 있으면 : 다음 미들웨어 실행X (응답으로 파일을 보냄)

```js
app.use('/', express.static(__dirname, "실제 위치 경로"))
```

### express.json() express.urlencoded()

- req의 body 부분의 정보를 req.body로 읽을 수 있게 지원해주는 미들웨어
  - express.json() : 요청 본문에 json 형식으로 데이터 전달된 경우
  - express.urlencoded() : 요청 본문에 url-encoded 형식으로 데이터 전달된 경우
    - express.urlencoded({ **extended : true** }) : 폼 전송 시, querystring 모듈로 querystring 해석
    - express.urlencoded({ **extended : false** }) : 폼 전송 시, qs 모듈(내장모듈 X)로 querystring 해석

```js
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
```
