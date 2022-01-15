# Starbucks 홈페이지 구현

## 알게된 것들!

### 1. 탭에 아이콘 뜨게 만들기

- 프로젝트의 root 경로에 favicon.ico라는 파일이 있으면, 해당 파일을 자동으로 찾아다가 페이지 아이콘으로 사용하게 된다.
- link rel="icon" 으로 특정 png 파일을 아이콘으로 적용시킬 수 있다.

### 2. 브라우저에서 제공하는 기본적인 스타일 초기화

- reset-css 검색하여 link 복사 붙여넣기

### 3. 빈 태그

- 빈 태그 끝에 / 붙여주면 더 엄밀해 진다.

### 4. 오픈 그래프

- **웹페이지가 소셜 미디어로 공유될 때 우선적으로 활용될 정보**를 지정.
- kakaotalk, slack 같은 소셜 메신저에 공유할 때 사용되는 속성.
- meta 태그로 작성

```html
<!-- 스타벅스 오픈 그래프 예시 -->
<!-- 페이지 유형 / 페이지 소속된 사이트 이름 / 페이지 이름 / 페이지 설명 / 카드에 표시되는 이미지 / 페이지 주소 -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Starbucks" />
<meta property="og:title" content="Starbucks Coffee Korea" />
<meta property="og:description" content="스타벅스는 세계에서 가장 큰 다국적 커피 전문점으로, 64개국에서 총 23,187개의 매점을 운영하고 있습니다." />
<!-- seo : search engine optimization. 웹사이트에 자신의 페이지를 노출할때 최적화를 위한 작업. / 작업해둔 img 쓴 것. -->
<meta property="og:image" content="./images/starbucks_seo.jpg" />
<meta property="og:url" content="https://starbucks.co.kr" />
```

### 5. 트위터 카드

- 트위터로 공유될 때 우선적으로 활용되는 정보 지정

```html
<!-- 카드 유형 / 속한 페이지 이름 / 페이지 이름 / 페이지 설명 / 페이지 대표 이미지 주소 / 페이지 주소 -->
<meta property="twitter:card" content="summary" />
<meta property="twitter:site" content="Starbucks" />
<meta property="twitter:title" content="Starbucks Coffee Korea" />
<meta property="twitter:description" content="스타벅스는 세계에서 가장 큰 다국적 커피 전문점으로, 64개국에서 총 23,187개의 매점을 운영하고 있습니다." />
<meta property="twitter:image" content="./images/starbucks_seo.jpg" />
<meta property="twitter:url" content="https://starbucks.co.kr" />
```

### 6. Google Font, Google Material Icons

- Google Font 로 글꼴 골라올 수 있다.
  - googl font에서 골라올 수 있다.
  - 이때 license에 유의해서 골라야할 것~

- Google Material Icons 로 페이지 구성에 사용할 여러 icon들을 가져올 수 있다.
  - Google Material Icons getting started > icon들을 가져오기 위한 link를 head 부분에 연결
  - Google Material Icons > Resources > Material icons 에서 icon들을 검색하여 tag들을 가져온다.
  - tag 꼭 span tag를 사용하지 않아도 됨

### 7. header 부터 구현 시작

- 기능적 역할보다는 사이트의 헤더 영역이라는 기본적인 의미만 갖고 있다.
  - 로고, 서브메뉴, 메인메뉴 존재
  - 확대하면 메뉴 왼쪽부분으로 확대 되는 것 확인

- img 요소 밑에 공간 생김
  - img 요소는 inline 요소이므로, 문자 입력의 바닥 기준인 baseline을 기준으로 아랫부분에 공간이 생김.
  - img 요소를 display : block으로 설정해주게 되면 block 요소로 성질이 변경되기 때문에 아랫부분 공간이 사라진다.

- a 태그의 사용

```html
<!-- link는 준비 안된 상태일 때 넣기 가능 / 임시적으로 요소 관리 가능 -->
<!-- javascript:void(0) : 아무런 일도 일어 나지 않음 -->
<!-- # : SPA 와 연관 있음 -->
<a href="javascript:void(0)"></a>
<a href="#"></a>
```

- **a 태그 밑줄 싹다 제거**

```css
/* COMMON */

a {
  text-decoration : none;
}
```

- **가상 요소 선택자와 구분선**

```css
/* 메뉴에서 구분선 만들어주기 */

li::before {
  content : "";
  display : block;
  width : 1px;
  height : 12px;
  background-color : black;
}


li:first-child:before {
  display : none;
}
```

<p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148764614-bb9941f3-85ea-43cc-9730-5e0fd8fdd192.png" width = 50% height=35%></p>

- **js/css 연동 통해서 요소 자연스럽게 사라지게 만들기**
  - focused 됨 -> 'focus' class 추가 -> opacity + transition 으로 자연스럽게 사라짐

```js
// searchInputEl(input)에서 focus가 일어나면,
// - searchEl에 classList로 'focused' class 를 추가. -> css 속성과 연동
// - searchInputEl에 html 속성을 setAttribute(속성이름, 속성 값)로 추가한다.
searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
```

```css
/* fade-out 되는 효과를 주기 위해서 transition + opacity를 준다. */
header .sub-menu .search.focused .material-icons {
  transition : 0.4s;
  opacity: 0;
}
```

- **COMMON 하게 사용되는 .inner**
  - 페이지 내, 일정 수준의 너비 공간 내, 요소들의 가운데 정렬을 손쉽고 일률적으로 수행하기 위해 사용
  - 가장 상위에서 COMMON 하게 사용함

```css
/* inner 클래스는 공통적으로 작용하며, 한줄의 컨텐츠를 가운데로 몰아주는 역할을 수행하게끔 정의되있음 */
.inner {
  width : 1100px;
  position: relative;
  margin : 0 auto;
}
```

- **드롭다운 메뉴**의 구현
  - hover 사용하여 구현할 수 있음
  - 평상시에는 display : none
  - hover시에 display : block

```css
header .main-menu .item .item__name {
  padding : 10px 20px 34px 20px;
  font-family: Arial, sans-serif;
  font-size : 13px;
}

/* main menu에 드롭다운 메뉴 만들어 넣기 */

/* .item__name 주변 바뀜 + .item__contents 등장 : 둘다 아우를 수 있는 .item:hover 설정 */
header .main-menu .item:hover .item__name {
  background-color: #2c2a29;
  color : #669900;
  border-radius: 5px 5px 0px 0px;
}

/* item__contents 부분이 드롭다운 메뉴 파트 */
/* top, bottom 속성 사용하지 않아서 수직 위치 값이 없다면, 요소의 원래 위치를 그대로 사용 */
/* 여기서 fixed로 지정했으므로, 뷰포트 좌우 끝까지 늘어난다. */
/* 만약에 absolute로 지정했다면, 뷰포트 좌우 끝까지 늘어날 수 없다. */
header .main-menu .item .item__contents {
  /* 뷰포트를 기준으로 배치하는데 */
  position : fixed;
  /* 뷰포트를 기준으로 수평으로 꽉채우며*/
  width : 100%;
  /* left로 쭉 늘인다. */
  left : 0;
  /* top, bottom 속성에 대한 값이 없으므로, 원래 들어갔어야할 위치에 들어간다.*/
  display: none;
}

/* item__contents 부분의 드롭다운 메뉴 파트 : hover */
/* item에 cursor를 올려놓을 때, display:none을 display:block으로 바꿔서 보여지게끔 */
header .main-menu .item:hover .item__contents {
  display : block;
}
```