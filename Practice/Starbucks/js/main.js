// .search class 안에서 input 요소 찾기.
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

console.log(searchEl);

// searhEl을 click하면, searchInputEl(input)에서 focus가 일어나게 한다.
searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});

// searchInputEl(input)에서 focus가 일어나면,
// - searchEl에 classList로 'focused' class 를 추가. 
// - searchInputEl에 html 속성을 setAttribute(속성이름, 속성 값)로 추가한다.
searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

// searchInputEl(input)에서 focus가 일어나면,
// - searchEl에 classList로 'focused' class 를 제거. 
// - searchInputEl에 html 속성을 setAttribute(속성이름, 속성 값)로 추가한다.
searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector("header .badges");

addEventListener('scroll', _.throttle(()=> {
  // scrollY : Y축으로 몇 pixel 지점에 있는 지 확인 가능
  console.log(window.scrollY);
  if(window.scrollY > 500) {
    // gsap.to(요소, 지속시간, 옵션);
    // 눈으로 볼때만 사라진 것이므로 실제로 클릭도 안되게 사라지게 해야함
    gsap.to(badgeEl, 0.6, {
      opacity : 0,
      // gsap 내에서 문자열 값은 따옴표로 처리해야함.
      display : 'none'
    })
  }
  else{
    gsap.to(badgeEl, 0.6, {
      opacity : 1,
      display : 'block'
    })
  }
}, 300));


// 메인의 그림들이 순차적으로 나타나게(fade-in) 하기 위해 사용하는 수단
const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach((el, idx) => {
  gsap.to(el, 1, {
    delay : (idx+1) * 0.7,
    opacity : 1
  })
});


// swiper를 이용하여 동적인 메뉴 움직임 생성 : new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  slidesPerView : 1,
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
})