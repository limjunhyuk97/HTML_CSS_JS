# SCSS / SASS

- CSS 전처리 도구
- 기존의 CSS 문법과 호환이 가능하다.
- SCSS는 CSS의 모든 구문과 완벽히 호환되도록 새로운 구문을 도입해 만든 SASS의 모든 기능을 지원하는 CSS의 상위집합.
- 중첩 기능 : 코드 가독성 및 코드 작성 효율이 높아진다.
- 변수 활용 : 코드에서의 오류 발생가능성이 줄어든다.

## parcel-bundler 와 SCSS

- parcel-bundler를 개발의존성 패키지로 설치한 뒤에 (npm i -D parcel-bundler)
- .scss 파일을 생성 및 작성하고, html 파일에 연결해주고
- script "run" : "parcel index.html"을 통해서 html 파일 실행 프로세스를 돌리면
- 자동으로 sass 패키지가 package.json에 올라가는데, parcel-bundler가 필요한 모듈을 자동으로 추가한 것. 