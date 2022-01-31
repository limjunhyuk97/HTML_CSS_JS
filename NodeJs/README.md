# Node.js


## Node.js 개요

- **Chrome V8 Javascript 엔진으로 빌드된 JavaScript 런타임(Java Script 동작환경)**
  - 로컬 런타임(동작환경) 제어
  - 브라우저 런타임(동작환경) 제어
  - js 를 사용한 여러 패키지를 이용가능한 환경 제공
  - js 를 이용한 동적인 웹 환경을 테스트 할 수 있는 환경 제공

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
  - npm install \<package\>@\<version\> : 특정 패키지를 설치한다. / 제일 최신 버전의 package로 update 한다.
  - node package를 설치 : node_modules 디렉토리에 모듈이 설치되고, package-json에 dependency가 추가된다.
    - **npm install \<package\> -D : devDependencies에 설치됨**
      - **개발용 의존성 패키지 : 패키지가 개발시에만 필요하고, 브라우저에서 동작 시에는 필요 없는 패키지이다.**
    - **npm install \<package\> : dependencies에 설치됨**
      - **일반 의존성 패키지 : 브라우저에서 동작 시에 필요한 패키지이다.**
  - package-json에 한번 dependency가 추가되어있다면 : npm install i(nstall)을 통해서 node_modules에 모듈 재설치 가능하다.
    - npm install i : 한번 설치한 패키지 재설치
  - npm info \<package\> : package 에 대한 설명과 최신 버전 정보 확인

- **nodejs package 설치 위치**
  - 전역에 설치된 package : 의존성 라이브러리를 전체적으로 관리함
  - 특정 프로젝트에만 설치된 package : 특정 프로젝트 내에서만 관리됨

- **npx : npm 5.2.0 버전부터 새로 추가된 도구**
  - 언제 쓰는가?
    - npm run-script를 사용하지 않고, **로컬에 설치된 package를 사용할 경우** 사용할 수 있다.
    - **일회성 명령으로 package를 실행시킬 경우** 사용할 수 있다.

```bash
- 로컬에 설치된 nodemon 실행가능 -
npx nodemon app.js
```

- nodejs는 파일 하나를 하나의 모듈로 간주한다.


## package.json
  
- [참고](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174371/package-json)
- 프로젝트 명세 (이름, 버전, 홈페이지, 저자 등..) 에 대한 정보를 갖고 있다.
- 현재 프로젝트가 의존하고 있는 확장 모듈에 대한 정보를 갖고 있다.
- 협업을 위해서 각자의 컴퓨터에 같은 패키지를 설치하는 과정에서 사용 가능하다.
- **version 정보를 저장할 때 version range를 사용한다.**
  - npm 버전이 다른 경우, 서로 다른 node_modules 트리가 생성될 수 있다.


## package-lock.json

- **version range를 사용하지 않고 정확한 version을 명시한다.**
- node_modules 구조, package.json이 수정 및 생성될 당시의 의존성에 대한 정확하고 구체적인 정보를 갖음.
  - **즉, package A가 사용하는 다른 package B에 대한 정보들도 갖고 있다.**
- npm install 을 사용하면 자동으로 생성된다.
- package-lock.json 이 있는 경우, 이를 바탕으로 npm install 이 진행된다.


## node_modules

- package.json에 있는 모듈 뿐만 아니라, package.json에 있는 모듈들이 의존하고 있는 모듈 전부에 대한 정보를 갖고 있다.
- 현재 프로젝트에 설치되어 있는 특정 모듈의 버전에 대한 정보를 확인할 수 있다. 


## package 실행

### npm script

- **외부모듈의 실행**
- package.json 파일의 "scripts"에 node 실행문을 추가한다.
- node_modules/.bin 폴더의 실행파일을 node 명령어 없이 직접 실행시키는 방식이다.
- 해당 실행파일은 0과 1로 구성된 바이너리 파일이므로 자체 실행이 가능하다.

```bash
"scripts" : {
  "dev" : "parcel index.html"
}

$ npm run dev
```

### node

- **node_modules 아래에 있는 외부 모듈 실행**
- node 명령어는 js 파일을 실행시킬 수 있으므로, 경로를 직접 지정해주어 실행시키는 방식이다.

```bash
$ node node_modules/parcel-bundler/bin/cli.js index.html
```

### npx

- **모듈의 일회적 실행 / node_modules 아래에 있는 모듈 실행**

```bash
$ npx parcel-bundler index.html
```

### \<package 명\> index.html 같은 방식으로 실행이 안되는 이유

- **Shell 입장에서는 \<package 명\> 이라는 환경변수는 존재하지 않으므로 당연히 실행이 안된다.**


## 유의적 버전 (Semantic Versioning = SemVer)

- 특정 시점의 상태에 대한 식별 가능한 유일한 이름을 지정하는 것.
- **^Major.Minor.Patch**
  - Major : 기존 버전과 호환O. 새로운 버전
  - Minor : 기존 버전과 호환X. 새로운 기능이 추가된 버전
  - Patch : 기존 버전과 호환O. 버그, 오타 등이 수정된 버전
  - ^ : Major 버전 안에서 가장 최신 버전으로 업데이트 가능하다는 의미 (npm update \<package\> 시 최신버전으로 업데이트 됨)


## git push 시 유의 사항

- 따로 버전관리 필요가 없는 폴더들은 git에 push 하지 않아도 된다. (예: node_modules, dist, .cache 등 ..)


