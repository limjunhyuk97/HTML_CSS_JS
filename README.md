# 웹 서비스 만들기





## 공부할 것

### 1. [Client - Server - DB](#1-client-server-db-관계)

### 2. [DOM / BOM](#2-dom-bom)

### 3. [HTML / CSS /JS](#3-html-css-js)

### 4. [SPA / MPA](#4-spa-mpa)

### 5. [Express](#5-express)

### 6. [Webpack과 Babel](#6-webpack과-babel)

### 7. [개발자도구](#7-개발자도구)

### 8. [프로그래밍 패러다임](#8-프로그래밍-패러다임)

### 9. [MVC 패턴](#9-mvc-패턴)





## 1. Client - Server - DB 관계

- 브라우저 렌더링 과정이란?
- Client, Server, DB 관계?
  - Client 와 Server는 어떻게 데이터를 주고 받는가?
  - Server 에서 DB에 어떻게 접근하는가?
- API가 무엇인가?
  - HTTP 메서드 종류, 상태, 특징ㅞ 등..
  - Restful API 가 무엇인가
  - History API 가 무엇인가
  - API를 어떻게 구현하는가?
- 동기와 비동기가 무엇인가?
  - Fetch / Axios 의 작동원리와 방법
  - async / await 의 작동원리와 방법
  - promise 객체?
  - AJAX?
- 미들웨어가 무엇인가?
- CSR SSR 이란 무엇인가?


### 1.1 동기와 비동기

- **어떤 부분은 지금, 어떤 부분은 나중에 실행되는 데에서 간극이 발생하게 된다.**
- **지금 - 나중 : 사이의 관계가 비동기 프로그램의 핵심이다.**

#### 실행 덩어리

- JS 엔진은 프로그램을 주어진 시점에 한덩이씩 실행시킬 뿐이다.
- 프로그램 덩어리(실행 덩어리)의 가장 일반적인 단위는 함수이다.

```js
function now() {
  return 12;
}
function later() {
  answer = answer * 2;
  console.log(answer);
}
var answer = now();
setTimeout(later, 1000);


// 덩이 1
function now() { return 12; }
function later() { .. }
var answer = now();
setTimeout(later, 1000);

// 덩이 2
answer = answer * 2;
console.log(answer);
```

#### 스레드(Thread)

- **프로세스 : 운영체제로부터 자원을 할당받은 작업 단위**
  - 프로세스 간에는 메모리등의 자원을 공유하지 않는다.
- **쓰레드 : 프로세스 내에서 실행되는 흐름 단위**
  - 쓰레드는 부모 프로세스의 자원을 공유한다.
  - 같은 주소의 메모리에 접근가능하므로, 데이터 공유가 가능하다.
- **프로세스는 데이터, 메모리 등의 자원 + 스레드 로 구성**된다.
- **프로세스에는 한개 이상의 스레드가 존재하여 작업을 수행**한다.
  - 하나의 프로세스 내의 쓰레드들은 프로세스에게 할당된 메모리 자원 등을 공유한다.
  - 하나의 프로세스 내의 쓰레드들은 각각의 스택과 레지스터가 존재한다.


#### [이벤트 루프(Event Loop)](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

- JS 엔진 : JS 코드를 시시각각 주는대로 받아 처리하는 실행기
- 호스팅 환경 : JS 엔진을 돌리며, 실행 덩어리들을 스케쥴링한다.
- **Call stack** : function이 호출되면 call stack push된다. function이 값을 return 하면 pop 된다.
- **WEB API** : WEB API로 제공되는 함수(예 : setTimeout)가 call stack에 들어온 경우, 해당 함수의 callback 함수를 background가 건네받는다. WEB API 함수의 실행이 완료되면 callback을 task queue에 넣는다.
- **Back ground** : 타이머나 이벤트 리스너들이 대기하는 공간. 여러작업이 동시에 수행될 수 있다.
- **Task Queue** : 실행 준비가 완료된 실행덩어리들이 대기하는 곳이다. 즉, background에서 실행 준비가 완료된 callback 함수들이 실행을 위해 대기하는 곳이다.
- **Event Loop** : 실행 준비가 완료된 실행 덩어리가 들어가 있는 queue의 가장 앞 순서의 덩어리를 call stack에 넣는다. 즉, 스케쥴링을 진행한다. 이는 환경(브라우저, NodeJs)이 진행하는 것이다. 스케쥴링의 진행이란, **이벤트 발생시 호출할 콜백함수들을 관리하고, 호출된 콜백함수의 실행순서를 결정하는 역할을 담당하는 것**이다.
- 환경은 이러한 원리로 **단일-스레드 이벤트 루프를 사용**한다.

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/150155574-15019e7f-ec33-4e8d-914f-8792fed93bed.png" width="80%"></p>

