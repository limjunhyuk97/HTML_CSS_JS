# [lodash](https://lodash.com/docs/) 

## 01. 개요

- 일반 의존성 패키지
- 배열 안의 객체들의 값을 다룰때(배열, 객체, 문자열 반복 / 복합적인 함수 생성 / 복사 등) 유용하다.
- 브라우저에서 지원하지 않는 성능이 보장되어 있는 다양한 메소드를 갖는다.
- native보다 나은 성능을 갖는다.
- npm 이나 기타 패키지 매니저를 통해 쉽게 사용가능하다.

```bash
npm install lodash
```

## 02. 메소드

- 다양한 메소드가 있으니 lodash 페이지 참고

### uniq(array)

- 배열 내 **중복된 데이터 하나만 남겨서 배열 반환.**
- 원본은 변경 안됨

### uniqBy(array, iteratee)

- 배열 내 **중복 데이터를 판단한 기준을 iteratee라는 인자로 제공**한다. (각 배열 요소마다 iteratee가 호출됨)
- 중복 데이터가 존재한다면, 배열 속 나중 데이터들이 제거된다
- 원본은 변경 안됨

### unionBy(array1, array2, iteratee)

- **여러 배열을 합칠 때 특정 조건에 따라 중복 데이터가 없게 합친다.**
- 원본은 변경 안됨

### find(collection, [predicate], [fromIndex=0])

- **collection은 array나 object**를 의미
- 배열이나, 객체의 **각 요소를 순서대로 순회하면서 predicate를 만족하는(truthy) 첫번째 요소를 반환**한다.
  - 함수
  - 특정 조건

```js
const userB = [
  {name:"jun", id:"1236", check:true}, 
  {name:"tom", id:"1235", check:false}, 
  {name:"Bob", id:"3455", check:false}
];
console.log(_.find(userB, ["check" , false]));
console.log(_.find(userB, {"check" : false}));
console.log(_.find(userB, el=>el.id >2000));
```

### findIndex(array, [predicate], [fromIndex=0])

- **array에서 predicate를 만족하는(truthy) 첫번째 요소의 인덱스를 반환**한다.

### remove(array, [predicate])

- **array에서 predicate를 만족하는(truthy) 모든 요소를 제거**한다.