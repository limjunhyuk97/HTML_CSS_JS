# 메소드 체이닝 (Method Chaining)

- 메소드가 체인 형식으로 연결되있음

## Method chaining

```js
const a = 'Hello'
const b = a.split('').reverse().join('');
// split : 문자열 -> 문자를 인수 기준으로 쪼갬 -> 배열로 반환
// reverse : 배열의 순서를 반대 순서로 뒤집는다.
// join('') : 배열 -> 배열을 인수 기준으로 문자로 병합 -> 문자열로 반환
```