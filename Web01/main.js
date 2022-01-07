// const boxEl = document.querySelector('.box');
// console.log(boxEl.classList);

boxEl.addEventListener('click', function() {
  if(boxEl.classList.contains('active')) {
    boxEl.classList.remove('active');
    console.log(boxEl.classList);
  }
  else{
    boxEl.classList.add('active');
    console.log(boxEl.classList);
  }
  console.log('clicked!');
});

const boxEls = document.querySelectorAll('.box');

console.log(boxEls);

boxEls.forEach(function(boxEl, idx, boxEls){
  boxEl.classList.add(`order-${idx+1}`);
  console.log(idx, boxEl, boxEl.classList);
});

boxEls.forEach(function(boxEl){
  console.log(boxEl.textContent);
  boxEl.textContent = "Hello~!";
  console.log(boxEl.textContent);
})
