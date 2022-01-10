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

### 7. header 부터 구현 시작

- 기능적 역할보다는 사이트의 헤더 영역이라는 기본적인 의미만 갖고 있다.
  - 로고, 서브메뉴, 메인메뉴 존재
  - 확대하면 메뉴 왼쪽부분으로 확대 되는 것 확인

- img 요소 밑에 공간 생김
  - img 요소는 inline 요소이므로, 문자 입력의 바닥 기준인 baseline을 기준으로 아랫부분에 공간이 생김.
  - img 요소를 display : block으로 설정해주게 되면 block 요소로 성질이 변경되기 때문에 아랫부분 공간이 사라진다.