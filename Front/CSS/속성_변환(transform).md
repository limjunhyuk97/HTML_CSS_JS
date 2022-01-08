# 변환 (Transform)


## transform 

- 요소에 변환효과를 부여한다.
  - transform : 변환함수1 변환함수2 변환함수3 ... ;
  - transform : 원근법 이동 크기 회전 기울임;

- **변환함수**
  - **2D 변환함수**
    - translate(x, y) / x축에서 x, y축에서 y 만큼 이동 (px)
    - translateX(x) / x축에서 x 만큼 이동 (px)
    - translateY(y) / y축에서 y 만큼 이동 (px)
    - scale(x, y) / x축 기준 x배, y축 기준 y배 만큼 크기 변화 (1기준)
    - scale(n) / n 배 만큼 크기변화. x, y 모두에 적용 (1기준)
    - scaleX(n) / x축 기준 x배 변화 (1기준)
    - scaleY(n) / y축 기준 y배 변화 (1기준)
    - rotate((n)deg) / n도 만큼 회전시킨다. (deg)
    - skewX(x) / x축 기준으로 기울인다. (deg)
    - skewY(y) / y축 기준으로 기울인다. (deg)
  - **3D 변환함수**
    - rotateX(x) / x축 기준으로 회전 (deg)
    - rotateY(y) / y축 기준으로 회전 (deg)
    - perspective(n) / n 거리만큼의 원근법 적용

- **(예) perspective + rotate**

```css
.container .item {
  width : 100px;
  height : 100px;
  background-color : orange;
  /* perspective 의 원근법 함수를 먼저 적용해야 한다. */
  transform : perspective(200px) rotateX(45deg);
}
```

<p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148361474-42b7b0d0-b05a-4a37-84ea-638374b1492c.png" width = 50% height=35%></p>

- **(예) perspective + rotate + translateX**

```css
.container .item {
  width : 100px;
  height : 100px;
  background-color : orange;
  transform : perspective(200px) rotateX(45deg) translateX(50px);
}
```

<p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148361909-653a79e2-5278-4f2c-88c2-b827c8d128dd.png" width = 50% height=35%></p>


## perspective 

- 하위요소를 관찰하는 원근거리를 지정한다.
  - perspective : n (px, rem, em ..) / px, em, rem 등의 단위로 수치를 지정한다.

- transfrom 속성에 부여하기 위한 함수와는 다르다!

 |속성/함수|적용 대상|기준점 설정|
 |:---:|:---:|:---:|
 |perspective : 600px|관찰 대상의 부모 기준으로 적용|perspective-origin|
 |transform:perspective(600px)|관찰 대상 기준으로 적용|transform-origin|

 <p align="center"><img src= "https://user-images.githubusercontent.com/59442344/148362642-288d636b-5359-49e9-8ef2-4db79a7bc122.png" width = 70% height=55%></p>


## backface-visibility

- 3D 변환으로 회전된 요소의 뒷면 숨김 여부
  - backface-visibility : visible / (기본값) 뒷면을 보여줌
  - backface-visibility : hidden / 뒷면을 보여주지 않음
    - 요소가 뒤집어졌을 때 화면에서 보이지 않게 된다.