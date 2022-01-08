# 전환 (Transition)

## transition

- 요소의 **전환 효과의 속성**을 지정하는 **단축 속성**
  - transition : 속성명 **지속시간** 타이밍함수 대기시간 / **지속시간**에 대한 값은 무조건 주어져야 한다.
  - 쉼표를 사용해서, 여러개의 단축속성 값을 지정할 수 있다.

- 개별속성
  - **transition-property / 전환효과를 사용할 속성이름을 지정한다.**
    - transition-property : all / (기본값) 모든 속성에 transition 효과를 적용한다.
    - transition-property : (특정 속성) / 전환효과를 사용할 속성이름을 명시한다. 
  - **transition-duration / 전환효과의 지속시간을 지정한다.**
    - transition-duration : 0s / (기본값) 전환효과를 지정하지 않는다.
    - transition-duration : (n)s / n 초 동안 transition 이뤄지도록 설정
  - **transition-timing-function / 전환효과의 타이밍(easing)함수를 지정한다.**
    - transition-timing-function : ease / (기본값)
    - transition-timing-function : linear / cubic-bezier(0, 0, 1, 1)
    - transition-timing-function : ease-in / cubic-bezier(0.42, 0, 1, 1)
    - transition-timing-function : ease-out / cubic-bezier(0, 0, 0.58, 1)
    - transition-timing-function : ease-in-out / cubic-bezier(0.42, 0, 0.58, 1)
    - transition-timing-function : cubic-bezier(n, n, n, n)
    - easing funtion 검색하면 다양한 정보 나온다.
  - **transition-delay / 전환효과가 몇 초뒤에 시작할지에 대한 대기 시간을 지정한다.**
    - transition-delay : 0s / (기본값) 대기시간 없음
    - transition-delay : (n)s / n초 동안 대기함.

```css
div {
  width : 100px;
  height : 100px;
  background-color : orange;
  /* transition property 에 width 가 들어가 있으므로 배경색상 변경에는 전환효과가 안들어간다. */
  transition : width 1s;
  /* 여러개의 단축속성을 지정하는 방식 */
  transition :
    width 1s,
    background-color 2s;
  /* 시간 정보 두개를 넣으면 duration(아래 예시 : 1s) , delay(아래 예시 : 0.5s) 순으로 들어간다.*/
  transition : 1s 0.5s;
} 

div:active {
  background-color : royalblue;
  width : 300px;
}
```