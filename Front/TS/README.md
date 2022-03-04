# Typescript

## Typescript 개요

- typed superset of JS : js에 type을 추가하여 확장시킨 것이 typescript이다.
- TS Compiler가 TS를 실행환경(브라우저, node.js 등..)에서 실행시킬 수 있도록 JS로 컴파일해준다.
  - JS는 interpreted lang, TS는 compile lang
  - 그러므로 TS는 compile time에 오류를 잡아줌

## Typescript 설치 및 npm 스크립트로 실행

- npm i typescript : 해당 프로젝트 내에 설치
- npx tsc --init : tsconfig.json 파일 생성
- typescript compiler 실행
  - npx tsc
  - npx tsc (파일명).ts : 특정 파일 컴파일링
  - npx tsc -w : tsconfig에 있는 설정에 따라서 컴파일링 진행. 파일 변경사항 즉시 반영하여 컴파일링 즉시 진행. (-w = watch mode)
  - script 하에 "build" : "tsc" 추가 -> npm run build : npx tsc 의 컴파일링 진행 가능
  - node_modules/.bin/tsc
  - node_modules/typescript/bin/tsc

## VSCode, TS

- VSCode 에 TS 컴파일러가 내장되어 있다. (컴파일러 버전과 VSCode 버전 간의 상관관계 존재)
- 내장된 컴파일러, 설치한 컴파일러 중 선택 가능하다.

## Type annotation

- TS 가 갖고 있는 고유한 기능. Type 요소가 코드상에 드러나는 방식

```ts
// a 에 값을 할당하는 순간, 자료형이 지정이 된다.
let a = 'Mark';

// type annotation : type을 미리 지정하는 방식이다.
let b: string;
let c: number;

b = "hello world";
c = 1234;
```