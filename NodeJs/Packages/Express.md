# Express

## 개요

- NodeJs를 위한 빠르고 개방적인 웹 프레임워크. 즉, NodeJs를 사용하여 서버를 개발하고자 하는 개발자들을 위해 서버를 구성할 수 있게 만든 프레임워크
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

## [미들웨어 사용하기](https://expressjs.com/ko/guide/using-middleware.html#middleware.third-party)

- express는 일련의 미들웨어 함수들의 집합이라 볼 수 있다.
  - 미들웨어 : Web server(정적 페이지의 처리) 또는 WAS(동적 페이지의 처리)

## 라우터 만들기

```js
// 예..
import login from "./pages/login.js"
import main_logout from "./pages/main_logout.js"

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
}

const router = async() => {

  // route 에 각 path 정보, view 정보 저장
  const routingTable = [
    {path : "/", view: main_logout},
    {path : "/login", view: login},
  ];

  // route : 배열 내 객체 요소 그대로
  // isMatch : 경로정보
  // match = {route, isMatch} 로 이루어진 새로운 배열
  const pathTable = routingTable.map((route)=>{
    return {
      route : route,
      isMatch: location.pathname === route.path,
    }
  });

  // match 에 경로가 일치하는 특정 객체{route, isMatch}가 들어감
  let match = pathTable.find((route) => route.isMatch);

  // match가 없다면, 즉 일치하는 경로가 없다면 main으로 이동해라
  if(!match) {
    match = { 
      route: pathTable[0],
      isMatch: true
    };
  }

  // import한 js 파일에서 export 하는 인스턴스 생성
  const view = new match.route.view();

  document.querySelector("#contents").innerHTML = await view.getContainer();
  document.querySelector("#footer").innerHTML = await view.getFooter();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
          e.preventDefault();
          navigateTo(e.target.href);
      }
  });
  router();
});
```




