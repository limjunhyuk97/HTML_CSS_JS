# Storage

- 개발자 도구 > Application > Storage
- 브라우저에서 제공하는 저장공간이다.

## [Local Storage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

- 읽기 전용 속성
- **저장된 데이터는 브라우저의 세션 간에 공유되며, 특정 웹 주소에 종속된다.**
- **페이지를 닫아도 (즉, 세션이 종료되어도) 저장된 데이터가 만료되지 않는다.**
- **프로토콜 별로 저장한 자료를 구분한다. (HTTP, HTTPS 따로 구분!)**
- key-value 형태로 데이터를 저장할 수 있는 공간이 존재한다. (정수 key는 자동으로 문자열로 변환됨) 문자열로 데이터 입력됨.

### localStorage.setItem(key, value)

- key, value 쌍의 데이터를 localStorage에 저장한다.
- value로 객체를 전달하기 위해서 JSON.stringify(object) 메소드를 사용한다.

### localStorage.getItem(key)

- key 값에 대응하는 value 값을 가져온다.
- 객체를 value로 가져올 때 JSON.parse(JSONString)을 사용하면 js 객체 형태로 JSON형태 문자열을 바꿀 수 있다.

### localStorage.removeItem(key)

- key 값에 대응하는 특정 요소를 제거한다.

```js
const user={
  name:"jun",
  age:"26",
  emails:[
    "limmyee@gmail.com",
    "blinkblinkeye@naver.com"
  ]
};

// localStorage key-value CREATE
localStorage.setItem('user', JSON.stringify(user));

// localStorage key-value READ
console.log(JSON.parse(localStorage.getItem('user')));

// localStorage key-value Update
const str=localStorage.getItem('user');
const obj=JSON.parse(str);
obj.age=24
console.log(obj);
localStorage.setItem('user', JSON.stringify(obj));

// localStorage key-value Delete
localStorage.removeItem('user');
```

### [lowdb](https://github.com/typicode/lowdb)

- lowdb를 사용하여 local **json db 데이터** 만질 수 있다.

## Session Storage

- 페이지를 닫으면 (즉, 세션이 종료되면) 저장된 데이터가 만료된다.