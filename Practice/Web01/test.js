const arr1 = ["a", "b", "c", "d"];
const arr2 = arr1.map((el, idx)=>({
  id : idx,
  val : el,
}));

console.log(arr2);
console.log(arr1.find(el =>{el=="e"}));