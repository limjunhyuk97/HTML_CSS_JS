# React



## 01. React Concept

### Angular vs React vs Vue

- **Angular**
  - cross platform : 어떤 platform 에서든지 하나의 코드로 결과를 낸다.
  - 웹에 필요한 전반적인 모든 것을 제공하는 **프레임워크** (Client, 인증 등..)

- **Vue**
  - Angular와 마찬가지로 JS 프레임워크
  - **라이브러리처럼 다룰 수도 / 프레임워크처럼 다룰 수도** 있다.

- **React**
  - User interface를 만들기 위한 **JS 라이브러리**
  - Component based development
    - Component : 내가 정의한 component로 페이지 내용을 쌓아감 / html + css + js 가 합쳐진 사용자 정의 태그의 생성

### View를 다루는 라이브러리

### Only Rendering & Update

### Component Based Development

### Virtual DOM

- DOM의 직접 제어
  - 바뀐 부분만 정확히 제어
- **DOM을 직접 제어하지 않음(Virtual DOM)**
  - 가상의 돔 트리 사용 : 상태 별로 Virtual DOM 이 존재하고, 바뀐 부분만 React가 찾아서 바꿔줌

<p align="center"><img src="https://user-images.githubusercontent.com/59442344/158374268-a3d51033-7356-4d02-8dfe-4c35f8259952.png" width="60%"></p>

### JSX

### CSR and SSR

#### CSR (Client Side Rendering)

1. Client가 Server로부터 HTML 받음
2. HTML과 연결됨 JS를 받음
3. React Application이 실행되기 시작
4. source code가 실행된 후에야 유저가 **화면을 볼 수 있고, 상호작용 가능** (이후에는 server에 데이터만 요청)

#### SSR (Server Side Rendering)

1. Client가 Server로부터 HTML 받음
2. Client가 Rendering(DOM Tree + CSSOM Tree -> Rendering Tree -> Node를 그림)을 완료하면 **화면을 볼 수 있음**
3. JS를 다운로드 받음
4. React Application이 실행되기 시작
5. source code가 실행된 후에야 유저가 **상호작용 가능**



## 02. Core modules

```js
// React component => HTMLElement 연결
import ReactDOM from 'react-dom'

// React component 생성
import React from 'react'
```



## 03. React Component 생성

### Class component

```js
import React from "react";

class ClassComponent extends React.Component {
  render() {
    return (<div>Hello</div>)
  }
}
```

