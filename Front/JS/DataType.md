# DataType

## DataType 확인

- typeof 변수
- Object.prototype.toString.call(변수).slice(8, -1)

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

## import 와 export

- export default ... : 해당 js 파일 내의 특정 내용을, 해당 js 파일을 import 시에 기본으로 내보내겠다는 의미.

```js
// dataType.js
export default function dataTye(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

// main.js
import dataType from "..dataType.js의 상대 경로.."
console.log(dataType("1234"));
```

## Type conversion

- Truthy (참과 같은 값) : true, {}, [], 1, 2, 'false', -12, '3.14', ...
- Falsy (거짓과 같은 값) : false, '', null, undefined, 0, -0, NaN(숫자 데이터 : Not a Number)
