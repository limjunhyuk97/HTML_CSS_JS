# SCSS / SASS

- CSS 전처리 도구
- 기존의 CSS 문법과 호환이 가능하다.
- SCSS는 CSS의 모든 구문과 완벽히 호환되도록 새로운 구문을 도입해 만든 SASS의 모든 기능을 지원하는 CSS의 상위집합.
- **중첩 기능 : 코드 가독성 및 코드 작성 효율이 높아진다.**
- **변수 활용 : 코드에서의 오류 발생가능성이 줄어든다.**

## 목차

### 1. [parcel-bundler 와 SCSS](#1-parcel-bundler-와-scss)

### 2. [주석과 보간](#2-주석과-보간)

### 3. [sassmeister](#3-sassmeister)

### 4. [& 부모선택자 치환](#4-부모선택자-치환)

### 5. [중첩된 속성](#5-중첩된-속성)

### 6. [변수](#6-변수)

### 7. [산술 연산](#7-산술-연산)

### 8. [@mixin 코드모음](#8-mixin)

### 9. [@for 반복문](#9-for-반복문)

### 10. [@function 함수](#10-function-함수)

### 11. [색상 내장 함수](#11-색상-내장-함수)

### 12. [@import 가져오기](#12-import-가져오기)

### 13. [데이터 종류](#13-데이터-종류)

### 14. [@each를 사용한 list, map 요소 순회](#14-each를-사용한-list-map-요소-순회)

### 15. [@content 재활용](#15-content-재활용)

## 1. parcel-bundler 와 SCSS

- parcel-bundler를 개발의존성 패키지로 설치한 뒤에 (npm i -D parcel-bundler)
- .scss 파일을 생성 및 작성하고, html 파일에 연결해주고 (link 태그로 연결한다.)
- script "run" : "parcel index.html"을 통해서 html 파일 실행 프로세스를 돌리면 (npx paarcel index.html)
- 자동으로 sass 패키지가 package.json에 올라가는데, parcel-bundler가 필요한 모듈을 자동으로 추가한 것.  

## 2. 주석과 보간

- **주석**
  - /**/ : 내부 내용이 변환되어도 CSS 코드에 들어간다. (기존에 CSS에서 사용되던 주석)
  - // : 내부 내용이 변환되면 CSS 코드에 들어가지 않는다.
- **보간**
  - #{$변수명}을 통해서 특정 변수 값을 보간법으로 넣을 수 있다.

```scss
// scss에서 보간의 이용
@for $i from 1 through 10 {
  .box:nth-child(#($i)) {
    ...
  }
}

```

## 3. sassmeister

