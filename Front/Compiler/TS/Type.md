# Type

## 01. JS vs TS type

- JS : Dynamic type. 즉, **JS 는 런타임에 type을 체크**한다.
- TS : Static type. 즉, **TS는 개발하는 중간에 타입을 체크**한다.

## 02. TS Types

### JS 기본 자료형

- **Boolean** (primitive)
- **Number** (primitive)
- **String** (primitive)
- **Null** (primitive)
- **Undefined** (primitive)
- **Symbol** (ES6에서 추가됨) (primitive)
- **Array** : Object (non-primitive)

### 추가 자료형

- **Any** (non-primitive)
- **Void** (non-primitive)
- **Never** (non-primitive)
- **Unknown** (non-primitive)
- **Enum** (non-primitive)
- **Tuple** : Object (non-primitive)

## 03. Primitive

- **소문자로 나타내야 함**
  - boolean
  - number
  - string
  - null
  - undefined
  - symbol
- literal 형태로 Primitive 타입의 서브타입으로 나타낼 수 있다. -> Primitive type
- wrapper 객체로도 만들 수 있다. -> Reference type

### boolean

```ts
let isDone: boolean = false;

isDone = true;

console.log(typeof isDone);

// new Boolean 을 boolean에 할당 불가능! = compile 에러
let isOk : boolean = true;
let isNotOk : boolean = new Boolean(true);
```

### number

- 모든 숫자는 부동소숫점 값이다
- NaN 할당 가능
- 10 16 2 8 진수 사용 가능
- _ 를 이용한 숫자 표현 가능

```ts
let decimal : number = 6;
let hex : number = 0xf00d;
let binary : number = 0b1010;
let octal : number = 0o744;
let notANumber : number = NaN;
let underscoreNum : number = 1_000_000; 
```

### string

- Template string 지원 (` ${ }`)

