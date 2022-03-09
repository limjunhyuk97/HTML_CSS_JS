# 임시정리



## 요소 중앙정렬
 
### 1. 요소의 정렬 (중앙 정렬)

- display : flex;
- justify-content : center;
  - (flex 설정 내부 요소로 한 요소만 존재할 때, 중앙에 위치시킨다.)
- align-items : center;
  - (flex 설정 내부 요소들을 수직상에서 가운데 정렬, align 은 수직축 방향으로 정렬)

### 2. 요소의 배치 (중앙 배치)

#### 2.1 width / margin

- width 에 대한 값을 잡는다. (특정 사이즈를 갖는 이미지의 경우 , width 잡으면 height도 비율에 맞춰서 잡힌다.)
- 좌,우 margin 값을 auto로 부여한다.

#### 2.2 width / position / left, right / margin

- width 에 대한 값을 잡는다.
- 위치상 부모요소를 기준으로 잡는다. (position : absolute)
- left, right 를 0으로 잡는다. (left : 0; right : 0;)
- margin 을 브라우저가 알아서 계산하도록 auto 로 잡는다. (margin : auto)

#### 2.3 height / position / top, bottom / margin

- height 에 대한 값을 잡는다.
- 위치상 부모요소를 기준으로 잡는다. (position : absolute)
- top, bottom 을 0으로 잡는다. (top : 0; bottom : 0;)
- margin 을 브라우저가 알아서 계산하도록 auto 로 잡는다. (margin : auto)

### 3. 100vh

- 뷰포트 높이 100퍼센트
- 요소 가로는 자동적으로 뷰포트 너비만큼 늘어나게 됨



## padding 이 적용되지 않는 현상 해결 방법

- css 설정들 간의 중첩에서 발생하는 현상



## a 말고 div로 click 이동

### 1. onclick 사용법

```html
<!-- div 내에 다음 속성 추가 -->
style="cursor: pointer;" onclick="location.href='/경로';"
```

### 2.html tag 내 요소 추가

- html tag 내 요소 추가
- 요소의 내용 getAttribute() 로 회수
- event.target 은 이벤트가 발생한 대상 객체를 가리킨다.

```html
<!-- tag 내에 다른 위치로의 연결을 위한 속성 추가 -->
<div href="/posts"> </div>
```

```js
// event.target 속 href 속성의 값을 가져온다.
history.pushState(null, null, event.target.getAttribute(href));
```



## input placeholder

- focus, 즉 클릭했을 때의 설정 : onfocus
- blur, 즉 포커스 제거했을 때의 설정 : onblur

```html
<input type="text" id="login__id__val" placeholder="아이디를 입력해주세요" onfocus="this.placeholder=''" onblur="this.placholder='아이디를 입력해주세요'" />
```



<<<<<<< HEAD
## 부모 요소에 대응하여 크기 설정

- %를 사용하여 수치를 정하면 부모요소의 border가 둥글더라도 그대로 가져온다.

```css
#container {
  height : 90vh;
  width : 90vh;
  position: absolute;
  left : 0;
  right : 0;
  top : 0;
  bottom : 0;
  margin : auto;
  border : 5px solid #045D8B;
  border-radius: 20px;
  background-color: white;
}

#container header {
  width : 100%;
  height : 12%;
  background-color: #045D8B;
}
```



## material-icons 크기 설정

- class에 사이즈에 대한 설정 정보를 포함하여 미리 설정해 둔다.

```css
/* material icons */
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }
```
=======
## session 활용한 로그인 상태 유지

- session : server로부터 발행되어 쿠키에 저장된 sessionID, 서버측에 저장된 sessionID에 대응하여 로그인을 유지하게 해주는 **상태 혹은 방법**.



## modal

- modal window 는 사용자 인터페이스 디자인 개념에서, 자식 윈도우에서 부모 윈도우로 돌아가기 전에 사용자 상호동작을 요구하는 창이다.
>>>>>>> 97bc2335fee7c45afba68e40209a4e71a6d0f29e
