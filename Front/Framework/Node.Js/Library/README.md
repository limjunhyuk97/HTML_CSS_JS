# Node.js 내장 모듈

## 01. url

- **인터넷 주소를 쉽게 조작**하도록 돕는 **노드 내장 모듈**이다.
- node에서 사용하는 url 구분 방식과, WHATWG에서 사용하는 url 구분 방식 두가지가 존재한다.
  - 아래 그림의 윗부분 구분 방식 : node에서 사용하는 url 구분 방식
  - 아래 그림의 아랫부분 구분 방식 : WHATWG에서 사용하는 url 구분 방식

<img width="781" alt="url" src="https://user-images.githubusercontent.com/59442344/157380862-1d0f8c06-6222-48f7-a534-c31783d403da.png">

- URL / url.parse(), url.format 으로 url 주소 분해, 분석
- **url.parse() 방식을 통해서만 host 부분 없이 pathname 부분만 오는 주소의 경우를 처리 가능**

```js
const url = require('url');

// WHATWG 방식의 url 분석을 지원한다.
// 구조 분해 할당으로 url 모듈 내의 URL 생성자를 가져온다.
// URL 생성자에 url을 넣으면 WHATWG 형식으로 주소를 분해한 결과를 보여준다.
const  { URL } = url;
const myURL = new URL('https://www.omdbapi.com/?apikey=7035c60c&s=frozen');
console.log('new URL(): ', myURL);
console.log('url.format(): ', url.format(myURL));
console.log("======================================");
console.log()

// 기존 node 방식의 url 분석을 지원한다.
// url.parse : node 방식으로 주소를 분해한 결과를 보여준다.
// url.format : url.parse()로 분해된 주소를 다시 합쳐준다.
const parsedURL = url.parse('https://www.omdbapi.com/?apikey=7035c60c&s=frozen');
console.log('url.parse(): ', parsedURL);
console.log('url.format(): ', url.format(parsedURL));
```

### search 부분의 query string 다루기

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
const url = require('url');
const querystring= require('querystring');

const parsedURL = url.parse('https://www.omdbapi.com/?apikey=7035c60c&s=frozen');
const query = querystring.parse(parsedURL.query);
console.log(query);
console.log(querystring.stringify(query));
```

## 02. fs

- **파일 시스템에 접근**하게 도와주는 **노드 내장 모듈**이다.
- 파일 생성, 삭제, 읽기, 쓰기 를 위한 기능 제공

### promise 기반의 fs 모듈 사용

```js
const fs = require('fs').promises;

fs.writeFile('./test.txt', 'testing now\n')
.then(()=>fs.readFile('./test.txt'))
.catch((err)=>console.error(err))
.then((data)=>console.log(data.toString()))
.catch((err)=>console.error(err));
```

### fs 모듈의 동기적 / 비동기적 사용

- 동기적 사용을 위한 메서드 뒤에는 'Sync'가 붙음
- 동기적으로 처리 시에는 처리 순서가 보장되지만, 백그라운드에서의 작업 처리를 기다리는 시간이 발생하여 비효율성이 생길 수 있다.

```js
const fs = require('fs');
const fsA = require('fs').promises;

// 비동기적 사용 (1) 순서유지 + callback 지옥
fs.readFile('./test.txt', (err, data)=>{
  if(err) throw err;
  console.log('1 ' + data);
  fs.readFile('./test.txt', (err, data)=> {
    if(err) throw err;
    console.log('2 ' + data.toString());
    fs.readFile('./test.txt', (err, data)=>{
      if (err) throw err;
      console.log('3 ' + data);
    })
  })
});

// 비동기적 사용 (1) 순서무시 + callback
console.log("hello");
fs.readFile('./test.txt', (err, data)=>{
  if(err) throw err;
  console.log('1)', data.toString());
})
fs.readFile('./test.txt', (err, data)=>{
  if(err) throw err;
  console.log('2)', data.toString());
})
fs.readFile('./test.txt', (err, data)=>{
  if(err) throw err;
  console.log('3)', data.toString());
})
console.log("Bye");

// 비동기적 사용 (2) 순서무시 + async
console.log("hello");
(async ()=>{
  try {
    fsA.readFile('./test.txt').then((data)=>{ console.log('1, ' + data) })
    fsA.readFile('./test.txt').then((data)=>{ console.log('2, ' + data) })
    fsA.readFile('./test.txt').then((data)=>{ console.log('3, ' + data) })
  }
  catch(err) {
    console.error(err);
  }
})();
console.log("Bye");

// 비동기적 사용 (2) 순서무시 + async
console.log("hello");
(async ()=>{
  try {
    await fsA.readFile('./test.txt').then((data)=>{ console.log('1, ' + data) })
    await fsA.readFile('./test.txt').then((data)=>{ console.log('2, ' + data) })
    await fsA.readFile('./test.txt').then((data)=>{ console.log('3, ' + data) })
  }
  catch(err) {
    console.error(err);
  }
})();
console.log("Bye");

// 비동기적 사용 (3) 순서무시 + promise
console.log("hello");
fsA.readFile('./test.txt').then((data)=>{
  console.log('1, ' + data);
}).catch((err) => {
  console.error(err);
})
fsA.readFile('./test.txt').then((data)=>{
  console.log('2, ' + data);
}).catch((err) => {
  console.error(err);
})
fsA.readFile('./test.txt').then((data)=>{
  console.log('3, ' + data);
}).catch((err) => {
  console.error(err);
})
console.log("Bye");

// 동기적 사용 
let data = fs.readFileSync('./test.txt');
console.log("1> " + data);
data = fs.readFileSync('./test.txt');
console.log("2> " + data);
data = fs.readFileSync('./test.txt');
console.log("3> " + data);
```

###