# Object

## 01. 정적 메소드

- 클래스의 정적인 메소드, 프로퍼티를 정의한다. 
- 인스턴스에서 호출할 수 없다. 클래스 자체에서 호출할 수 있다.
- 객체 생성, 복제 와 같은 유틸리티를 위해 사용

### 이미 정의된 정적 메소드

- **Object.assign(target객체, source객체)** : target 객체에 source 객체 내용을 추가, 병합한다. source 여러개 가능. 병합 결과를 반환

```js
// Object.assign
const target = {a:1, b:2};
const source1 = {b:3, c:5};
const source2 = {lalala:100};

const reTarget = Object.assign(target, source1, source2);
console.log(target);    // { a: 1, b: 3, c: 5, lalala: 100 }
console.log(source1);   // { b: 3, c: 5 }
console.log(source2);   // { lalala: 100 }
console.log(reTarget);  // { a: 1, b: 3, c: 5, lalala: 100 }
```

- **Object.keys(객체)** : 객체 안에 존재하는 key-value 형태의 property-값 쌍에서 key들만 추출하여 배열로 반환한다.

```js
// Object.keys + map 이용
const jun = {
  name : "임준혁",
  age : 25,
  gender : "male"
};

const person_key = Object.keys(jun);
console.log(person_key);
console.log(person_key.map(el=>jun[el]));
```

### 사용자 정의 정적 메소드

- static 키워드를 붙인다.

## 02. 구조 분해 할당

- 객체 내의 속성 구조를 분해해서 원하는 속성들만 꺼내어 변수로 만들 수 있게 해주는 성질
  - **객체 내 키 네임으로** 특정 데이터를 꺼내올 수 있다.
  - **배열 내의 데이터들을 순서대로** 꺼내올 수 있다.

```js
const jun = {
  name : "임준혁",
  age : 25,
  gender : "male"
};

// 일반 객체 구조 분해 할당
const {name, gender, age} = jun;
const otherName = name;              // 다른 이름으로 활용가능하도록 변경 가능
console.log(otherName, gender, age); // 임준혁 male 25

// 배열 구조 분해 할당
const fruits=[1, 2, 3, 4, "apple"];
const [a, , c, f, g] = fruits;       // 배열 구조분해 할당
console.log(a, c, f, g);             // 1 3 4 apple
```

