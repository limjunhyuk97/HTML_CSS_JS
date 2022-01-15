class Vehicle {
  constructor(name, wheel) {
    this.name = name;
    this.wheel = wheel;
  }
}

const myVehicle = new Vehicle("myCar", 2);

class Bicycle extends Vehicle {
  constructor(name, wheel) {
    super(name, wheel);
  }
}

const myBicycle1 = new Bicycle("myBicycle1", 2);
const myBicycle2 = new Bicycle("myBicycle2", 3);

console.log(myBicycle1);
console.log(myBicycle2);

class Car extends Vehicle {
  constructor(name, wheel, license) {
    super(name, wheel);
    this.license = license;
  }
}