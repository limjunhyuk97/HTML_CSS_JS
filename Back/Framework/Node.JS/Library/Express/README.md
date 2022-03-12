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

## [미들웨어 사용하기](https://expressjs.com/ko/guide/using-middleware.html#middleware.third-party)

- express는 일련의 미들웨어 함수들의 집합이라 볼 수 있다.
  - 미들웨어 : Web server(정적 페이지의 처리) 또는 WAS(동적 페이지의 처리)

## 라우터 만들기

- 예시

```js
// 각 페이지 js 파일 import
import Home from "./pages/home.js"
import Login from "./pages/login.js"

const $ = document;

// router 함수의 정의 (async)
const router = async () => {

  // routes 배열의 정의 : (경로 , view : 실제 위치)
  // view 설정을 통한 랜더링 진행
  const routes = [
    { path : "/" , view : Home },
    { path : "/home" , view : Home },
    { path : "/login", view : Login },
  ];

  const pageMatches = routes.map(route=>{
    return {
      route,
      isMatch : route.path === location.pathname
    };
  });

  let match = pageMatches.find(pageMatch => pageMatch.isMatch);
  const container = $.querySelector("#container");
  container.innerHTML=``;

  if(!match) {
    container.innerHTML=`<h1>404 Not Found</h1>`
  }
  else {
    const page = new match.route.view();
    // promise 객체로 전달된 요소들을 container에 appendchild
    const elements = await page.getPage();
    elements.forEach(element => {
      container.appendChild(element);
    });
  }

}

// 정의한 route 함수를 바탕으로 event를 구현한다.
// HTML 모두 load 되었을 때(DOMContentLoaded 사용)
// : click 들에 대한 이벤트 부과
// : router() 함수 호출
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", event => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      history.pushState(null, null, event.target.getAttribute('href'));
      router();
    }
  });
  router();
})

// popstate 이벤트로 브라우저의 뒤로가기 이벤트 발생 시에 뒤로 가도록 설정
// 히스토리 엔트리 간의 이동이 발생할 때 popstate 이벤트 발생
window.addEventListener("popstate", ()=>{
  router();
});
```




