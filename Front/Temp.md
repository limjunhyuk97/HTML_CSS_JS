# 임시정리

## 요소 중앙정렬

### 1. flex 사용

- display : flex;
- justify-content : space-evenly;
  - (flex 설정 내부 요소들 사이의 공간을 일정하게 정렬, justify 는 메인축 방향으로 정렬)
- align-items : center;
  - (flex 설정 내부 요소들을 수직상에서 가운데 정렬, align 은 수직축 방향으로 정렬)

### 2. margin 사용

- width 속성에 대한 값이 있는 요소의 경우
- **margin 의 좌우 값을 auto 로 잡으면, block 내에서 중앙정렬 된다!**

### 3. 100vh

- 뷰포트 높이 100퍼센트
- 요소 가로는 자동적으로 뷰포트 너비만큼 늘어나게 됨

## padding 이 적용되지 않는 현상 해결 방법