#### 동시성

- **"서로 다른 비동기적 실행"을 구성하는 "순차적인 작업" 들은 이벤트 루프 큐에서 순차적으로 실행된다.**
- **서로 다른 비동기적 실행간에 상호작용이 발생할 경우, 순서조정이 수반되어야 한다.**
- **비상호 작용**
  - 여러 개의 실행 덩어리 내의, 일련의 순차적인 작업간에 서로 연관성이 없는 경우로, 문제 없다.

```js
var res = {};

function foo(a){ res.a = a; }
function boo(b){ res.b = b; }

ajax("http://some.url.1", foo);
ajax("http://some.url.2", boo);
// 서로 다른 위치에 접근하기 때문에 문제가 없다
```

- **상호 작용**
  - 여러 개의 실행 덩어리 내의, 일련의 순차적인 작업간에 서로 연관성이 있는 경우로, 문제가 생긴다.
  - **이런 경우에는 상호작용의 순서를 잘 조정해 줄 필요가 있다.** : 경합 해결, 걸쇠 걸기

```js
var res = [];

// 경합조건의 해결
function response(data){
  if(data.url === "https://some.url1"){ res[0] = data; }
  else if(data.url === "https://some.url2")
}

ajax("https://some.url1", reponse);
ajax("https://some.url2", reponse);
```

#### 동기(Synchronous)

- 요청, 결과가 한자리에서 동시에 일어나야 한다는 약속
- 즉, 요청을 진행하면, 시간이 얼마나 걸리던지 요청한 자리에서 결과가 주어져야 한다.
- 노드 사이의 작업 처리 단위가 동시로 맞춰진다.
- 단점
  - **프로세스 자원을 효율적으로 사용하지 못할 수 있다.**
  - **리소스를 다운받는데 걸리는 시간 때문에, 제공되지 않은 리소스를 처리하려고 할 때 문제가 생길 수 있다.**

```js
// 코드의 내용들이 순차적으로 실행된다.
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

```js
// myImage.png 파일을 아직 가져오지 않았기 때문에 blob() 실행에 문제가 발생할 수 있다.
// 동기적 코드에서 문제가 발생가능한 것.
let response = fetch('myImage.png');
let blob = response.blob();
```

#### [비동기(Asynchronous)](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Concepts)

- 요청, 결과가 한자리에서 동시에 일어나지 않을 것이라는 약속
- 즉, 요청을 진행했다고, 결과가 그 자리에서 바로 주어지지 않아도 된다.
- 노드 사이의 작업 처리 단위가 동시로 맞춰지지 않아도 된다.
- 결과가 주어지는데 시간이 걸리더라도, 그 시간 동안 요청한 사람은 다른 작업을 할 수 있다.
- **( 어디서 사용? ) 외부 디바이스에서 어떤 종류의 리소스에 접근하거나, 리소스를 가져오는 기능에서 많이 사용된다.**
  - 네트워크에서 파일 가져오기
  - DB에서 데이터 가져오기
  - 디스플레이를 VR 헤드셋으로 브로드캐스팅하기 등..
- **( 어떻게 사용? ) callback, promise-style**


#### callback

- 함수의 실행순서를 제어할 수 있다.
- 함수에 어떤 데이터가 전달되는지 제어할 수 있다.
- **나중 덩이**를 코딩하여 비동기성을 부여한다.
- callback이 callback으로 계속 부르는 꼬리에 꼬리를 무는 구조가 가독성을 떨어뜨린다.
- (예1)

```js
// callback : callback을 특정 순서로 집어넣어서, 실행순서를 보장하는 방식 
function loadAsset(url, type, callback) {
  // url에서 리소스 가져옴
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = type;

  // onload : callback 함수로 넘어가기 전에 리소스 다운로드를 완료하기 위해 XHR 요청이 진행되는 동안 대기
  xhr.onload = function() {
    callback(xhr.response);
  };

  xhr.send();
}

