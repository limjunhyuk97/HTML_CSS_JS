# 임시정리

## 요소 중앙정렬
 
### 1. 요소의 정렬 (중앙 정렬)

- display : flex;
- justify-content : center;
  - (flex 설정 내부 요소로 한 요소만 존재할 때, 중앙에 위치시킨다.)
- align-items : center;
  - (flex 설정 내부 요소들을 수직상에서 가운데 정렬, align 은 수직축 방향으로 정렬)

### 2. 요소의 배치 (중앙 배치)

#### 2.1 width / margin

- width 에 대한 값을 잡는다. (특정 사이즈를 갖는 이미지의 경우 , width 잡으면 height도 비율에 맞춰서 잡힌다.)
- 좌,우 margin 값을 auto로 부여한다.

#### 2.2 width / position / left, right / margin

- width 에 대한 값을 잡는다.
- 위치상 부모요소를 기준으로 잡는다. (position : absolute)
- left, right 를 0으로 잡는다. (left : 0; right : 0;)
- margin 을 브라우저가 알아서 계산하도록 auto 로 잡는다. (margin : auto)

#### 2.3 height / position / top, bottom / margin

- height 에 대한 값을 잡는다.
- 위치상 부모요소를 기준으로 잡는다. (position : absolute)
- top, bottom 을 0으로 잡는다. (top : 0; bottom : 0;)
- margin 을 브라우저가 알아서 계산하도록 auto 로 잡는다. (margin : auto)

### 4. 100vh

- 뷰포트 높이 100퍼센트
- 요소 가로는 자동적으로 뷰포트 너비만큼 늘어나게 됨

## padding 이 적용되지 않는 현상 해결 방법
