const boxEl = document.querySelector('.box');

console.log(boxEl.classList);

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