// displayImage가 callback으로 전달되었음
function displayImage(blob) {
  let objectURL = URL.createObjectURL(blob);

  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
}

loadAsset('coffee.jpg', 'blob', displayImage);
```

- (예2)

```js
const printString = (string) => {
  setTimeout(()=>{
    console.log(string);
  },
  Math.floor(Math.random() * 100) + 1);
}

const printAll = () => {
  printString("A");
  printString("B");
  printString("C");
}

printAll();
```

#### Promise

- 비동기 작업을 위해 사용되며, **비동기 작업**이 성공했는지 실패했는지를 나타내는 하나의 오브젝트이다.
- **데이터를 다 받아오기 전에, 데이터를 표시하려고 했을 때 발생하는 오류 문제를 해결하기 위해 사용**한다.
- **서버에서 받아온 데이터를 화면에 표시할 때 주로 사용한다.**
- 실행은 바로 하되, 결과값은 뒤에 붙은 .then 이나, .catch에 도달해서 받을 수 있는 객체이다.
- **Promise의 3가지 상태**
  - **Pending (대기)** : new Promise() 메서드를 호출하면 대기 상태가 된다. callback 인자로 갖고, callback이 resolve, reject를 인자로 사용한다.
  - **Fullfilled (이행/완료)** : callback에서 resolve(완료된 결과 data)로 fullfill 상태 실행 -> .then() 의 callback에 완료된 결과 data(resolve에 전달된 인자) 전달
  - **Rejected (실패)** : callback에서 reject(new Error(실패한 결과 data))로 reject 상태 실행 -> .catch() 의 callback에 실패한 결과 data(reject에 전달된 인자) 전달
- Promise **.then(callback(){})**
  - 작업 성공의 경우 resolve를 받는다.
  - resolve에 넣어준 인자를 callback으로 처리한다.
  - 각 then 블록들은 서로 다른 promise를 반환
- Promise **.catch(callback(){})**
  - 작업 실패의 경우 reject를 받는다.
  - reject에 넣어준 인자를 callback으로 처리한다.
- Promise **.finally(callback(){})**
  - 성공/실패의 유무와 상관없이 무조건 실행된다.
- Promise **.all([promise1, promise2, ..]).then(result)**
  - all의 인자로 들어있는 promise가 모두 resolve 된 다음에 then 이 실행된다. result에는 resolve의 각 인자들이 배열로 들어있다.
  - promise 중 하나가 거부하면, 첫번째로 거절한 promise의 사유로 거부한다.
- (예1) fetch() API

```js
// fetch API
fetch('products.json').then(function(response) {
  return response.json();
}).then(function(json) {
  products = json;
  initialize();
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
}).finally(()=>{
  console.log('Promise end!');
});
```

- (예2) new Promise() .then().catch()

```js
function getData() {
  return new Promise(function(resolve, reject){
    var a = 1000;
    // 성공 시에 promise 객체 반환
    resolve(a);
    reject(new Error("Failed"));
  });
}

// then으로 resolve 상태로 진행됨
getData().then(function(data){
  console.log(data);
}).catch(function(data){
  console.log(data);
});
```

- (예3) AJAX 통신 예제

```js
// 비동기적 실행이 resolve, reject를 promise 객체로 전달할 수 있음
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data); // response 값 출력
}).catch(function(err) {
  console.error(err); // Error 출력
});
```

- **Promise style의 실행흐름**

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/150330464-ef9765ba-8da6-417f-934f-86318b51b163.png" width="60%" height="25%" ></p>

#### async / await

- JS의 비동기 처리 패턴 중 최근에 나온 문법이다.
- 기존의 **Promise의 단점을 보완**하고 **읽기 좋은 코드를 작성할 수 있게 됨** : callback, promise 보다 간단하게 구성 가능
- **async, await를 이용해서 비동기 처리에 대한 기존의 복잡한 처리(callback, promise)를 단순화**
- **기본 문법**
  - **비동기 처리를 해야하는 메소드가 존재하는 함수 선언 앞에 async 키워드 붙인다.**
  - **비동기 처리를 해야하는 메소드 호출시, 앞에 await 키워드를 붙인다. (await을 통해서 완전한 처리를 보장한다.)**
  - 단, **비동기 처리 메소드가 반드시 promise 객체를 반환해야** await가 의도한 대로 동작한다.
  - **async 함수는 promise 객체를 반드시 반환한다.**

```js
async function 함수명() {
  try{
    await 비동기_처리_메소드명();
  }
  catch(error){
    // error 처리
  }
}
```

- (예1) callback 대신 async, await 사용하기

```js
// fetchUser 가 서버로부터 데이터를 가져오는 HTTP 통신코드라고 가정한다면, callback을 사용하여 실행순서를 보장해주어야 함
function logName(){
  let user = fetchUser(url, function(){
    if(user.id === userID) console.log(user.name);
  });
}

