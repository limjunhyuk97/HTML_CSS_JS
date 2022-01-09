# 정렬(flex)

- 1차원 레이아웃. 수직축, 수평축을 바탕으로 하는 정렬을 진행한다.
- **flex container** : display 속성에 flex 값을 지정한 요소
  - display
  - flex-flow, flex-direction, flex-wrap
  - justify-content
  - align-items
  - align-content
- **flex items** : flex container 요소의 자식 요소들
  - order
  - flex, flex-grow, flex-shrink, flex-basis
  - align-self

## 목차

### [1.Container / display](#display)

### [2.Container / flex-direction](#flex-direction)

### [3.Container / flex-wrap](#flex-wrap)

### [4.Container / justify-content](#justify-content)

### [5.Container / align-content](#align-content)

### [6.Container / align-items](#align-items)

### [7.Item / order](#order)

### [8.Item / flex-grow](#flex-grow)

### [9.Item / flex-shrink](#flex-shrink)

### [10.Item / flex-basis](#flex-basis)


## Flex Container

### display

- **flex container 지정 및, 요소의 화면 보여짐 특성을 결정**한다.
  - display : flex; / flex conatiner(block 요소)로 현재 요소를 지정한다.
  - display : inline-flex; / flex container로 지정한 현재 요소를 (inline 요소)로 지정한다.

### flex-direction

- flex container로 지정된 요소 내부의 **주 축을 지정**할 수 있다.
  - flex-direction : row; / (기본값) 수평정렬, 좌 -> 우
  - flex-direction : row-reverse; / 수평정렬, 우 -> 좌
  - flex-direction : column; / 수직정렬, 위 -> 아래
  - flex-direction : column-reverse; / 수직정렬, 아래 -> 위

- **주 축이 지정**되면, **교차 축 또한 수직방향으로 지정**된다.

### flex-wrap

- flex container **내부의 flex item들의 줄바꿈 여부** 설정
  - flex-wrap : nowrap / (기본값) 줄 바꿈 없음 = 묶음 없음
    - 원래의 width, height로 그냥 넣었을 때 넘친다면, 찌그러져서 들어간다.
  - flex-wrap : wrap / 여러 줄로 묶음 = 묶음 있음
    - 원래의 width, height를 유지하면서 줄 바꿔가면서 넣는다.
  - flex-wrap : wrap-reverse / wrap의 반대방향으로 묶음

### justify-content

- flex container **내부 item들의 주축 상에서의 정렬 방법을 결정**한다.
  - justify-content : flex-start / (기본값) 정렬 시작점 쪽으로 정렬 = 좌 또는 우측 정렬
  - justify-content : flex-end / 정렬 끝점 쪽으로 정렬 = 우 또는 좌측 정렬
  - justify-content : center / 중앙 정렬
  - justify-content : space-between
  - justify-content : space-around
  - justify-content : space-evenly

### align-content

- flex container **교차축 상 여러 줄들에 대한 정렬 방법을 결정**한다.
  - align-content : stretch / (기본값)
    - item의 height가 존재하지 않는다면 한 줄 안에서 최대한 늘어나게끔 맞춘다.
    - item의 height가 존재한다면 한 줄 안에서 교차축 시작점 쪽으로 정렬한다.
  - align-content : flex-start / 교차축 시작점 쪽으로 정렬한다.
  - align-content : flex-end / 교차축 끝점 쪽으로 정렬한다.
  - align-content : center / 교차축 중간으로 정렬한다.
  - align-content : space-between
  - align-content : space-around
  - align-content : space-evenly

  <p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148339054-ae0f9bca-9e29-4639-b3e0-50bbcf86b8e6.png" width = 70% height=55%></p>

  - flex-wrap : wrap 으로 아이템이 두줄 이상일 때 적용된다.
  - 정렬 가능한 여백이 있을 때에만 정상적으로 작동한다.

### align-items

- flex-container **교차축 상 한 줄에 대한 정렬 방법을 결정**한다.
  - align-items : stretch / (기본값) 한줄짜리 flex item을 교차축 기준으로 늘린다.
  - align-items : flex-start / 한줄짜리 flex item을 교차축 시작점 쪽으로 정렬
  - align-items : flex-end / 한줄짜리 flex item을 교차축 끝점으로 정렬
  - align-items : center / 한줄짜리 flex-item을 교차축 가운데로 정렬

## Flex Item

### order

- **정렬 순서를 결정**한다. 숫자가 작을 수록 앞쪽에 정렬된다.
- html 구조를 바꾸지 않더라도, 화면에 출력되는 순서를 바꿀 수 있다는 장점이 있다.
  - order : 0 / (기본값) 순서 없음
  - order : n(수) / 수를 부여하는데, 작을 수록 먼저 배치된다.

### flex-grow

- **flex item의 증가 너비 비율**을 결정한다.
  - flex-grow : 0 / (기본값) 증가비율 없다. 즉, 원래 width, height 사이즈 그대로 가져간다.
  - flex-grow : n(수) / n만큼의 증가비율을 가져간다. 증가비율이 없는 아이템을 제외한 나머지 공간에서 n 비율만큼 가져간다.

  <p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148342455-46201400-6201-4433-9539-1278cc4feb29.png" width = 70% height=55%></p>

### flex-shrink

- **flex item의 감소 너비 비율**을 결정한다.
  - flex-shrink : 1 / (기본값) flex-container 너비에 따라서 감소 비율을 적용한다.
  - flex-shirnk : 0 / shrink를 사용하지 않는다.
  - flex-shrink : n(수) / n만큼의 감소비율을 가져간다.

- 공간이 모자르는 경우 flex-shrink 설정 통해서 item들 너비가 줄어드는 것이다.

### flex-basis

- flex item의 **공간 배분 전 기본 너비**
  - flex-basis : auto / (기본값) 요소가 갖고있는 내용의 너비
  - flex-basis : n px,em,rem / px, em, rem 을 통해서 기본 너비를 지정할 수 있다.

- **기본 너비**라는 것은, flex-grow, flex-shrink를 사용하여 공간 배분 이전에 content가 들어가는 공간을 말함 

- **(예1)**

  <p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148354221-9f13a376-5974-42e4-afdf-5d2c39e45021.png" width = 70% height=55%></p>

- **(예2) 요소 전체 너비 1:1:2로 맞추기**

  <p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148354489-b7fc68e4-468c-4c54-8782-350111263668.png" width = 70% height=55%></p>

- **(예3) flex-basis 존재 + 1:1:2 비율 맞추기**

  <p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148354719-9b93a0e3-4449-4361-8d62-6110f30ebb2c.png" width = 70% height=55%></p>