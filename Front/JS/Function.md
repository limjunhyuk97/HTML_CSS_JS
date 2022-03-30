# Function

## 01. 함수 기본

- **function 이라는 예약어 사용**
- parameter 선언에 let 선언 별도로 필요 없음

```js
function adding(a, b){
  return a+b;
}
console.log(`${adding(2,3)}`)
```

- **함수의 선언과 함수의 표현**
  - **익명 함수**를 변수에 할당함 : **함수 표현**
  - **기명 함수**를 생성 : **함수 선언**

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

- **함수 표현식이 유용한 부분들**
  - 호이스팅 되지 않는다.
  - 클로저로 사용가능하다.
  - callback으로 사용가능하다.
  - 표현식을 호출하려면, 변수() 처럼 괄호를 붙여주어야 한다.

## 02. arguments 객체

- 함수에 전달되는 모든 인자들의 컬렉션
- 유사배열이고, 객체이다. (Array method인 ,forEach 사용하면 에러)
- .length로 속성으로 갖는다.

```js
function sum() {
  let res = 0;
  for(let i=0; i<arguments.length; ++i){
    res +=  arguments[i];
  }
  return res;
}

console.log(sum(1, 2, 3, 4, 5));
```

## 03. 화살표 함수

- function 키워드 필요 없음
- return 키워드와 실행문만 있다면 축약 가능하다.
  - {} 로 묶으면 return 있어야 함 (일반형)
  - {} 로 묶지 않으면 return 없어야 함 (축약형)
    - 객체를 반환하기 위해서는 () 로 묶어야 한다.
- 매개변수가 하나라면 소괄호도 생략 가능하다.
- 항상 익명함수이므로, **함수 표현식으로만 사용 가능**하다.

```js
// 화살표 함수 - 일반형
const doubleArrow = (x) => {
  return x*2;
}

// 화살표 함수 - 축약형
const doubleArrow = (x) => x*2;
const doubleArrow = x => 2*x;

// 화살표 함수 - 객체반환
const doubleArrow = (x) => ({1: 2});
```

## 04. 즉시 실행 함수 (IIFE)

- 함수를 만들자 마자 바로 실행해서 동작시키는 방법
- 익명함수 생성 -> 소괄호로 감싼다 -> 인자를 전달한다.
- 익명함수 생성 -> 인자를 전달한다 -> 소괄호로 감싼다.

```js
// 즉시 실행 함수 - 1
(function(a) {
  console.log(a * 2);
})(2)

// 즉시 실행 함수 - 2
(function(a){
  console.log(a*2);
}(2))
```

## 05. 호이스팅

- 함수의 **선언부**가 유효범위의 최상단으로 끌어올려지는 현상
- 함수의 **표현**은 유호범위의 최상단으로 끌어올려지지 않는다

```js
// 선언된 함수이므로, 호이스팅에 의해 실행됨
console.log(sumA(1, 2, 3, 4, 5));
// 표현된 함수이므로, 호이스팅에 의해 실행되지 않음
console.log(sumB(1, 2, 3, 4, 5));

function sumA() {
  let res = 0;
  for(let i=0; i<arguments.length; ++i){
    res +=  arguments[i];
  }
  return res;
}

sumB = function() {
  let res = 0;
  for(let i=0; i<arguments.length; ++i){
    res +=  arguments[i];
  }
  return res;
}
```

## 06. 타이머 함수

- setTimeout(함수, 시간) : 일정 시간 후 함수를 실행 / 시간단위 ms : 1000ms = 1s
- setInterval(함수, 시간) : 시간 간격마다 반복적으로 함수를 실행 / 시간단위 ms : 1000ms = 1s
- clearTimeout(타이머 변수명) : 설정된 Timeout 함수를 종료
- clearInterval(타이머 변수명) : 설정된 Interval 함수를 종료

```js
// interval 설정
const Timer = setInterval(()=>{console.log("HI")}, 1);

// clearInterval 동작
const h1El = document.querySelector('h1');
h1El.addEventListener('click', ()=>{
  clearInterval(Timer);
})
```

## 07. Callback

- **함수의 인수로 전달되는 함수!** (함수의 인수되는 함수)
- 아래의 경우에서 Hello! -> Done! 순서로 출력될 수는 없나?

```js
// timeout 함수 실행 -> "Done!" 출력 (... 3초 뒤 "Hello!" 출력)
function timeout() {
    setTimeout(()=>{
      console.log("Hello!")
    }, 3000)
};
timeout();
console.log("Done!");
```

### 왜 Callback 인가?

- 위의 코드를 수정하여 **t함수의 인자로 익명함수(Callback)를 전달받게된다면, 특정한 실행의 순서를 보장할 수 있다.**
- timeout함수, serTimeout 모두 callback 함수를 인자로 받고 있다.

```js
// timeout 함수 실행 -> "Done!" 출력 (... 3초 뒤 "Hello!" 출력)
function timeout(cb) {
  setTimeout(()=>{
    console.log("Hello!");
    cb();
  }, 3000)
};
timeout(()=>{console.log("Done!");});
```

## 08. 전개연산자

- js에서 인자는 불충분하게 전달되더라도, 왼쪽에서부터 순서대로 채워진다.
- ... 의 전개연산자를 활용하여
  - 객체 내부 속성들 한번에 전달 가능
  - 배열 내 인자들 한번에 전달 가능
  - rest parameter를 사용하여 남는 인자들 흡수 가능

```js
const arr=[12, "hello", 34, "d"];
console.log(arr);
console.log(...arr);

// 함수가 받은 인자들을 바탕으로 객체 생성하는 함수
// 전개연산자 사용(1) - rest parameter : 나머지 매개변수들을 모두 받아낸다.
function toObject1(a, b, ...c){
  return {
    a : a,
    b : b,
    c // 속성의 이름과 변수의 이름이 같은 경우, 다음과 같이 축약형으로 줄일 수 있다.
  };
};

// (*) key-value의 이름이 같다면 축약형으로 줄일 수 있음 + 전개 연산자의 사용
const toObject2 = (a, b, ...c) => ({a, b, c});

// 인자들은 왼쪽에서 오른쪽으로 순서대로 들어간다.
console.log(toObject1(arr));
console.log(toObject1(arr[0], arr[1], arr[2]));
// 전개연산자 사용(2) : 인자로 전달할 때 배열 내의 인자들을 한 군데씩 차근차근 전달한다.
console.log(toObject2(...arr));
```