# Typescript

## Typescript 개요

- typed superset of JS : js에 type을 추가하여 확장시킨 것이 typescript이다.
- TS Compiler가 TS를 실행환경(브라우저, node.js 등..)에서 실행시킬 수 있도록 JS로 컴파일해준다.
  - JS는 interpreted lang, TS는 compile lang
  - 그러므로 TS는 compile time에 오류를 잡아줌

## Typescript 컴파일링 및 설정파일의 생성

- tsc --init : tsconfig.json 생성
- tsc : tsconfig.json 설정에 맞게 컴파일러가 실행됨
- tsc -.ts : ts 특정 파일 컴파일링
- tsc -w : tsconfig에 있는 설정에 따라서 컴파일링 진행. 파일 변경사항 즉시 반영