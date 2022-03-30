# React





## 00. 시작하기

```bash
$ npx create-react-app File명
# react 시작 위한 설정 생성
```





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

- **class component**
- **function component**
- **React.createElement**

### Hook 이란?

- component 상태와 생명주기를 관리할 수 있는 API

### Hook 이전

- Component 상태 O : class
- Component 상태 X
  - 라이프사이클 사용 O : class
  - 라이프사이클 사용 X : function (stateless Component)

### Hook 이후

- class, function을 이전과 같은 기준으로 구분하지 않음 (function에서도 상태 관리 / 라이프사이클 관리 가능)

### Class component / Function Component

- class Component로 생성
- function Component로 생성
- React.createElement로 생성 + JSX 문법 사용 가능

```js
import React from "react";

// ClassComponent 정의
class ClassComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
};

ReactDOM.render( 
  <ClassComponent />,
  document.querySelector("#root")
);

// FunctionComponent 정의(1) 일반 함수
function FunctionComponent1() {
  return (<div>Hello2</div>);
}

ReactDOM.render(
  <FunctionComponent1 />,
  document.querySelector("#root")
)

// FunctionComponent 정의(2) 화살표 함수
const FunctionComponent2 = () => <div>Hello3</div>;

ReactDOM.render(
  <FunctionComponent2 />,
  document.querySelector("#root")
)
```

### React.createElement

- React.createElement(type, [props], [..children]) : component 생성
- ReactDOM.render( component, 상위요소 ) : 그리기

```js
// React.createElement(
//   type, // 태그 이름 문자열 | React Component | React.Fragment | JSX
//   [props], // 리액트 컴포넌트에 넣어주는 데이터 객체
//   [ ... children] // 자식으로 넣어줄 요소들
// )
    
// 1. (태그 이름 문자열) type : 상위 태그 아래에 => 태그 생성
// <h1>type이 "태그 이름 문자열" 입니다.</h1>

 ReactDOM.render(
  React.createElement('h1', null, `type이 "태그 이름 문자열" 입니다.`),
  document.querySelector("#root")
)

// 2. (React Component) type : 상위태그 아래에 => React Component 생성 - 태그 생성
// <Component></Component>  =>  <p>type이 "태그 이름 문자열" 입니다.</p>

const Component = () => React.createElement('p', null, `type이 "React Component 입니다."`)
ReactDOM.render(
  React.createElement(Component, null, "엥?"),
  document.querySelector("#root")
)

// 3. (React.Fragment) type : 상위 태그 아래에 => 요소를 그냥 바로 넣을 수 있다.
// type이 "태그 이름 문자열" 입니다. 
ReactDOM.render(
  React.createElement(
    React.Fragment,
    null,
    `type이 "React Fragment 입니다."`
  ),
  document.querySelector("#root")
)

// 4. 구조가 복잡한 상태의 요소를 만드려 하는 경우 : createElement로 element를 생성하는 데에는 한계가 존재한다.
 ReactDOM.render(
  React.createElement(
    "div", null, React.createElement("div", null, React.createElement("h1", null, "주제"))),
  document.querySelector("#root")
)
```





## 04. JSX

- Reaxt.createElement 보다 가독성이 훨씬 좋게 component를 생성할 수 있다.
- createElement에 전달하는 인자 중, 'type' 부분에 적용해 넣을 수 있다.
- Babel과 같은 도구를 통한 컴파일 과정에서 문법적 오류를 인지하기 쉬워진다.

### JSX 문법

- 최상위 요소는 하나여야 한다 (최상위 요소 리턴의 경우 ()로 감싸주는 것이 좋다)
- 자식 두 놈을 병렬적으로 넣고 싶다면, <> </> 의 fragment로 감싸주면 된다.
- js 표현식을 사용하려한다면 { } 의 중괄호 내부에서 사용하면 된다 : if 문 사용 불가능 => 삼항연산자 or && 사용
- style 사용하여 inline 스타일링 가능
- class 대신에 className을 예약어로 사용
- 자식요소가 있으면 꼭 닫고 / 자식요소가 없으면 반드시 열면서 닫아야 한다.


