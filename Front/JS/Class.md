# Class

- 메모리의 효율적인 관리를 가능하게 해준다.
- 객체는 관련된 **데이터(프로퍼티)와 함수(메소드)의 집합**이다.
- 객체의 **프로퍼티, 메소드** 모두 **이름 : 값**의 형식을 갖는 **객체의 멤버**이다.

## 01. 생성자 함수(prototype)

### 2가지 객체 생성 방식

- 생성자 함수 : 하나의 객체 데이터를 생성시켜주는, new 라는 키워드와 함께 사용되는 함수
- 리터럴 방식 : [], {} 로 묶어서 직접 객체를 생성하는 방식
- 이때 생성된 객체를 **인스턴스**라 함
- 생성자 함수는, 일반 함수와 구분해주기 위해 Pascal case로 작성한다.

```js
// 리터럴 
const jun = {
  firstname : "jun hyuk",
  lastName : "lim"
};

// 생성자 함수 
function User(first, last) {
  this.firstname = first;
  this.lastname = last;
}
jun = new User("jun hyuk", "lim");
```

### prototype

- 생성자 함수에 메소드를 넣으면, 모든 인스턴스가 동일하게 갖는 메소드이지만, 인스턴스마다 메소드를 하나씩 갖게 되어 비효율성 발생
- 이때 **prototype을 사용하여, 메소드를 딱 한번만 만들도록 제어할 수 있다.**

```js
function User(first, last) {
  this.firstName = first;
  this.lastName = last;
};

// prototype 사용
User.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
}
```


## 02. this

- **전역 문맥** : window 객체 참조(전역 객체)

```js
// true
console.log(this === window);
```

- **생성자 함수** : **새로 생긴 객체**에 this를 묶는다
- **일반 함수** : **호출 위치에 따라** this 정의
- **화살표 함수** : 자신이 **선언된 함수 범위에서** this 정의 / 자신을 감싼 정적 범위 (선언할 때 정적으로 결정됨)
  - 즉, 화살표 함수는 렉시컬 스코프를 따른다.
  - 렉시컬 스코프란, **어디서 선언했는지**를 기준으로 스코프를 결정하는 것이다.
  
- (예1)

```js
const jun = {
  name : "lim jun hyuk",
  normal : function() {
    console.log(this.name);
  },
  arrow : () => {
    console.log(this.name);
  }
}

// console : lim jun hyuk
// 일반함수 -> this 호출위치 : jun
jun.normal();

// console : undefined
// 화살표함수 -> lexical scope : window
jun.arrow();


const Amy = {
  name : "Amy",
  normal : jun.normal,
  arrow : jun.arrow
};

// console : Amy
// 일반함수 -> this 호출위치 : Amy
Amy.normal();
// console : undefined
// 화살표함수 -> lexical scope : window
Amy.arrow();
```

- (예2)

```js
function User(name) {
  this.name = name;
}

User.prototype.normal = function () {
  console.log(this.name);
}

User.prototype.arrow = () => {
  console.log(this.name);
}

const jun = new User("jun");

// jun
jun.normal();
// undefined
jun.arrow();
```

- (예3) : setTimeout(), setInterval() 의 callback으로 화살표 함수를 사용해야 활용도가 높은 이유

```js
const timer1 = {
  name : "jun",
  timeout : function () {
    setTimeout( function () {
      console.log(this.name);
    }, 1000);
  }
}

// console : undefined
// 일반함수 -> this 호출위치 : setTimeout
timer1.timeout();

const timer2 = {
  name : "jun",
  timeout : function () {
    setTimeout( () => {
      console.log(this.name);
    }, 1000);
  }
}

// console : jun
// 화살표함수 -> lexical scope : timer2
timer.timeout();
```


## 03. ES6 Classes

- ES6 판에서 처음 등장한 **js Class 패턴**
- 다른 객체지향언어들에 존재하는 class 문법을 흉내낸 Class 문법
- **prototype 기반의 메소드 정의를 더 편하게 수행할 수 있다.**

```js
Class User {

  constructor(first, last) {
    this.firstname = first;
    this.lastname = last;
  }

  // 위와 동일, ": function 생략가능"
  // constructor : function (first, last) {
  //   this.firstname = first;
  //   this.lastname = last;
  // }

  // prototype을 활용한 함수 생성과 같은 원리로 함수를 생성
  // 단지 다른 객체지향 언어들에 존재하는 class 문법을 흉내낸 것
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
```

### 프로퍼티, 메소드 선언 및 사용 관련

- 객체의 메소드에 함수를 연결할 때 : 를 붙이지 않고 사용가능해짐
- 속성명과 변수명이 동일한 경우, : 로 연결해주는 과정 생략가능
- 객체 멤버 명 동적으로 생성가능해짐

```js
const male = "male";
const female = "female";

const person ={
  name : "jun",
  // 메소드에 함수 연결
  tellMyName() {
    console.log(this.name);
  },
  // 속성명과 변수명이 동일한 경우
  male,
  // 객체 멤버명 동적으로 생성 가능
  ['ES' + 6] : 'Fantastic'
}
```


## 04. 상속

- 이미 정의가 되어 있는 내용들에, 새로운 기능과 속성들을 추가하여 확장할 수 있음

```js
class Human {
  constructor(type = 'human'){
    this.type = type;
  }
  static isHuman(human){
    return human instanceof Human;
  }
  breathe() {
    console.log("hahaha")
  }
}

class Zero extends Human {
  constructor(type, firstname, secondname){
    super(type);
    this.firstname = firstname;
    this.secondname = secondname;
  }
  sayName() {
    super.breathe();
    console.log(`My name is ${this.secondname} ${this.firstname}`);
  }
}

const jun = new Human();
console.log(Human.isHuman(jun));
jun.breathe();

const junhyukLim = new Zero("human", "jun hyuk", "Lim");
junhyukLim.sayName();
```


## 05. import / export

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/154851691-006a2964-4dfc-4a74-83ac-a0c51936d200.png" width="30%"></p>

### export

- default export : 하나만 export 할거라서 이름 지어줄 필요도 없음
- named export : 여러개를 export 할 것이므로 이름을 반드시 명시해주어야 함. 함수, 객체 등 모두 export 가능
- default, named export 를 한군데에서 한번에 사용할 수 있다.

```js
// export
export function random() {
  return Math.floor(Math.random() * 100);
}

export const developer ={
  name : "jun"
}

export default 123
```

### import

- default import : import 시에 따로 가져올 데이터를 이름으로 지정할 필요 X. 하나여서 중괄호도 필요 X.
- named import : 구조 분해 할당처럼 특정 js 파일에서 export 할 데이터들을 이름으로 가져오며, 중괄호로 묶는다.

```js
// import
import getType from "./getType.js"
import { random as getRandom, developer as maker } from "./getRandom.js"
import * as R from "./getRandom.js" // 내보낼 수 있는 모든 데이터 싹다 내보내기

console.log(getType({a : 123}));
console.log(getRandom());
console.log(maker);
console.log(R);
```