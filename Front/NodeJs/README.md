# Node.js

## Node.js 개요

- **Chrome V8 Javascript 엔진으로 빌드된 JavaScript 런타임(Java Script 동작환경)**

  - 로컬 런타임(동작환경) 제어
  - 브라우저 런타임(동작환경) 제어
  - js 를 사용한 여러 패키지를 이용가능한 환경 제공
  - js 를 이용한 동적인 웹 환경을 테스트 할 수 있는 환경 제공
  - 서버 애플리케이션을 실행시키는데 많이 사용된다.

- **nvm : nodejs 버전을 변경할 수 있도록 해주는 프로그램**

  - (mac 기준) brew install nvm : nvm 설치
  - node : node.js 환경 실행 가능
  - .exit : node.js 환경 종료
  - node --version : node.js version 확인
  - nvm --version : nvm version 확인
  - nvm use \<version> : 특정 버전 node.js 사용 가능
  - nvm ls : 현재 설치된 node.js 버전들 확인 가능
  - nvm install \<version> : 특정 버전의 node.js 설치
  - nvm uninstall \<version> : 특정 버전의 node.js 제거
  - nvm --help : nvm 명령들 확인 가능

- **npm(node package manager) : 여러 패키지(기능/모듈)들을 설치 및 관리해주는 매니저**

  - npm init -y : package-json 기본값을 세팅한다.
  - npm install \<package\>@\<version\> : 특정 패키지를 설치한다. / 제일 최신 버전의 package로 update 한다.
  - node package를 설치 : node_modules 디렉토리에 모듈이 설치되고, package-json에 dependency가 추가된다.
    - **npm install \<package\> -D : devDependencies에 설치됨**
      - **개발 의존성 패키지 : 패키지가 개발시에만 필요하고, 브라우저에서 동작 시에는 필요 없는 패키지이다.**
    - **npm install \<package\> : dependencies에 설치됨**
      - **일반 의존성 패키지 : 브라우저에서 동작 시에 필요한 패키지이다.**
  - package-json에 한번 dependency가 추가되어있다면 : npm install i(nstall)을 통해서 node_modules에 모듈 재설치 가능하다.
    - npm install i : 한번 설치한 패키지 재설치
  - npm info \<package\> : package 에 대한 설명과 최신 버전 정보 확인

- **nodejs package 설치 위치**

  - 전역에 설치된 package : 의존성 라이브러리를 전체적으로 관리함
  - 특정 프로젝트에만 설치된 package : 특정 프로젝트 내에서만 관리됨

- **npx : npm 5.2.0 버전부터 새로 추가된 도구**
  - 언제 쓰는가?
    - npm run-script를 사용하지 않고, **로컬에 설치된 package를 사용할 경우** 사용할 수 있다.
    - **일회성 명령으로 package를 실행시킬 경우** 사용할 수 있다.

```bash
- 로컬에 설치된 nodemon 실행가능 -
npx nodemon app.js
```

- nodejs는 파일 하나를 하나의 모듈로 간주한다.

## Node 특성

- JS Runtime, 이벤트 기반, non-blocking 처리, 싱글스레드

### JS Runtime

- Chrome V8 JS 엔진으로 빌드된 JS 런타임이다.
- 즉, JS 실행환경이다
- **Node 내 JS 실행과정**
  - 함수가 호출된 순서대로 call stack에 쌓이게 된다.
  - call stack에 가장 위에 쌓인(가장 늦게 호출된) 함수부터 실행이 된다.
  - 그 과정에서 WEB API 로 제공되는 함수나, 타이머, 이벤트 리스너가 call stack에 들어오게 되면 callback을 background로 보낸다. 그리고 해당하는 함수, 타이머나, 이벤트 리스너는 call stack에서 빠진다.
  - background에서는 여러 작업이 동시에 수행될 수 있는데, 실행이 완료되어 callback을 실행할 준비가 끝나면, callback들은 task queue로 보내진다.
  - call stack이 비어있다면, task queue에서 기다리던 callback은 event loop가 정하는 순서에 따라 앞에서부터 call stack으로 다시 들어가게 되고 실행된다.

