# 학습 정리





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
  - data-link = '' attribute를 추가하여 button 임을 나타냄
  - href = '/목적지' attribute를 추가하여 목적지 정보를 추가한다.
- 요소의 내용 getAttribute() 로 회수
- event.target 은 이벤트가 발생한 대상 객체를 가리킨다.

```html
<!-- tag 내에 다른 위치로의 연결을 위한 속성 추가 -->
<div data-link='' href="/posts"> </div>
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





## session 활용한 로그인 상태 유지

- session : server로부터 발행되어 쿠키에 저장된 sessionID, 서버측에 저장된 sessionID에 대응하여 로그인을 유지하게 해주는 **상태 혹은 방법**.





## modal

- modal window 는 사용자 인터페이스 디자인 개념에서, 자식 윈도우에서 부모 윈도우로 돌아가기 전에 사용자 상호동작을 요구하는 창이다.


## form 태그

- form 태그 내부의 데이터들은 method="post" 방식일 경우 쿼리스트링으로 name=value 형식으로 전달된다.
- POST 방식은 GET방식과 다르게 데이터 길이의 제한도 없고, 보안성도 높다.

```html
<form action="/examples/media/action_target.php" method="post">
    이름 : <input type="text" name="st_name"><br>
    학번 : <input type="text" name="st_id"><br>
    학과 : <input type="text" name="department"><br>
    <input type="submit">
</form>
```





## cookie 다루기

- [참고](https://blogpack.tistory.com/1071)

```js
// Cookie 값 설정
function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}
```





## Express JSON 파싱

```js
app.use(express.json());
```





## 부모요소 밖으로 안튀어나오게 css

- overflow : hidden 속성이용하면 됨..
- 무식하게 똑같이 깎으려 하지말고..

```css
{
overflow : hidden;
}
```





## event

- **mouse event** click과 **form event** focus는 엄연히 다르다.





## addEventListener

- event.target으로 event가 발생한 요소를 지칭해주는 것 자꾸 까먹지 말자!





## 콤보박스

- 여러항목 중 하나를 골라야 하는 경우

```css
<select name="language" onchange="handleOnChange(this)">
  <option value="korean">한국어</option>
  <option value="english">영어</option>
  <option value="chinese">중국어</option>
  <option value="spanish">스페인어</option>
</select>
```





## JSON.stringify

- JSON 형식으로 보내기로 했으면 body부분을 JSON.stringify로 변환 후 보내주는 것 잊지말자..





## 프롬프트 창

- alert
- prompt
- confirm





## MutationObserver

- DOM content 의 변화를 감지하는 역할을 수행한다.


```js
// new MutationObserver로 Mutation이 어떤 작업을 수행할 지에 대해서 callback으로 정의
const observe_board_change = new MutationObserver(mutations => {
  mutations.forEach(el => {
    console.log(el.type);
  })
});

// 어떤 mutaition을 감지할지 설정
const config = { attributes: true, childList: true, characterData: true };

// MutationObserver 객체에 '(1) 타겟이 되는 대상'과 '(2) 어떤 mutation을 감지할 지에 대한 설정' 전달
observe_board_change.observe(main_menu_articles, config);
```





## 전역배지 생성(GSAP)

### 배지 생성

- 헤더에서 특정 위치만큼 떨어져 있는 badge 생성
- 헤더로부터의 거리를 기준으로 잡기때문에 스크롤에 상관없이 화면 내에 고정되어 있는 효과

```html
<!-- header 아래 badges -->
    <div class="badges">
      <div class="badge">
        <img src="./images/badge1.jpg" alt="Badge" />
      </div>
      <div class="badge">
        <img src="./images/badge2.jpg" alt="Badge" />
      </div>
    </div>
```

```css
header .badges {
  position : absolute;
  top: 132px;
  right : 12px;
}

header .badges .badge{
  border-radius : 10px;
  overflow : hidden;
  margin-bottom: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  cursor : pointer;
} 
```

### GSAP Library

- 서서히 사라짐을 위한 GSAP 효과
- html에 GSAP cdn 추가로 도입 가능

```js
const badgeEl = document.querySelector("header .badges");

addEventListener('scroll', _.throttle(()=> {
  // scrollY : Y축으로 몇 pixel 지점에 있는 지 확인 가능
  console.log(window.scrollY);
  if(window.scrollY > 500) {
    // gsap.to(요소, 지속시간, 옵션);
    // 눈으로 볼때만 사라진 것이므로 실제로 클릭도 안되게 사라지게 해야함
    gsap.to(badgeEl, 0.6, {
      opacity : 0,
      // gsap 내에서 문자열 값은 따옴표로 처리해야함.
      display : 'none'
    })
  }
  else{
    gsap.to(badgeEl, 0.6, {
      opacity : 1,
      display : 'block'
    })
  }
}, 300));
```





## position fixed / absolute

- block 요소는 원래 가로길이가 최대한 늘어나려고 한다.
- block 요소의 position 속성값이 fixed/ absolute라면, 가로길이는 최대한 줄어들으려 한다.





## 관습적 HTML section 구분 

- header
- section
- footer





## 이미지(광고판 처리)

- 기본적인 이미지들이 들어갈 위치를 정하고

```html
<section class="visual">
    <div class="inner">
      <div class="title">
        <img src="./images/visual_title.png" alt="STARBUCKS DELIGHTFUL START TO THE YEARS" />
        <a href="javasript:void(0)" class="btn">자세히 보기</a>
      </div>
      <img src="./images/visual_cup1.png" class="cup1 image" alt="new CUP1" />
      <img src="./images/visual_cup1_text.png" class="cup1 text" alt="라떼" />
      <img src="./images/visual_cup2.png" class="cup1 image" alt="new CUP2">
      <img src="./images/visual_cup2_text.png" class="cup1 text" alt="모카" />
      <img src="./images/visual_spoon.png" class="spoon image" alt="Spooon" />
    </div>
</section>
```

```css
/* 가운데 정렬을 위한 설정 */
.inner {
  width : 1100px;
  position: relative;
  margin : 0 auto;
}

.visual .inner {
  height : 646px;
  background-color: orange;
}
/* 정해진 height, width를 갖는 영역 내에서 그림 요소들을 요기조기 잘 배치 */

.visual .title {
  position: absolute;
  top : 88px;
  left : -10px;
}

.visual .cup1.image {
  position: absolute;
  bottom : 0;
  right : -47px;
}

.visual .cup1.text {
  position : absolute;
  top : 38px;
  right : 171px; 
}

.visual .cup2.image {
  position: absolute;
  bottom : 0;
  right : 162px;
}

.visual .cup2.text {
  position : absolute;
  top : 321px;
  right : 416px;
}

.visual .spoon {
  position : absolute;
  bottom : 0;
  left : 275px;
}
```





## 중복된 버튼에 대한 미리 설정

- 중복되어 계속 사용되는 기능들에 대해서 상부에서 미리 정의해 둘 수 있다.

```css
.btn {
  width : 130px;
  padding : 10px;
  border : 2px solid #333;
  border-radius: 4px;
  color : #333;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  /* padding, border가 들어가더라도 사이즈가 커지지 않도록 */
  box-sizing: border-box;
  display: block;
  transition: .4s;
}

.btn:hover {
  background-color: #333;
  color: white;
}

/* class가 더 부여되어있기 때문에 선택자 우선순위 값이 커진다. 스타일 덮어쓰기 가능 */
/* BEM 방식에 따른 상태별 버튼 정의 */
.btn.btn--reverse {
  background-color: #333;
  color : white;
}

.btn.btn--reverse:hover {
  background-color: transparent;
  color : #333;
}
```







