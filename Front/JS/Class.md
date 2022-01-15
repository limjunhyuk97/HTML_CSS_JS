# Class

- 메모리의 효율적인 관리를 가능하게 해준다.


## 생성자 함수(prototype)

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
- 이때 **protorype을 사용하여, 메소드를 딱 한번만 만들도록 제어할 수 있다.**

```js
function User(first, last) {
  this.firstName = first;
  this.lastName = last;
};

// prototype 사용
user.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
}
```


## this

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
// 화살표함수 -> this 선언된 함수 범위 : arrow
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
// 화살표함수 -> this 선언된 함수 범위 : jun.arrow
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
// 화살표함수 -> this 선언된 함수 범위 : timeout 정의시 사용된 익명함수 -> timer2
timer.timeout();
```


## ES6 Classes

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


## 상속

- 이미 정의가 되어 있는 내용들에, 새로운 기능과 속성들을 추가하여 확장할 수 있음

```js
class Vehicle {
  constructor(name, wheel) {
    this.name = name;
    this.wheel = wheel;
  }
}

// Vehicle -> Bicycle
class Bicycle extends Vehicle {
  constructor(name, wheel) {
    super(name, wheel);
  }
}

// Vehicle -> Car
class Car extends Vehicle {
  constructor(name, wheel, license) {
    super(name, wheel);
    this.license = license;
  }
}

const myVehicle = new Vehicle("myCar", 2);
```