// async, await를 사용하여 간결하게 표현가능하다.
async function logName() {
  let user = await fetchUser(url);
  if(user.id === 1) console.log(user.name);
}
```

- (예2) async await를 사용한 예외처리

```js
// promise 객체 전달에 대한 정의 부분 ((response의 가공)을 resolve로 전달)
function fetchUser() {
  var url = "...";
  return fetch(url).then(function(response){
    return response.json();
  });
}
function fetchTodo() {
  var url = "...";
  return fetch(url).then(function(response){
    return response.json();
  })
}

// try-'catch'로 reject를 잡아낸다. 
async function logTodoTitle() {
  try{
    var user = await fetchUser() {
      if(user.id === 1){
        var todo = await fetchTodo();
        console.log(todo.title);
      }
    }
  }
  catch (error){
    console.log(error);
  }
}
```

#### 동기, 비동기 언제 쓰는건데?

- 비동기를 왜 쓰는가?
  - 비동기를 사용하지 않는다면 콜백 함수의 과정이 끝나기 전에 다음 프로세스가 진행될 수 있기 때문
  - 즉, 서버에서 리소스를 요청한 뒤, 응답을 받기 전에 다음 프로세스를 진행하면 문제가 생길 수 있으므로 이런 경우 비동기를 사용한다.

#### Ajax

- Asynchronous Javascript And Xml (비동기식 JS와 XML)
- **페이지 이동 없이 서버에 요청을 보내고 응답을 받는 방법이다. (전체 페이지 새로고침을 하지 않고 일부만 로드하는 기법)**
- JS를 통해서 서버에 데이터를 요청하는 방법
- **AJAX 요청**은 jQuery나, **Axios 라이브러리를 이용해서 보낸다.**

#### Axios Library

#### [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

- resource를 fetch 해오기 위한 비동기적 메소드이다.
- promise객체를 반환한다.
- 오직 network error를 직면했을 때에만 reject 한다

#### 블록과 논블록 상태

- blocking : 요청을 날린 쪽이 결과가 나올 때까지 다른 일을 수행하지 않고 기다리는 상태
  - 일전에 사용자의 입력으로 발생한 연산을 처리하느라, 프로세서에 대한 제어권을 브라우저에게 반환하지 않는 현상
  - **js가 기본적으로 single thread이기 때문에 발생**한다.
- non-blocking : 요청을 날린 쪽이 결과가 나올 때까지 다른 일을 수행할 수 있는 상태


### 1.2 미들웨어

- **양쪽을 연결하여 데이터를 주고받을 수 있도록 중간에세 매개 역할을 하는 소프트웨어이다.**
- **네트워크를 통해서 연결된 여러 개의 컴퓨터에 있는 많은 프로세스들에게 어떤 서비스를 사용할 수 있도록 연결해주는 소프트웨어**
- 개발, 인프라 조직간의 중간 다리 역할을 한다.
  - 서비스 요청이 유입되는 순간, Front end의 **정적 페이지(html, css, js, png 등..)를 전용으로 처리하는 서버, 그대로 전달: Web Server**
  - 로그인, 검색 등 데이터를 가공하고 처리하는 Back end의 **동적 페이지(jsp, servlet 등..)을 전용으로 처리하는 서버, 로직에 따른 데이터 가공 : WAS (Web Application Server)**
  - 애플리케이션과 데이터베이스 서버를 연결해주는 미들웨어 : DB 접속 미들웨어

#### 정적 페이지

- **미리 저장된 파일이 그대로 전달되는 페이지**이다.
- 서버에 저장된 데이터가 변경되지 않는 한 고정된 웹페이지를 보여주게 됨

#### 동적 페이지

- 서버의 **데이터가 비즈니스 로직 등에 의해 가공 처리된 후 생성되어 전달되는 웹페이지**
- 페이지의 가공처리가 필요하므로 DB와 WAS가 필요하다.
  - WAS에서 DB를 조회하거나,
  - WAS가 외부 서버에서 데이터를 읽어와서,
  - HTML로 가공 후 랜더링하는 과정을 거친다 : **서버 사이드 랜더링(SSR)**

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/149724402-f204a5f8-83bc-438b-896d-09f39505ee10.png" width="60%" height="25%" ></p>

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/149727419-1148da6a-bdcb-4a33-921e-1728b83eee50.jpeg" width="30%" height="35%"></p>


### 1.3 API

#### API란?

- Client 와 Server 가 통신을 하기 위해 정해둔 약속이다.
- HTTP 메소드를 사용하거나(연결을 지속하지 않는다) / Socket을 사용한다(연결을 지속한다)

#### History 객체

- Window 객체의 history 프로퍼티.
- History 객체 모델은 브라우징 히스토리를 문서와 문서 상태 목록으로 저장한다.

#### History API란?

- [참고](https://iamawebdeveloper.tistory.com/42)

#### popstate

- popstate 이벤트는 사용자가 세션 기록을 탐색하는 동안 활성 기록 항목이 변경될 때 시작된다.
- document에서 두 히스토리 엔트리(번역->명단..?) 간의 이동이 있을 때에만 발생한다.


### 1.4 CSR SSR 

#### 렌더링

- 렌더링은 HTML, JS, CSS 등 개발자가 작성한 문서가 브라우저에 출력되는 과정을 말한다.
- [렌더링의 단계](https://devcecy.com/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%90%A0%EA%B9%8C/)
  - HTML 파싱하여 DOM 트리 생성
  - CSS 파싱하여 CSSOM 트리 생성
  - DOM, CSSOM 결합하여 랜더링 트리 생성
  - 랜더링 트리에서 각 노드의 크기, 위치 계산
  - 개별 노드를 화면에 그린다.
  - script 태그를 만나면 JS엔진에 제어권을 넘긴다.

#### 리플로우, 리페인트

- 랜더링이 완료된 상태에서 사용자의 interaction에 의해 화면 일부 영역이 변경되면 리플로우, 리페인트가 발생한다.

#### SSR (Server Side Rendering)

- 서버에서 랜더링을 마치고 Data가 결합된 HTML 파일을 내려주는 방식이다.
- 새로운 페이지로 이동할 때마다 서버에 요청하여 페이지를 받아오는 방식

#### CSR (Client Side Rendering)

- 최초 요청 시에 HTML, CSS, JS 등의 리소스를 받아온 뒤
- 이후 요청에 서버에는 데이터만 요청하고 JS로 뷰를 컨트롤하는 방식





## 2. DOM / BOM

- [DOM](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction)
  - DOM 이 무엇인가?
  - DOM 에 어떻게 접근하는가?
  - API 가 어떻게 사용되는가?
- BOM
  - BOM 이란?
  - Window 객체


### 2.1 DOM 이란?

- HTML, XML 문서의 프로그래밍 interface
- 문서의 구조화된 표현 제공
  - nodes, objects 로 문서 표현
- 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법 제공 
  - 즉, 문서의 요소에 접근할 수 있는 방법 제공
  - 즉, 문서의 구조, 스타일, 내용을 변경할 수 있는 방법 제공
- 웹 페이지는 문서이다.
  - 웹 브라우저는 웹 페이지(문서)를 해석하여 사용자에게 보여준다.
  - 즉, DOM 은 웹 페이지의 객체 지향적 표현이다.
- W3C DOM, WHATWG DOM 은 대부분의 브라우저들이 DOM을 표현하는 기준이다.
- DOM 의 구현은 어떤 언어로도 가능하다. (DOM은 프로그래밍 언어와 독립적으로 디자인 되었기 때문)


### 2.2 DOM 에 접근하는 방법?

- 문서 자체를 조작하거나, 문서의 children 을 얻기 위해서 document 나, window element 를 즉시 사용 가능
- **중요한 데이터 타입들**
  - document : root document object 그 자체이다.
  - element : DOM API의 member에 의해 return 된 element 또는, element type의 node
  - nodeList : element의 배열
  - attribute : element와 같은 node로, attribute에 대한 특별한 interface를 노출하는 object reference이다.
  - namedNodeMap : name 또는 index에 의해 접근 가능한 item들의 집합
- **중요한 핵심 interface**
  - document.getElementById
  - document.getElementsByTagName
  - document.createElement
  - parentNode.appendChild
  - element.innerHTML
  - element.style
  - element.setAttribute
  - element.getAttribute
  - element.addEventListener
  - window.content
  - window.onload
  - window.dump
  - window.scrollTo





## 3. HTML / CSS / JS 

- 웹페이지의 레이아웃을 CSS로 어떻게 잡는가?
- History API vs Anchor tag
  - a 태그를 사용하지 말아야 하는 이유
  - url을 변경하는 방법

### 3.1 a 태그를 지양해야 하는 이유

- a 태그를 사용하면 reload가 발생한다.
- reload(새로고침)이 발생하면 서버에게 request가 간다.
- 그러므로, **SPA 를 구현하기 위해서는 a 태그를 사용해서는 안된다.**
- History API 를 사용하면, reload 발생하지 않고, 서버에게 새로 요청하지 않는다.





## 4. SPA / MPA

- SPA가 무엇인가?
- SPA를 어떻게 구현하는가?





## 5. Express

- Express 로 서버 구축하는 방법?
- Express 사용 전과 후의 서버 구축 방법 차이?
- Express 에서 사용하는 라이브러리의 종류와 기능





## 6. Webpack과 Babel

- 크로스 브라우징 이란?
- 트랜스 파일링 이란?
- 번들링 이란?
- babel 이란?
- webpack 이란?

### 6.1 크로스 브라우징

- 특정 웹서비스에, 브라우저의 영향을 최소화 시켜서 웹서비스를 사용할 수 있게 최적화 시키는 작업을 의미한다.

### 6.2 Babel

- ES6+ 버전 이상의 코드를 하위 버전의 ES 코드로 변환시켜서 각 브라우저 들에서 동작할 수 있도록 하는 역할

### 6.3 트랜스 파일링

- 특정 언어로 작성된 소스코드를 다른 소스코드로 변환하는 작업을 말한다.

### 6.4 Webpack

- 오픈소스 자바스크립트 모듈 번들러이다.
- 의존성 있는 모듈들을 취하여 해당 모듈을 대표하는 정적 자산들을 생성한다.

### 6.5 번들링

- 여러 개로 흩어져 있는 파일들을 압축, 난독화 등을 진행하여 하나의 파일로 모아주는 역할을 수행하는 것
- 주로 JS를 위해 번들링을 수행하지만, 플러그인을 통해서 HTML, CSS, 이미지까지 압축하거나 최적화를 수행
  - 예) parcel-bundler





## 7. 개발자도구 

- 개발자도구 란?
- 개발자도구 에서 사용할 수 있는 기능은?

### 7.1 Network 탭

- 네트워크 요청 내용을 실시간으로 확인 가능




## 8. 프로그래밍 패러다임

- 프로그래밍 패러다임에 어떤 프로그래밍 방식들이 있는가?
- 고차함수 란?
- 순수함수 란?
- 함수형 프로그래밍 이란?
- 객체지향 프로그래밍 이란?
- 선언형 프로그래밍 이란?
- 명령형 프로그래밍 이란?
- 불변성 이란?

### 8.1 함수형 프로그래밍

- 함수형 프로그래밍 : **부수효과를 없애는 방향**으로 **순수함수를 만들어** **모듈화 수준을 높이는 프로그래밍 패러다임**
- 부수효과 : 외부의 상태를 변경하는 것. 함수로 들어온 인자의 상태를 직접 변경하는 것.
- 순수함수 : 부수효과가 없는 함수. (= 외부의 상태를 변경하지 않는 함수.) / 동일 인자가 주어졌을 때 항상 같은 값을 반환 / 인자 제외한 변수를 사용하지 않음
- **순수함수이다 = 모듈화 수준이 높다 = 재사용성이 높다 = 에러추적이 용이하다 = 좋은 프로그램**

```js
// 다음은 순수함수가 아니다 : 인자로 전달되지 않는 condition 변수를 사용함
var arr = [1, 2, 3, 4, 5];
var condition = function(x) { return x % 2 === 0; }
var ex = function(array) {
  return array.filter(condition);
};
ex(arr); // [2, 4]

// 순수함수로 변경 : 인자로 전달받은 것만 사용함
var ex = function(array, cond){
  return array.filter(cond);
}
ex(arr, condition);
```

## 9. MVC 패턴

- MVC 패턴이 무엇인가?
- 옵저버 패턴이 무엇인가?
