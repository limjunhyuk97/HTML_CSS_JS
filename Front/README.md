# Front end
  - HTML : hypertext markup language, 뼈대
  - CSS : cascading style sheet, 스타일
  - JS : javascript, 사용자와의 동적인 상호작용


## 01. 시작하기에 앞서

### 어떻게 작동하는가? 
  - 웹 페이지 request, html 뼈대 respond, 추가 요소 request, css js image 등 respond 

### 뷰포트
  - html, css, js가 렌더링되는 장소

### 웹 이미지 포멧
  - 비트맵(Raster) : 픽셀이 모여 만든 정보 집합
    - 정교, 다양한 색상 표현
    - 확대/축소 시 계단 현상 및, 품질 저하
    - 사진(.jpg, .png .gif)
      - jpg : 손실 압축을 사용하기에, 반복적으로 새롭게 저장하는 행위로 인해 손실 발생 가능. 품질, 용량 쉽게 조절 가능
      - png : 비손실 압축을 사용. gif의 대체 포멧. W3C 권장 포맷. 용량이 비교적 클 수 있음. 이미지 내 투명 부분 사용가능
      - gif : 비손실 압축을 사용. 이미지 파일 내에 이미지 및 문자열 정보 저장. 여러 장의 이미지를 한개의 파일에 담기 가능
      - WEBP : 완벽 손실/비손실 압축 지원. gif같은 애니메이션 지원. png의 투명도 지원. 지원되는 브라우저 목록 확인 요망(하위호환성)
  - 벡터(Vector) : 점, 선, 면, 색상 등 수학적 정보 형태의 이미지
    - 정교한 이미지 표현 어려움
    - 확대/축소에서 자유로움, 용량변화 없음
    - Material Design, 로고(.svg)
      - svg : 마크업 언어(HTML, XML) 기반의 벡터 그래픽 표현. 점, 선, 면 이미지 정보를 갖고 있음. 확대, 축소 시 해상도 영향 X. CSS, JS로 제어가능. 파일 및 코드로 삽입 가능. 즉, (파일이 아닌)코드로 삽입한 svg 정보를 css, js를 통해서 조작할 수 있다.

### 특수 기호 이름

 |key|이름|key|이름|key|이름|
 |:---:|:---:|:---:|:---:|:---:|:---:|
 |`|grave backtic|~|tilde|!|exclamation mark| 
 |@|At sign|#|Sharp|^|caret|
 |&|ampersand|*|asterisk|-|hyphen, dash|
 |_|under score|=|equal sign|"|quotation mark|
 |'|apostrophe|\||vertical bar|( )|parenthesis|
 |{ }|brace|[ ]|bracket|< >|angle bracket|



## 02. HTML의 구성

### DOCTYPE : 어떤 버전의 html을 사용하는 지에 대한 정보를 담고 있다.

### head : 정보
  - 웹 브라우저가 해석해야 하는 문서의 정보를 담고 있음.
  - 웹 브라우저의 제목, 설명, 파일 위치, css 등, 페이지에서 보이지 않는 정보를 담는다.

### body : 구조
  - 사용자 화면에 보여지는 웹페이지의 구조를 작성
  - 로고, 헤더, 푸터, 네비게이션, 메뉴, 버튼, 이미지 등..
