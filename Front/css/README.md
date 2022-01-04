# CSS

## CSS 기본 구조

- " 선택자 { 속성 : 값; 속성 : 값; } " 의 형태를 갖고 있다.

## CSS 선언 방식

### 내장 방식

- html head의 style 요소의 내용으로 css 문법 작성
- html 자체에 css 내용을 내장한다.
- 별도의 css 파일을 만들지 않아도 되나, css 내용이 많아지면, html 문서 내에서 처리하기 어렵다.
- 프로젝트를 bundle 하는 과정에서는 사용될 수 있다.

```css
<style>
  div {
    color : red;
    margin : 20px
  }
</style>
```

### 인라인 방식

- 요소의 style 속성을 직접 추가해서, 스타일을 직접 작성하는 방식
- css 우선순위에서 inline으로 작성한 css 내용이 매우 우선하기 때문에 수정할 때에 문제가 생길 수도 있다.

```css
<div style="color : red; margin : 20px;"> </div>
```

### 링크 방식

- link 태그를 통해서 css 파일을 불러오는 방식이다.
- 병렬로 연결되는 방식이다.
  - html에 링크를 통해 연결된 모든 css는, css 파일을 한번에 가져와서 연결을 시작하는 구조를 갖는다.
  - 해석이 빨리되는 css가 먼저 연결되는 구조를 갖는다.

```css
<link rel="stylesheet" href="./css/main.css">
```

### @import 방식

- @import 규칙을 통해서 css 문서 안에서 또 다른 css 문서를 가져와서 연결하는 방식
- 직렬로 연결하는 방식이다.
  - 아래의 예시에서 main.css를 가져오지 않는다면, box.css를 못가져오게 된다.
  - main.css가 html에 연결되어, @import 코드가 해석된 뒤에, box.css가 html에 연결될 수 있다. (연결을 의도적으로 지연시키는데 사용 가능)

```css
<link rel="stylesheet" href="./css/main.css">

/* main.css */
@import url("./box.css");
div{
  color : red;
  ...
}

/* box.css */
.box {
  background-color : red;
  padding : 20px;
}
```