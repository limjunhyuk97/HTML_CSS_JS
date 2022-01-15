# Operation 

- 연산, 반복, 조건 특이사항


## / 연산자

- 몫을 구하는 것이 아니라, 실제 나누기 수행


## === , == 연산자

- **=== 연산자** : **변수값과 변수유형을 모두 비교 / 엄격한 비교**
- **== 연산자** : **변수값을 비교 / 유형 변화(Type conversion) 비교**
- 직접 자료형 변환방식 + '==' 연산자를 사용하여 코드 가독성을 높이는 것이 바람직하다.
- NaN 은 그 어느것과도 같지 않다.

```js
// == 와 ===
console.log(0==[])    // true
console.log(0===[])   // false
console.log(0=="0")   // true - 자동 유형변화 비교
console.log(0==="0")  // false
console.log(0=='')    // true
console.log(0==='')   // false
console.log(null==undefined)  // true
console.log(null===undefined) // false

// 연속된 ===
console.log(1===2===false)  // true
```


## 비교, 논리 연산자가 여러개 연이어 존재하는 경우

- 우측에서 좌측으로 연산이 수행된다.

```js
console.log(2===3||true!==false)  // true
```


## 삼항 연산자

- 식 ? true인 경우 : false인 경우


## 쉼표 연산자 (,)

- 연산 : 쉼표로 나눠져 있는 연산자를 왼쪽에서 오른쪽으로 평가
- 반환 : 마지막 연산자 값