### 이벤트 기반

- **이벤트 기반이란?**
  - 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식
  - 이벤트의 종류 : 클릭, 네트워크 요청 등..
  - 이벤트 발생 시 취할 행동의 등록 = 이벤트 리스너에 콜백함수 등록
- **Node는 이벤트 기반으로 동작한다.**

### non-blocking I/O 모델

- 기본적으로 JS 코드 자체는 동시에 실행될 수 없으나, **I/O 작업, 네트워크 요청 같은 작업은 동시에 처리될 수 있다.**
  - I/O 작업, 네트워크 요청 같은 작업은 non-blocking으로 처리가능하다.
  - **I/O 작업, 네트워크 요청 같은 작업은 비동기 처리 가능**하다.
  - **비동기로 처리해야 시간적으로 이득**을 볼 수 있다.
- **비동기 - non-blocking**
  - 백그라운드를 호출하며 콜백을 전달한다.
  - 백그라운드에서 바로 return이 돌아온다.
  - return이 돌아와서 노드는 다른 일을 수행할 수 있게 된다.
  - 나중에 백그라운드가 알림을 주면 그때 완료된 백그라운드 작업을 받아 처리한다.
- **동기 - blocking 방식 이란?**
  - 백그라운드를 호출한다.
  - 백그라운드 작업 완료 여부를 계속 확인한다.
  - 백그라운드의 작업이 완료되어서야 return 된다.
  - 백그라운드의 작업이 완료되기까지의 시간동안 노드는 다른 일을 수행하지 못한다.

### 싱글 스레드

- 싱글 스레드 non-blocking 모델이 node의 주된 동작 방식이다.
- I/O 작업을 처리할 때에는 node가 멀티 프로세싱을 지원한다.
- node는 많은 I/O를 감당할 수 있다 = 개수는 많지만 크기가 작은 데이터의 송수신을 잘 감당할 수 있다 = 채팅, 주식차트 등..

## package.json

- [참고](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174371/package-json)
- 프로젝트 명세 (이름, 버전, 홈페이지, 저자 등..) 에 대한 정보를 갖고 있다.
- 현재 프로젝트가 의존하고 있는 확장 모듈에 대한 정보를 갖고 있다.
- 협업을 위해서 각자의 컴퓨터에 같은 패키지를 설치하는 과정에서 사용 가능하다.
- **version 정보를 저장할 때 version range를 사용한다.**
  - npm 버전이 다른 경우, 서로 다른 node_modules 트리가 생성될 수 있다.

## package-lock.json

- **version range를 사용하지 않고 정확한 version을 명시한다.**
- node_modules 구조, package.json이 수정 및 생성될 당시의 의존성에 대한 정확하고 구체적인 정보를 갖음.
  - **즉, package A가 사용하는 다른 package B에 대한 정보들도 갖고 있다.**
- npm install 을 사용하면 자동으로 생성된다.
- package-lock.json 이 있는 경우, 이를 바탕으로 npm install 이 진행된다.

## node_modules

- package.json에 있는 모듈 뿐만 아니라, package.json에 있는 모듈들이 의존하고 있는 모듈 전부에 대한 정보를 갖고 있다.
- 현재 프로젝트에 설치되어 있는 특정 모듈의 버전에 대한 정보를 확인할 수 있다.

## package 실행

### npm script

- **외부모듈의 실행**
- package.json 파일의 "scripts"에 node 실행문을 추가한다.
- node_modules/.bin 폴더의 실행파일을 node 명령어 없이 직접 실행시키는 방식이다.
- 해당 실행파일은 0과 1로 구성된 바이너리 파일이므로 자체 실행이 가능하다.
- 예시
  - "dev" : index.html 기준으로 개발 서버를 오픈하겠다.
  - "build" : index.html 기준으로 제품을 빌드하겠다.

```bash
"scripts" : {
  "dev" : "parcel index.html",
  "build" : "parcel build index.html"
}

$ npm run dev
$ npm run build
```

### node

- **node_modules 아래에 있는 외부 모듈 실행**
- node 명령어는 js 파일을 실행시킬 수 있으므로, 경로를 직접 지정해주어 실행시키는 방식이다.

