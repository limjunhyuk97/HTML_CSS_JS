# JavaScript

## ECMA Script

- ECMA : JS를 표준화해주는 국제 표준화 기구
- ECMA Script (ES) 
  - 표준화된 스크립트 프로그래밍 언어. 액션 스크립트, J스크립트 등의 구현체들도 포함한다.
  - JS의 표준화된 명칭이다.
  - 웹의 클라이언트 사이드 스크립트로 많이 사용된다.
- 최신 판본이 ES6 판이다.

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
  - **속성** : key에 할당된 value가 데이터인 경우
  - **메소드** : key에 함수가 할당된 경우
  - **멤버 = 속성 , 메소드** 를 통칭

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
- **let** : 재할당 가능
  - 함수 레벨 스코프를 따르지 않고 **블록 레벨 스코프**를 사용할 수 있게 한다.
  - let이 var보다 권장된다.
- var : 할당 가능
  - **함수 레벨 스코프**를 따른다.
- const : 재할당 불가능

