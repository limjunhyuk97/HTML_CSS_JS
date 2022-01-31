// DP(Top-Down) + Fibo 찍기
var arr = [1, 1, ];
var cnt = 0;

// 배열에 0, 1 인덱스 공간만 있을 때 -> 8 인덱스 공간에 접근한다치면 undefined로 찍힌다.
function fibo(n) {
  cnt += 1;
  if(n === 1 || n === 0) return 1;
  arr[n-1] = (arr[n-1] ? arr[n-1] : fibo(n-1));
  arr[n-2] = (arr[n-2] ? arr[n-2] : fibo(n-2));
  return arr[n-1] + arr[n-2];
}

for(let i=10; i>0; --i){
  cnt = 0;
  console.log(`i번째 : ${fibo(i)}, cnt : ${cnt}`);
  console.log(arr);
}
