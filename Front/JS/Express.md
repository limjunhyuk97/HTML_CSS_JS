# Express

## express 란?

- NodeJs를 위한 빠르고 개방적인 웹 프레임워크. 즉, NodeJs를 사용하여 서버를 개발하고자 하는 개발자들을 위해 서버를 구성할 수 있게 만든 프레임워크

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
npm install -g express-generator

```

- **generator로 뼈대 생성**

```bash
express --view=ejs testServer

// 생성 //
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









