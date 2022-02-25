const str = `limjunhyuk97@gmail.com`

// 앞쪽 일치 : limjunhyuk97
console.log(
  str.match(/.{1,}(?=@)/g)
);

// 뒤쪽 일치 : gmail.com
console.log(
  str.match(/(?<=@).{1,}/g)
);
