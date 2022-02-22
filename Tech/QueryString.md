# Query String

- ?로 시작하는 속성=값의 모음
- 페이지에 대한 옵션을 명시하는 방법으로 사용된다.
- **주소?속성=값&속성=값&속성=값 ...**
  - "속성=값" 을 통해서 사용자 인증을 수행할 수도 있다.

## 예시

### OMDB API

- API key 발급
- (페이지명)?apikey=(발급받은key)&(parameters)=(value)& ...
- OMDB API 사용하여 JSON 파일 형식의 데이터 띄우기

```js
import axios from 'axios'

const user={
  name:"jun",
  age:"26",
  emails:[
    "limmyee@gmail.com",
    "blinkblinkeye@naver.com"
  ]
};

function fetchMovies() {
  axios
    .get("https://www.omdbapi.com/?apikey=7035c60c&s=frozen")
    .then((res)=>{
      console.log(res);
      const h1E1 = document.querySelector('h1');
      const imgEl = document.querySelector('img');
      // json 형식의 데이터를 띄울 수 있게된다.
      h1E1.textContent = res.data.Search[0].Title;
      imgEl.src=res.data.Search[0].Poster;
    })
}

fetchMovies();

```