```html
<script type="text/babel">
  // Babel을 사용하여 "우리가 작성한 코드" => "순수하게 실행가능한 js 코드"로 변경할 수 있다.
  // 즉, JSX로 작성한 코드를 순수 JS로 Babel이 컴파일해준다.
  // 즉, type에 "태그이름 문자열, React component, React fragment"를 넣지 않고 JSX문법으로 작성된 코드를 넣을 수 있다.
  ReactDOM.render(
    <>
    <div>
      <div>
        <h1>{2+3}</h1>
        <ul>
          <li>React</li>
          <li>Vue</li>
        </ul>
      </div>
    </div>
    <div>
      <div>
        <h1>주제</h1>
        <ul>
          <li>React</li>
          <li>Vue</li>
        </ul>
      </div>
    </div>
    </>
    ,
    document.querySelector("#root")
  )
</script>
```





## 05. Props / State

- Component의 상태와 관련된 두가지 개념
- **Props, State의 변경**이 일어나면, **Rendering이 다시** 일어나게 된다 => **Component를 다시 그리게** 된다 (이 작업을 **ReactDom.render()함수**가 수행)

<img width="661" alt="image" src="https://user-images.githubusercontent.com/59442344/160821289-4e917f31-cc60-4bdc-b91b-d711321d6e6f.png">

- **Props** : 컴포넌트에게 주는 데이터
  - Component 생성시 전달
  - defaultProps 로 기본적으로 전달할 값 설정 : Component.defaultProps / static defaultProps
- **State** : 컴포넌트 내부에서 변경할 수 있는 데이터
  - state 객체를 class내부에 정의
  - constructor에서 this.state 객체를 정의
  - componentDidMount를 통해서 rendering 시에 
    - this.setState( {this.state 내부 값을 변경한 객체} ) 
    - this.setState( previousState => { newState = {previousState, 즉 this.state 값 반영한 새로운 객체 전달}; return newState; } )
- **defaultProps** : 전달되는 Prop의 default 값을 결정한다.
  - static defaultProps : class에서 이용가능
  - Component명.defaultProps : class, function에서 모두 사용 가능

```html
<!-- Props / State -->
  <script type="text/babel">

    // function Component + props
    function Component2(props) {
      return (
        <div>
          <h1>{props.message} 함수로 만든 컴포넌트</h1>
        </div>
      );
    }

    // class Component + props + state
    class Component3 extends React.Component  {

      // state 데이터 정의방식 (1) state 객체 정의
      state = {
        count : 0,
      };

      // state 데이터 정의방식 (1) constructor로 정의
      constructor(props) {
        super(props);
        this.state = { count : 0 };
      }

      // render 메소드 호출 => Component가 그려짐
      render() {
        return (
        <div>
          <h1>{this.props.message} 클래스로 만든 컴포넌트</h1>
          <h2>{this.state.count}</h2>
        </div>
        ); 
      }

      // componentDidMount() 라이프사이클 훅 메소드 재정의 : Render 직후에 state 재정의 해 줄 것임
      componentDidMount() {
        setTimeout(() => {
          // 아래와 같은 방식으로는 state 변경이 일어나지 않음
          // this.state.count += 1; 

          // this.setState를 호출하여 값이 바뀐 상태로 render를 진행한다. (있는 객체의 값 변경)
          this.setState({
            count: this.state.count + 1,
          });

          // this.setState에 callback을 전달한다. (객체를 새로 생성할 수 있음)
          this.setState(previousState => {
            const newState = {count : previousState.count + 1}
            return newState;
          })
        }, 1000);
      }

      // defaultProps for (class component)
      static defaultProps = {
        message: "default2"
      }
    }

    // defaultProps for (class, function component)
    Component2.defaultProps = {
      message: "default",
    }

    // function Component 사용 + props 의 전달
    ReactDOM.render(
      <Component3 message = "Hello" />,
      document.querySelector("#root")
    );

  </script>
```





