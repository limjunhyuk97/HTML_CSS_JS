const arr = [1 , 2 , 3 ,4,  5];

function check(num) {
  arr.forEach(el => {
    if(el === num) return true;
  });
  return false;
}

console.log(check(4));