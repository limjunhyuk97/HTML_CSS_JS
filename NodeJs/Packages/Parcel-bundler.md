# Parcel-Bundler

## 개요

- 개발 의존성 패키지 (-D)
- 프로젝트 개발에 사용한 여러 모듈을 번들링해준다.
- 난독화가 일어난다. (코드를 읽기 어렵게 만드는 작업. 용량 축소. 브라우저가 읽기 용이하게)

```bash
npm install parcel-Bundelr -D
```

## 사용

- parcel ___.html : html 파일 실행 프로세스를 localhost 8000 포트로 연결해준다.
- parcel build ___.html : 실제로 프로젝트 생성시에 쓰인 각종 파일들을 묶어서 bundle로 만들어서 실행시킨다.(프로젝트를 제품으로 생성)
 
```bash
npx parcel ___.html
npx parcel build ___.html
```