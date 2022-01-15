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