# DataType

- 원시 데이터 : String, Number, Boolean, undefined, null (불변)
- 참조 데이터 : Object, Array, Function (가변)

### String

- String.length
- String.prototype.indexOf('문자열')
- String.prototype.slice(시작, 종료다음 인덱스)
- String.prototype.replace('문자열', '교체문자열')
- String.prototype.match(정규표현식)
- String.prototype.trim() : 앞 뒤 공백 모두 제거

### Array

- Array.length
- Array.prototype.concat(다른 배열) : 배열 두개 붙힘, 원본 수정 안됨
- Array.prototype.foreach(function(el, idx, arr){}) : 각 배열의 요소에 대해 콜백함수 실행
- Array.prototype.map(function(el, idx, arr){}) : 콜백함수로 변경된 배열의 각 요소들을 바탕으로 새로운 배열을 생성
- Array.prototype.filter(function(el, idx, arr){}) : 콜백함수 바탕으로 배열의 각 요소들을 걸러서 새로운 배열을 생성
- Array.prototype.find(function(el){}) : 콜백(판별)함수를 만족하는 첫번째 요소값 반환
- Array.prototype.findIndex(function(el){}) : 콜백(판별)함수를 만족하는 첫번째 요소의 인덱스 반환
- Array.prototype.includes(el) : 특정 el이 들어있다면 true, 아니면 false
- Array.prototype.push(el) : 원본 배열 맨 뒤에 el이 push_back 된다. 길이를 반환
- Array.prototype.unshift(el) : 원본 배열 맨 앞에 el이 push_front 된다. 길이를 반환
- Array.prototype.reverse() : 원본 배열을 뒤집는다. 뒤집힌 배열결과를 반환
- Array.prototype.splice(변경시작점인덱스, 제거요소수, 끼워넣을 내용) : 원본 배열의 특정 위치에 요소를 제거 / 수정 / 추가 가능하다. 제거된 요소의 배열의 반환된다.

```js
// map , 결과 : [ { id: 0, name: 'banana' }, { id: 1, name: 'apple' } ]
const fruits = ['banana', 'apple'];
const newFruits = fruits.map((el, idx)=>({
  id : idx,
  name : el
}));
console.log(newFruits);

// find
const fruit = fruits.find(el=>{
  return el[0] === 'a'
})

// splice
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(numbers.splice(3, 2, 10));  // [4,5]
console.log(numbers);                   // [1,2,3,10,6,7,8,9,10]

console.log(numbers.splice(5,0, 44));   // []
console.log(numbers);                   // [1,2,3,10,6,44,7,8,9,10]
```

- Array.prototype.filter(function(el, idx, arr){}) : 콜백함수로 각 요소들을 특정한 조건으로 걸러낸 뒤 새로운 배열을 생성

## 01. Type conversion

- Truthy (참과 같은 값) : true, {}, [], 1, 2, 'false', -12, '3.14', ...
- Falsy (거짓과 같은 값) : false, '', null, undefined, 0, -0, NaN(숫자 데이터 : Not a Number)

## 02. 불변성

- **원시데이터(String, Number, Boolean, undefined, null)들**은,,
  - **동일한 값의 데이터는 메모리에 한번만 생성**된다. = 불변성
  - **다른 값의 데이터는 다른 메모리 공간에 존재**한다.
- **참조데이터(Object, Array, Function)들**은,,
  - **참조형 데이터는 새로운 값을 만들 때 마다, 새로운 메모리 주소에 할당** 된다! = 가변적
  - **동일한 값의 데이터를 갖더라도, 다른 메모리 공간에 여러개 생성되있을 수** 있다.

```js
let a = { k : 1 };
let b = { k : 1 };
console.log(a.k, b.k, a.k === b.k);   // 1 1 true
console.log(a, b, a === b);           // { k: 1 } { k: 1 } false -> a, b가 서로 다른 메모리 주소를 바라보고 있다.

a.k=7;
console.log(a.k, b.k, a.k === b.k);   // 7 1 false

b=a;
console.log(a, b, a === b);           // { k: 7 } { k: 7 } true

a.k=2;
console.log(a, b, a === b);           // { k: 2 } { k: 2 } true

let c = b;
console.log(a, b, c, a === c);        // { k: 2 } { k: 2 } { k: 2 } true
```

## 03. 얕은복사와 깊은 복사

- 얕은 복사 : = , Object.assign() , {...}
- 깊은 복사 : lodash 패키지 내의 cloneDeep을 통한 재귀적 복사

## 04. JSON

- **속성-값 쌍**으로 이루어진 **데이터 오브젝트를 전달**하기 위한 **개방형 표준 포맷**
- 비동기 **브라우저-서버 통신을 위한 데이터 포맷**으로 사용됨
- 언어 독립형 데이터 포맷이므로 json 데이터를 각종 언어에서 생성가능하다.
- **.json 확장자 파일 내용은 기본적으로 문자 데이터**이다.
- 담을 수 있는 자료형 : number, string, boolean, null, object, array

### JSON.stringify()

- (js 값이나 객체 -> json 문자열) 변환

```js
const user={
  name:"jun",
  age:"26",
  emails:[
    "limmyee@gmail.com",
    "blinkblinkeye@naver.com"
  ]
};

const str = JSON.stringify(user);
console.log(str);
// {"name":"jun","age":"26","emails":["limmyee@gmail.com","blinkblinkeye@naver.com"]}
```

### JSON.parse()

- (json 문자열 -> js 값이나 객체) 변환
- reviver를 통해서 js 객체로 변환 시에 각 요소들에 대해서 특정 작업 수행 가능

```js
const obj = JSON.parse(str);
console.log(obj);
// {
//   name: 'jun',
//   age: '26',
//   emails: [ 'limmyee@gmail.com', 'blinkblinkeye@naver.com' ]
// }
```

## 04. 형변환 함수 + a

### toFixed(n)

- 소수를 소수점 아래 n자리 까지 잘라서 문자열로 반환한다.

### parseInt(문자)

- 문자 데이터, 정수로 변환

### parseFloat(문자)

- 문자 데이터, 실수로 변환

### typeof 변수 / .toString.call()

- typeof : 데이터의 타입을 알려준다
- .toString.call(객체)
  - .call(객체) : 전달한 객체를 this로 활용할 수 있게 해준다.
  - .toString : 해당 객체를 대표할 문자열을 반환해준다. 기본적으로 객체의 타입을 문자열로 반환해준다.

```js
console.log(typeof "1234");
// 1234의 자료형 -> String 이 출력됨
// 하지만, 배열[], 객체{} 가 똑같이 Object로 출력됨
// null [] {} : object, undefined : undefined

function dataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
};
// 정의한 dataType 이라는 함수 사용해서 자료형 출력 가능
// null -> Null, [] -> Array , ,,,
```