# Node.js

## Node.js 개요

- **Chrome V8 Javascript 엔진으로 빌드된 JavaScript 런타임(Java Script 동작환경)**
  - 컴퓨터에서 사용한 여러 module들을 HTML, CSS, JS로 변환하기 위해서 JS를 사용하는 nodeJS 환경을 사용.
  - 로컬 런타임(동작환경) 제어
  - 브라우저 런타임(동작환경) 제어

- **nvm : nodejs 버전을 변경할 수 있도록 해주는 프로그램**
  - node : node.js 환경 실행 가능
  - .exit : node.js 환경 종료
  - node --version : node.js version 확인
  - nvm --version : nvm version 확인
  - nvm use \<version> : 특정 버전 node.js 사용 가능
  - nvm ls : 현재 설치된 node.js 버전들 확인 가능
  - nvm install \<version> : 특정 버전의 node.js 설치
  - nvm uninstall \<version> : 특정 버전의 node.js 제거
  - nvm --help : nvm 명령들 확인 가능

- **npm(node package manager) : 여러 패키지(기능/모듈)들을 설치 및 관리해주는 매니저**
  - npm init -y : package-json 기본값을 세팅한다.
  - node package를 설치 : node_modules 디렉토리에 모듈이 설치되고, package-json에 dependency가 추가된다.
    - **npm install \<package\> -D : devDependencies에 설치됨**
      - **개발용 의존성 패키지 : 패키지가 개발시에만 필요하고, 브라우저에서 동작 시에는 필요 없는 패키지이다.**
    - **npm install \<package\> : dependencies에 설치됨**
      - **일반 의존성 패키지 : 브라우저에서 동작 시에 필요한 패키지이다.**
  - package-json에 한번 dependency가 추가되어있다면 : npm install i(nstall)을 통해서 node_modules에 모듈 재설치 가능하다.
    - npm install i : 한번 설치한 패키지 재설치

- **두 종류의 nodejs package**
  - 전역에 설치된 package : 의존성 라이브러리를 전체적으로 관리함
  - 특정 프로젝트에만 설치된 package : 특정 프로젝트 내에서만 관리됨

- **npx : npm 5.2.0 버전부터 새로 추가된 도구**
  - 사용의 경우
    - npm run-script를 사용하지 않고, **로컬에 설치된 package를 사용할 경우** 사용할 수 있다.
    - **일회성 명령으로 package를 실행시킬 경우** 사용할 수 있다.

```bash
- 로컬에 설치된 nodemon 실행가능 -
npx nodemon app.js
```

## package.json
  
- [참고](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174371/package-json)
- 프로젝트 명세 (이름, 버전, 홈페이지, 저자 등..) 에 대한 정보를 갖고 있다.
- 현재 프로젝트가 의존하고 있는 확장 모듈에 대한 정보를 갖고 있다.
- 협업을 위해서 각자의 컴퓨터에 같은 패키지를 설치하는 과정에서 사용 가능하다.
- **version 정보를 저장할 때 version range를 사용한다.**
  - npm 버전이 다른 경우, 서로 다른 node_modules 트리가 생성될 수 있다.

## package-lock.json

- **version range를 사용하지 않고 정확한 version을 사용한다.**
- node_modules 구조, package.json이 수정 및 생성될 당시의 의존성에 대한 정확하고 구체적인 정보를 갖음.
  - **즉, package A가 사용하는 다른 package B에 대한 정보들도 갖고 있다.**
- npm install 을 사용하면 자동으로 생성된다.
- package-lock.json 이 있는 경우, 이를 바탕으로 npm install 이 진행된다.

## npm으로 package 실행시키기

- package.json 파일의 "scripts"에 node 실행문을 추가한다.
- 추가한 실행문은 npm run ... 명령어로 실행시킬 수 있다.
  - (즉, script 이름과 실행하려는 명령의 키-값 쌍을 추가하는 것이다.)
- (예) parcel 실행시키기
  - package.json 파일의 "scripts" 객체 안에 "dev" : "parcel index.html" 추가
  - npm run dev 명령어로, 로컬 npm 패키지 실행이 가능하다.

## js 파일에서 dependency import 하기

```js
import _ from 'package';

// lodash package를 import 한다.
import _ from 'lodash';
```