- [sassmeister](https://www.sassmeister.com/) 를 이용하면 SCSS에서 전처리된 CSS 결과를 확인할 수 있다.

## 4. & 부모선택자 치환

- & 를 사용하여 **부모 선택자를 참조(치환)** 할 수 있게 된다.

```scss
// (1) scss
.list {
  .li {
    &:last-child {
      margin-right : 0;
    }
  }
}

// (1) -> css
.list .li:last-child {
  margin-right: 0;
}

// (2) scss
.fs {
  &-small { font-size : 12px; }
  &-medium { font-size : 14px; }
  &-large { font-size : 16px; }
} 

// (2) -> css
.fs-small { font-size : 12px; }
.fs-medium { font-size : 14px; }
.fs-large { font-size : 16px; }
```

## 5. 중첩된 속성

- **동일 네임스페이스를 갖는 속성들에 한해서 묶어서 정의**할 수 있다.
- 묶인 중첩된 속성들은 { }; 안에 정의

```scss
// (1) scss
.box {
  font : {
    weight : bold;
    size : 10px;
    family : sans-serif;
  };
  margin : {
    top : 10px;
    left : 20px;
  }
}

// (1) -> css
.box {
  font-weight : bold;
  font-size : 10px;
  font-family : sans-serif;
  margin-top : 10px;
  margin-left;
}
```

## 6. 변수

- **\$(name) : (value)** 의 형태로 변수를 사용할 수 있다. **$은 변수를 만들 때 사용된다.**
- 변수는 해당 변수가 존재하는 **{ } 내에서만 유효한 유효범위를 갖는다.**
- 변수는 재할당 가능하고, 재할당되면 값이 바뀐다.

```scss
// (1) SCSS
.container {
  position : fixed;
  top : 200px;
  .item {
    width : 200px;
    height : 200px;
    transform : translateX(200px);
  }
}

// (1) 변수 사용 + 유효범위
.container {
  $size : 200px;
  position : fixed;
  top : $size;
  .item {
    #size : 100px;
    width : $size;
    height : $size;
    transform : translateX($size);
  }
}
```

## 7. 산술 연산

- **덧셈, 뺄셈, 곱셈, 나머지 연산**은 그냥 수행 가능
- 연산 시 기준이 같아야 함
  - 기준이 다른 경우 calc()로 감싸서 연산하면 수행 가능
- **나머지 연산**은 단축속성의 지정과 표시가 중복되므로 다른 방식으로 수행
  - ( n / m ) : 소괄호로 감싼다
  - 변수 / n : 변수를 나눈다
  - (n + m) / l : 다른 연산자와 같이 활용한다.

```scss
// (1) scss
div {
  width : 20px + 20px;
  height : 40px - 10px;
  font-size : 10px * 2;
  margin : 30px / 2;  // 나누기 적용 안됨
  padding : 20px % 7;
}

// (2) / 단축속성과 / 나누기의 의미 중복
.span {
  font-size : 10px;
  line-height : 10px;
  font : 10px / 10px; // font-size / line-height 로 구분됨 = / 나누기와 의미가 중복됨
}

// (3) scss와 나누기 연산, 하위 연산들은 동일
(30px / 2); 
($size / 2);
$size / 2; 
(10px + 20px) / 2;
```

## 8. @mixin 코드모음

- 특정 덩어리의 css 코드를 재활용할 때 **@mixin / @include**이라는 키워드 사용가능하다.
- **인수**를 활용하여 **mixin의 특정 값을 필요에 따라서 변경**할 수 있다.
- **인수의 초기값**을 활용하여 **인수로 들어갈 기본적인 값을 지정**할 수 있다.
- **키워드 인수**를 활용하여 **인수가 여러개일 때, 특정 인수에 들어갈 값을 지정**할 수 있다.
  - 그렇지 않으면 앞에서부터 순서대로 들어가기 때문에

```scss
// (1) scss
@mixin box($size : 100px, $color : tomato) {
    width : $size;
    height : $size;
    background-color : $color;
}

.container {
    @include box(200px, red);
    .item {
        @include box($color : green);
    }
}

.box {
    @include box;
}

// (1) -> css
.container {
  width: 200px;
  height: 200px;
  background-color: red;
}
.container .item {
  width: 100px;
  height: 100px;
  background-color: green;
}

.box {
  width: 100px;
  height: 100px;
  background-color: tomato;
}
```

## 9. @for 반복문

- 반복문을 사용하여 손쉽게 여러개의 선택자들을 선책할 수 있다.
- **@for $var from n through m** 키워드를 이용해서 반복문을 돌리 수 있다. (+ 필요하면 보간 사용)

```scss
// (1) scss
@for $i from 1 through 10 {
  .box:nth-child(#{$i}) {
    width : 10px * $i;
    height : 10px;
    margin : {
      top : 5px;
    }
    background-color : orange;
  }
}
```

## 10. @function 함수

- @mixin 도 함수와 유사하지만, **@function** 키워드를 사용하여 함수를 생성할 수 있다.
- **@return** 키워드를 사용하여 특정 값을 반환할 수 있다.
- **@mixin vs @function**
  - **@mixin** : css 코드의 모음
  - **@function** : 값의 연산으로 반환된 결과를 사용하기 위한 코드

```scss
// scss
@mixin center {
    display : flex;
    justify-content : center;
    align-items : center;
}

// size의 특정 비율 값을 반환하는 함수 생성
@function ratio($size, $ratio) {
    @return $size * $ratio;
}

.box {
    $width : 160px;
    width :$width;
    height : ratio($width, 9/16);
    @include center
}
```

## 11. 색상 내장 함수

- scss 안에 내장된 색상관련 함수들
  - hover와 함께 사용가능
  - 함수를 중첩해서 사용가능
- **mix(색상, 색상)** : 색상 두개 합함
- **lighten(색상, n%)** : 특정 색상을 n% 만큼 밝게 만든다.
- **darken(색상, n%)** : 특정 색상을 n%만큼 어둡게 만든다.
- **saturate(색상, n%)** : 특정 색상의 채도를 n%만큼 올린다.
- **desaturate(색상, n%)** : 특정 색상의 채도를 n%만큼 내린다.
- **grayscale(색상)** : 색상을 회색으로 만들어준다.
- **invert(색상)** : 색상을 반전시킨다.
- **rgba(색상, 투명도)** : 색상의 투명도를 변경시켜준다. (1 ~ 0 : 0에 가까울수록 투명해짐)

```scss
.box {
  $color : royalblue;
  width : 200px;
  height : 100px;
  margin : 20px;
  border-radius : 10px;
  background-color : mix(royalblue, red);
  &.built-in {
    background-color : lighten(mix(royalblue, red), 10%);
  }
}
```

## 12. @import 가져오기

- **@import** 키워드를 통해서 다른 .scss 확장자 파일에서 scss 속성을 가져올 수 있다.

```html
<!-- link rel="stylesheet" href="./main.scss" -->
<body>
  <div class="container">
    <h1>
      Hello SCSS!
    </h1>
  </div>
</body>
```

- main.scss에 sub.scss들을 import 수행 -> main.scss를 index.html에 연결

```scss
// main.scss
@import "./sub", "./sub2";

$color : royalblue;
.container {
  h1 {
    color : $color;
  }
}

// sub.scss
body {
  .container {
    background-color: orange;
  }
}

// sub2.scss
body {
  background-color: royalblue;
}
```

## 13. 데이터 종류

- $number : .5 / 100px / 1em
- $string : relative / "../images/a.png"
- $color : red
- $boolean : true / false
- $null : null
- $list : orange, royalblue, yellow / 
- $map

```scss
$map : (
  o : orange,
  r : royalblue,
  y : yellow
)
```

## 14. @each를 사용한 list, map 요소 순회

- @each를 키워드를 활용하여 list, map 내의 멤버들을 순회할 수 있다.

```scss
$list : orange, royalblue, yellow;
$num : 1;

// $list 순회
@each $c in $list {
    box:nth-child(#{$num}) {
        color : $c;
    }
    $num : $num + 1;
}

$map : (
    o : orange,
    r : royalblue,
    y : yellow
);

// $map 순회
@each $key, $value in $map {
    .box-#{$key} {
        color : $value;
    }
}
```

## 15. @content 재활용

- @mixin과 함께 사용하며, **@mixin 덩어리에 새로운 코드덩어리들을 추가할 때 사용가능**하다.

```scss
@mixin left-top {
  position absolute;
  top : 0;
  left : 0;
  @content;
}

.container {
  width : 100px;
  height : 100px;
  @include left-top;
}

.box {
  width : 200px;
  height : 300px;
  @include left-top {
    bottom : 0;
    right : 0;
    margin : auto;
  }
}
```