## 06. Event Handling

- HTML DOM에 이벤트가 발생하면 그에 맞는 변경이 일어나야 되는데, **JSX를 이용하여 이벤트를 설정**할 수 있다.
- **Props로** event가 React 요소에 **전달**된다.
- **적용방식**
  - 이벤트명은 CamelCase로만 작성한다.
  - 이벤트명={함수} 의 형태로 부여한다.
  - 실제 DOM 요소들에만 사용 가능하다.

```html
<!-- EventHandler -->
  <script type="text/babel">

    function Component2() {
      return (
        <div>
          <button onClick = { console.log("clicked") }>
            button!
          </button>
        </div>
      );
    }

    class Component3 extends React.Component {

      state = {
        count : 0,
      };
      
      constructor(props) {
        super(props);
        // 객체 메서드를 콜백으로 전달할 때 this 정보가 사라지는 문제에 대한 해결
        // 브라우저 환경에서 인수로 전달받은 함수를 호출할 때 window를 this로 할당한다.
        // 그러므로 this가 context로 고정된 함수를 반환하도록 bind를 사용하는 것이 좋다.
        // this.click = this.click.bind(this);
      }

      render() {
        return (
        <div>
          <p> {this.state.count} </p>
          
          { /* props로 이벤트 캐치하기 (내부 정의) */ }
          <button 
            onMouseEnter = { () => {
              console.log("mouseOver!"); 
              this.setState(state => ({
              // ...state를 통해서 state 전개 가능하다
              ... state,
              count : state.count + 1,
              }));
            }}
          >
            mouseOver!
          </button>

          { /* props로 이벤트 캐치하기 (외부 함수 정의) */ }
          <button
            onClick = {this.click}>
            click!
          </button>
        </div>
      );
      }

      // 또는 click에서의 this가 렉시컬 스코프를 따르도록 (자신이 선언된 메소드의 this를 따르도록)
      click = () => { 
        console.log("clicked!"); 
        this.setState(state => ({
          // ...state를 통해서 state 전개 가능하다
          ... state,
          count : state.count + 1,
        }));
      }

    }

    ReactDOM.render(<Component3 />, document.querySelector("#root"));

  </script>
```





## 07. Component Lifecycle

- React Component는 탄생부터 죽음까지, 여러지점에서 개발자가 작업이 가능하도록 메소드 오버라이딩을 돕는다.

### Hook

- Component의 생명주기에 개입하여 Component의 상태를 관리할 수 있게 해주는 API
- Declarative는 단계별 Hook들의 모임

### Declarative(16.3)

- Lifecycle의 각 구간을 구분해줌으로써, component가 수행해야 할 동작들을 구간별로 정의가능하게 한다.
- Props의 전달이나, State의 변화가 발생 **(Update)** => ReactDOM.render()가 작동한다.
- 버전 별로 Hook의 명칭이 바뀌니 유의

<img width="653" alt="image" src="https://user-images.githubusercontent.com/59442344/160859912-83b0e9fb-fb85-4b9f-8ffe-b57afffcb802.png">

- **Initialization** : constructor가 호출되면서 props와 state를 초기화 한다.
- **Mounting**
  - componentWillMount : render가 일어나지 직전
  - render : 최초로 브라우저에 그려짐
  - componentDidMount : render가 일어난 직후
- **Update (Props)**
  - componentWillReceiveProps
  - shouldComponentUpdate : Component가 Update되어야하는가 말아야 하는가에 대한 결정 구간
  - ComponentWillUpdate : render가 일어나기 직전
  - render : update 수행
  - componentDidUpdate : render가 일어난 직후
- **Update (States)**
  - shouldComponentUpdate : Component가 Update되어야하는가 말아야 하는가에 대한 결정 구간
  - componentWillUpdate : render가 일어나기 직전
  - render : update 수행
  - componentDidUpdate : render가 일어난 직후
- **componentWillUnmount** : Component가 사라지기 직전에 진행