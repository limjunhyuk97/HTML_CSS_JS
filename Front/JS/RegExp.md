# [정규표현식](https://heropy.blog/2018/10/28/regexp/)

## 01. 개요

- 정규표현식 : 문자열을 검색, 대체, 추출하는데 사용가능한 언어 패턴

  - 문자열 검색
  - 문자열 대체
  - 문자열 추출

## 02. 정규표현식의 생성

- 생성자 방식
- 리터럴 방식

```js
/* 정규표현식의 생성자 방식의 생성과 리터럴 방식의 생성 */

// reg1 == reg2
const reg1 = new RegExp('[a-z]', 'gi');
const reg2 = /[a-z]/gi;

const str = `
010-7146-6191
hellothe@gmail.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazt dog.
abbcccdddd
`

// 아무런 옵션 없음
console.log(str.match(new RegExp('the', '')));
// 모든 'the'를 찾기위한 옵션 : g 플래그
console.log(str.match(new RegExp('the', 'g')));
// 모든 'the'를 찾으면서 대소문자 구분을 없애기 위한 옵션 : i 플래그
console.log(str.match(new RegExp('the', 'gi')));
```

## 03. 정규표현식 메소드

메소드 | 문법 | 설명
--|--|--
test | 정규식.test(문자열) | 일치여부 반환
match | 문자열.match(정규식) | 일치하는 문자열의 배열 반환
replace | 문자열.replace(정규식, 대체문자) | 일치하는 문자열을 대체, 대체한 문자열 반환
search | 문자열.search(정규식) | 일치하는 문자열의 인덱스 번호 반환

```js
const str = `
010-7146-6191
hellothe@gmail.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazt dog.
abbcccdddd
`

const regexp=/fox/gi

// test
console.log(regexp.test(str));

// replace - str 원본이 수정은 안됨
console.log(str.replace(regexp, 'foxxy'));
```

## 04. 플래그(옵션)

플래그 | 설명
--|--
g | 모든 문자 일치(global)
i | 영어 대소문자 구분 않고 일치(ignore case)
m | 여러 줄 일치(multi line) : 각 줄에 대해서 일치 여부를 찾음, $과 같이 쓰일 수 있음

```js
const str = `
010-7146-6191
hellothe@gmail.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazt dog.
abbcccdddd
`

// $은 전체 문자열 기준, 시작과 끝에서의 일치 여부인데
// m을 플래그에 붙이면 각각의 줄 기준, 시작과 끝에서의 일치 여부를 판단하게 한다.
console.log(str.match(/\.$/gim));
```

## 05. 패턴(표현)

- [참고1](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=jeongju02&logNo=221517177533)

- [참고2](https://youngjinmo.github.io/2020/01/reg/)

### 패턴 및 예시

패턴 | 설명
--|--
^ab | 줄 시작에 있는 ab와 일치
ab$ | 줄 끝에 있는 ab와 일치
. | 임의의 한 문자와 일치
a\|b | a 또는 b와 일치
ab? | b가 없거나 있거나
{3} | 3개 연속 일치
{3,} | 3개 이상 연속 일치
{3,5} | 3개 이상 5개 이하(3~5개) 연속 일치
\w | 알파벳이나 숫자, 즉 63개 문자(대소영문 52자 + 숫자10개 + _)에 일치 (word)
\b | 알파벳이나 숫자, 즉 63개 문자에 일치하지 않는 문자 경계 (boundary)
\d | 숫자에 일치 (digits)
\s | 공백(Space, Tab, 개행 등)에 일치 (space)
(?=) | 앞쪽 일치(Lookahead)
(?<=) | 뒤쪽 일치(Lookbehind)
[abc] | a또는 b또는 c
[a-z] | a부터 z 사이의 문자 구간에 일치(영어 소문자)
[A-Z] | A부터 Z 사이의 문자 구간에 일치(영어 대문자)
[0-9] | 0부터 9 사이의 문자 구간에 일치(숫자)
[가-힣] | 가부터 힣 사이의 문자 구간에 일치(한글)

```js
// 1. 알파벳이나 숫자로 이루어진, 2~3글자짜리 단어 //
str.match(/\b\w{2,3}\b/gi)

// 2. \s, replace 활용한 불필요한 공백 제거 //
const h = `   the    heelloo  world!!    

`;

console.log(h.replace(/\s{1,}/g, ' '));

// 3. 앞쪽 일치와 뒤쪽 일치 //
const str = `limjunhyuk97@gmail.com`

// 앞쪽 일치 : limjunhyuk97
console.log( str.match(/.{1,}(?=@)/g) );

// 뒤쪽 일치 : gmail.com
console.log( str.match(/(?<=@).{1,}/g) );
```

### cheat sheet

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/155668815-0c207d84-3ae8-498a-9654-ff03d3b7362f.png" width="70%"></p>