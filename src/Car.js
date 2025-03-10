class Car {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  move() {
    this.position += 1;
  }
}

console.log(new Car('racing car'));
console.log(new Car('racing car').position);

export default Car;
