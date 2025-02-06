class Car {
  constructor(name) {
    this.name = name;
    this.position = 1;
  }

  move() {
    this.position += 1;
  }

  getStatus() {
    const progress = "-".repeat(this.position);
    return `${this.name} : ${progress || "-"}`;
  }
}
const car = new Car("bokeeey");

console.log(car.getStatus());
car.move();
console.log(car.getStatus());