```bash
$ node node_modules/parcel-bundler/bin/cli.js index.html
```

### npx

- **모듈의 일회적 실행 / node_modules 아래에 있는 모듈 실행**

```bash
$ npx parcel-bundler index.html
$ npx parcel index.html
```

### \<package 명\> index.html 같은 방식으로 실행이 안되는 이유

- **Shell 입장에서는 \<package 명\> 이라는 환경변수는 존재하지 않으므로 당연히 실행이 안된다.**

## 유의적 버전 (Semantic Versioning = SemVer)

- 특정 시점의 상태에 대한 식별 가능한 유일한 이름을 지정하는 것.
- **^Major.Minor.Patch**
  - Major : 기존 버전과 호환O. 새로운 버전
  - Minor : 기존 버전과 호환X. 새로운 기능이 추가된 버전
  - Patch : 기존 버전과 호환O. 버그, 오타 등이 수정된 버전
  - ^ : Major 버전 안에서 가장 최신 버전으로 업데이트 가능하다는 의미 (npm update \<package\> 시 최신버전으로 업데이트 됨)

## git push 시 유의 사항

- 따로 버전관리 필요가 없는 폴더들은 git에 push 하지 않아도 된다. (예: node_modules, dist, .cache 등 ..)

## 내장 모듈

### url

- **인터넷 주소를 쉽게 조작**하도록 돕는 **노드 내장 모듈**이다.
- node에서 사용하는 url 구분 방식과, WHATWG에서 사용하는 url 구분 방식 두가지가 존재한다.
  - 아래 그림의 윗부분 구분 방식 : node에서 사용하는 url 구분 방식
  - 아래 그림의 아랫부분 구분 방식 : WHATWG에서 사용하는 url 구분 방식

<p align="center"><img width="781" alt="url" src="https://user-images.githubusercontent.com/59442344/157380862-1d0f8c06-6222-48f7-a534-c31783d403da.png"></p>

- URL / url.parse(), url.format 으로 url 주소 분해, 분석
- **url.parse() 방식을 통해서만 host 부분 없이 pathname 부분만 오는 주소의 경우를 처리 가능**

```js
const url = require("url");

// WHATWG 방식의 url 분석을 지원한다.
// 구조 분해 할당으로 url 모듈 내의 URL 생성자를 가져온다.
// URL 생성자에 url을 넣으면 WHATWG 형식으로 주소를 분해한 결과를 보여준다.
const { URL } = url;
const myURL = new URL("https://www.omdbapi.com/?apikey=7035c60c&s=frozen");
console.log("new URL(): ", myURL);
console.log("url.format(): ", url.format(myURL));
console.log("======================================");
console.log();

// 기존 node 방식의 url 분석을 지원한다.
// url.parse : node 방식으로 주소를 분해한 결과를 보여준다.
// url.format : url.parse()로 분해된 주소를 다시 합쳐준다.
const parsedURL = url.parse(
  "https://www.omdbapi.com/?apikey=7035c60c&s=frozen"
);
console.log("url.parse(): ", parsedURL);
console.log("url.format(): ", url.format(parsedURL));
```

#### search 부분의 query string 다루기

- require('url')을 통하여

  - **URL 객체를 생성하여 WHATWG 형식으로 주소를 분해**한 경우
  - **url.parse() 메소드를 사용하여 node 형식으로 주소를 분해**한 경우
  - 두 경우에서 query string을 다루는 방식이 다르다.

- **URL 객체 생성 : URL객체.searchParams 사용**

  - URL객체.searchParams
  - URL객체.searchParams.getAll(key정보)
  - URL객체.searchParams.get(key정보)
  - URL객체.searchParams.has(key정보)
  - URL객체.searchParams.keys()
  - URL객체.searchParams.values(key정보)
  - URL객체.searchParams.append(key정보, value정보)
  - URL객체.searchParams.set(key정보, value정보)
  - URL객체.searchParams.delete(key정보)
  - URL객체.searchParams.toString()

