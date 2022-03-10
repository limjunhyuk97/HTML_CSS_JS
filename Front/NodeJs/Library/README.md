# Node.js 내장 모듈

## 01. url

- 인터넷 주소를 쉽게 조작하도록 돕는 모듈이다.
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