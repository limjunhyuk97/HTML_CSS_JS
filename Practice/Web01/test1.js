var r1 = {
  name : 'zero',
  friends : ['nero', 'hero', 'xero'],
  logfriends : function() {
    const that = this;
    this.friends.forEach(function(element) {
      console.log(that.name, element);
    });
  }
}

r1.logfriends();

var r2 = {
  name : 'zero',
  friends : ['nero', 'hero', 'xero'],
  logfriends : function() {
    this.friends.forEach(element => {
      console.log(this.name, element);
    });
  }
}

r2.logfriends();

// ====================================== //
console.log();
// ====================================== //

const candymachine = {
  status : {
    name : 'node',
    count : 5
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  }
}

const other = {
  status : {
    count : 3
  }
}

const { getCandy, status : {count} } = candymachine;
console.log(getCandy.bind(other)());
console.log(getCandy, count);
console.log(count);

// ====================================== //
console.log();
// ====================================== //

class Human {
  constructor(type = 'human'){
    this.type = type;
  }
  static isHuman(human){
    return human instanceof Human;
  }
  breathe() {
    console.log("hahaha")
  }
}

class Zero extends Human {
  constructor(type, firstname, secondname){
    super(type);
    this.firstname = firstname;
    this.secondname = secondname;
  }
  sayName() {
    super.breathe();
    console.log(`My name is ${this.secondname} ${this.firstname}`);
  }
}

const jun = new Human();
console.log(Human.isHuman(jun));
jun.breathe();

const junhyukLim = new Zero("human", "jun hyuk", "Lim");
junhyukLim.sayName();

// ====================================== //
console.log();
// ====================================== //

const condition = false;
const promise = new Promise((resolve, reject) =>{
  if(condition){
    resolve("solved!")
  }
  else{
    reject("Shit!")
  }
});

promise.then(message=>{
  console.log(message)
})
.catch(error=>{
  console.log(error);
})
.finally(()=>{
  console.log("Done Finally..!")
});

// ====================================== //
console.log();
// ====================================== //

new Promise((resolve, reject)=>{
  if(!condition){
    resolve("성공")
  }
  else{
    reject("실패")
  }
}).then((message)=>{
  return new Promise((resolve, reject)=>{
    resolve(message)
  })
}).then(message=>{
  console.log(message)
  return new Promise((resolve, reject)=>{
    reject(message);
  })
}).catch(err=>{
  console.log(`${err}`);
})

// ====================================== //
console.log();
// ====================================== //

const promise1 = Promise.resolve("성공1");
const promise2 = Promise.resolve("성공2");
(async () => {
  for await (promise of [promise1, promise2]){
    promise.then(message=>console.log(message));
  }
});