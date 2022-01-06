# JavaScript

- 함수형 프로그래밍 스타일을 따라가는 언어이다.

## 자료형

- string

```js
let name = "lim jun hyuk";
// ' 를 쓰려면 "로 묶고, " 를 쓰려면 '로 묶고
let hello = "'my name is blahblahblah'"
```

- number
- boolean
- undefined : 정의되지 않은 값
- null : 어떤 값이 의도적으로 비어있음 명시
- object : 객체 데이터 / key : value 형태로 여러 데이터를 저장한다.

```js
let user = {
  name : 'junhyuk',
  age : 85,
  isValid : true
};
```

- array : 여러 데이터를 순차적으로 저장한다. / 자료형이 다른 데이터가 들어가도 상관 없다.

```js
let fruit = ['jun hyuk', 23];
```

## 보간법

- 변수, 함수 호출, 산술 표현식 을 문자열에 직접 삽입할 수 있는 기능 (백틱 사이에 넣는다)
- \` ${변수, 함수호출, 산술 표현식} `

```js
// 5 is 5
console.log(`${2 + 3} is 5`);
```

## 변수

- **let, const**, (var) 선언
- let : 재할당 가능
- const : 재할당 불가능

## 함수

- **function 이라는 예약어 사용**
- parameter 선언에 let 선언 별도로 필요 없음

```js
function adding(a, b){
  return a+b;
}
console.log(`${adding(2,3)}`)
```

- **함수의 선언과 함수의 표현**
  - 익명 함수를 변수에 할당함 : 함수 표현
  - 기명 함수를 생성 : 함수 선언

```js
function hello() {
  console.log("hello");
}

world = function() {
  console.log("world");
};

const person = {
  // 프로퍼티
  name : 'jun hyuk',
  // 메서드
  greetings : function() {
    console.log(`${this.name} says hello`);
  }
};

hello();
world();
person.greetings();
```

## 연산자

### 쉼표 연산자 (,)

- 연산 : 쉼표로 나눠져 있는 연산자를 왼쪽에서 오른쪽으로 평가
- 반환 : 마지막 연산자 값