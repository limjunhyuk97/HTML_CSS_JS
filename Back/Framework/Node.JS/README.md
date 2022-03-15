# Modules For Back

## 01. dotenv

- process.env.**(key)=(value)**에 해당내용 .env 파일에 담아서 따로 관리한다.
- .env 파일을 생성, 보안과 설정 관련된 내용을 넣어두고 / dotenv 패키지를 통해 비밀 key의 value 로딩
- .gitignore로 .env의 push를 제한하여 보안 관련 내용이 소스코드와 함께 유츌되는 것 방지 가능

```js
dotenv.config()
```

## 02. morgan

- 요청과 응답에 대한 정보를 console에 기록
- morgan(인수) / 인수 목록
  - dev (개발환경에서 사용유용)
  - combined (배포환경에서 사용유용)
  - common 
  - short
  - tiny ..

```js
app.use(morgan('dev'));
```

## 03. body-parser

- **요청의 본문에 있는 데이터 해석 -> server측에서 req.body 객체로 만들어주는 미들웨어**
- form 데이터, AJAX 요청 처리
  - json : express에 내장 / 요청 본문에 json 형식으로 데이터 전달된 경우
  - url-encoded : express에 내장 / 요청 본문에 url-encoded 형식으로 데이터 전달된 경우
    - express.urlencoded({ **extended : true** }) : 폼 전송 시, querystring 모듈로 querystring 해석
    - express.urlencoded({ **extended : false** }) : 폼 전송 시, qs 모듈(내장모듈 X)로 querystring 해석
  - raw : 요청 본문이 buffer 데이터일 경우 처리
  - text : 요청 본문이 text 데이터일 경우 처리

```js
// body-parser의 json, url-encoded 에 대해서는 이미 express에서도 지원
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// raw, text
const bodyParser = require('body-parser')
app.use(bodyParser.raw());
app.use(bodyParser.text());
```

## 04. [cookie-parser](https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-bodyParser-cookieParser-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4)

- 쿠키 생성 시에 사용하는 것은 아님
- **비밀키와 서명생성**
  - 내가 만든 쿠키임을 검증하기 위한 수단으로 사용
  - 비밀키 -> 서명생성 -> cookie뒤에 붙인다.
- **요청에 동봉된 cookie를 해석**하여 req.cookies 객체를 만든다.
  - 서명 X : name = lim -> **req.cookies = { name : 'lim' }**
  - 서명 O : name = lim -> **req.signedCookies = { name : 'lim.서명' }**
- **응답에 cookie 생성**하여 보내기 **res.Cookie(key, value, options)**
  - 서명 X : res.cookie('name', 'lim', {maxAge : , path : , ...}) 
  - 서명 O : res.cookie('name', 'lim', {maxAge : , path : , **signed : true**, ...})
- **응답에 cookie 제거**하도록 보내기 **res.clearCookie(key, value, options)**
  - 제거 시에는 expires, maxAge 옵션 외에 모든 옵션이 같아야 제거가 됨

### 옵션

- maxAge : 만료 시간을 밀리초 단위로 설정
- expires : 만료 날짜를 GMT 시간으로 설정
- path : 쿠키의 경로 디폴트 값은 "/"
- domain : 도메인 네임 디폴트 값은 "loaded"
- secure : https에서만 쿠키를 사용할 수 있도록 한다
- httpOnly : 웹서버를 통해서만 쿠키에 접근할 수 있도록 한다
- signed : 쿠키에 대한 서명을 지정한다

```js
app.use(cookieParser(비밀키));

// app.use(cookieParser(process.env.COOKIE_SECRET));
// .env => COOKIE_SECRET=cookiesecret
```

## 05. express-session

- 세션 관리용 미들웨어이다.
- 세션 구현 / 특정 사용자 위한 데이터 임시저장에 매우 유용하다.
  - server -> Client : 세션 생성
  - Client -> server : 세션 식별 

```js
app.use(session({
  resave : false, // 요청왔을 때 수정사항 없더라도 session 새로저장할 지 여부
  saveUninitialized : false, // 세션에 저장할 내역이 없어도 처음부터 세션 생성할 지 설정
  secret : process.env.COOKIE_SECRET, // 세션쿠키에 대한 서명 위한 값 설정
  cookie : {  // 세션쿠키에 대한 설정
    httpOnly : true,
    secure : false
  },
  name : 'session-cookie',  // 세션 쿠키의 이름 설정
}));

req.session.save()  // 해당 클라이언트에게 세션이 발급됨.
req.session.name  // 세션 아이디명. 즉, key 값.(기본 : connect.sid)
req.sessionID // 세션 아이디

// 예시
const express = require('express');
const router = express.Router();
router.post('/auth', (req, res) => {
    req.session.userId = req.body.userId;
    req.session.save();
    res.send();
}
router.get('*', (req, res) => {
    res.sendFile('./index.html');
}
module.exports = router;
```