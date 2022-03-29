# Bundler

- parcel-Bundler
- Webpack
- Rollup
- 등..



## 개요

- **번들링 : 웹 페이지를 개발하는데 사용한 고도화를 돕는 각종 module이나 framework를 HTML, CSS, JS의 웹에서 동작가능한 형태로 바꿔주는 것**
- Parcel, Webpack은 번들링을 돕는 라이브러리이다.

### 1. Parcel(-bundler)

- 구성 없고, 단순한 자동 번들링을 지원
- 소/중형 프로젝트에 적합

### 2. Webpack

- 매우 꼼꼼한 구성을 지원
- 중/대형 프로젝트에 적합



## 1. Parcel

### Parcel이란

- 개발 의존성 패키지 (-D)
- 프로젝트 개발에 사용한 여러 모듈을 번들링해준다.
- 난독화가 일어난다. (코드를 읽기 어렵게 만드는 작업. 용량 축소. 브라우저가 읽기 용이하게)

```bash
npm install parcel-bundler -D
```

### Parcel 사용

- [문서](https://ko.parceljs.org/)
- script 생성
  - "dev" : "parcel ___.html" : html 파일 실행 프로세스를 localhost 1234 포트로 연결해준다.
  - "build" : "parcel build ___.html" : 실제로 프로젝트 생성시에 쓰인 각종 파일들을 묶어서 bundle로 만들어서 실행시킨다.(프로젝트를 제품으로 생성)
 
```bash
npx parcel ___.html
npx parcel build ___.html
npm run dev
npm run build
```

### dist 폴더

- 웹페이지를 구현하는데 사용한 여러 파일 데이터를, dist 폴더 안에 해쉬기호를 붙여서 모아준다. (웹에서 확인할 수 있게 되는 파일들이 들어가있다.)

### 정적파일 포함하기

- **parcel-plugin-static-files-copy** 이용하여 정적 파일들 또한 dist 폴더에 넣어줄 수 있다.
  - npm i parcel-plugin-static-files-copy -D
  - package.json 폴더에 다음 추가 : static이라는 폴더 내의 정적 자산들을 dist에 자동으로 추가할 수 있게 됨

```json
"staticFiles" : {
  "staticPath" : "static"
}
```

### 브라우저별 css 적용

- **브라우저의 버전**에 따라서 css가 적용되거나, 되지 않을 수 있다.
- **webkit이나, ms와 같은 Vender Prefix를 적용하는 방식으로 보험을 들어**둘 수 있다.
- Vender Prefix를 자동으로 붙여주는 패키지가 존재함.
  - npm i postcss -D
  - npm i autoprefixer -D
- 이 둘 간에 버전 호환 문제가 자주 발생하니 유의바람..

```css
display : flex;

/* vendor prefix */
display : -webkit-box;
display : -ms-flexbox;
```