- **url.parse() 메소드 사용 : querystring 모듈 require**
  - querystring 모듈을 불러온 뒤
  - querystring.parse(url.parse(url 주소).query) : query 부분의 key, value 구성을 나눠 보여줌
  - querystring.stringify(url.parse(url 주소).query) : query 부분을 합친다.

```js
const url = require("url");
const querystring = require("querystring");

const parsedURL = url.parse(
  "https://www.omdbapi.com/?apikey=7035c60c&s=frozen"
);
const query = querystring.parse(parsedURL.query);
console.log(query);
console.log(querystring.stringify(query));
```

### fs

- **파일 시스템에 접근**하게 도와주는 **노드 내장 모듈**이다.
- 파일 생성, 삭제, 읽기, 쓰기 를 위한 기능 제공

#### promise 기반의 fs 모듈 사용

```js
const fs = require("fs").promises;

fs.writeFile("./test.txt", "testing now\n")
  .then(() => fs.readFile("./test.txt"))
  .catch((err) => console.error(err))
  .then((data) => console.log(data.toString()))
  .catch((err) => console.error(err));
```

#### fs 모듈의 동기적 / 비동기적 사용

- 동기적 사용을 위한 메서드 뒤에는 'Sync'가 붙음
- 동기적으로 처리 시에는 처리 순서가 보장되지만, 백그라운드에서의 작업 처리를 기다리는 시간이 발생하여 비효율성이 생길 수 있다.

```js
const fs = require("fs");
const fsA = require("fs").promises;

// 비동기적 사용 (1) 순서유지 + callback 지옥
fs.readFile("./test.txt", (err, data) => {
  if (err) throw err;
  console.log("1 " + data);
  fs.readFile("./test.txt", (err, data) => {
    if (err) throw err;
    console.log("2 " + data.toString());
    fs.readFile("./test.txt", (err, data) => {
      if (err) throw err;
      console.log("3 " + data);
    });
  });
});

// 비동기적 사용 (1) 순서무시 + callback
console.log("hello");
fs.readFile("./test.txt", (err, data) => {
  if (err) throw err;
  console.log("1)", data.toString());
});
fs.readFile("./test.txt", (err, data) => {
  if (err) throw err;
  console.log("2)", data.toString());
});
fs.readFile("./test.txt", (err, data) => {
  if (err) throw err;
  console.log("3)", data.toString());
});
console.log("Bye");

// 비동기적 사용 (2) 순서무시 + async
console.log("hello");
(async () => {
  try {
    fsA.readFile("./test.txt").then((data) => {
      console.log("1, " + data);
    });
    fsA.readFile("./test.txt").then((data) => {
      console.log("2, " + data);
    });
    fsA.readFile("./test.txt").then((data) => {
      console.log("3, " + data);
    });
  } catch (err) {
    console.error(err);
  }
})();
console.log("Bye");

// 비동기적 사용 (2) 순서무시 + async
console.log("hello");
(async () => {
  try {
    await fsA.readFile("./test.txt").then((data) => {
      console.log("1, " + data);
    });
    await fsA.readFile("./test.txt").then((data) => {
      console.log("2, " + data);
    });
    await fsA.readFile("./test.txt").then((data) => {
      console.log("3, " + data);
    });
  } catch (err) {
    console.error(err);
  }
})();
console.log("Bye");

// 비동기적 사용 (3) 순서무시 + promise
console.log("hello");
fsA
  .readFile("./test.txt")
  .then((data) => {
    console.log("1, " + data);
  })
  .catch((err) => {
    console.error(err);
  });
fsA
  .readFile("./test.txt")
  .then((data) => {
    console.log("2, " + data);
  })
  .catch((err) => {
    console.error(err);
  });
fsA
  .readFile("./test.txt")
  .then((data) => {
    console.log("3, " + data);
  })
  .catch((err) => {
    console.error(err);
  });
console.log("Bye");

// 동기적 사용
let data = fs.readFileSync("./test.txt");
console.log("1> " + data);
data = fs.readFileSync("./test.txt");
console.log("2> " + data);
data = fs.readFileSync("./test.txt");
console.log("3> " + data);
```

### 버퍼와 스트림
