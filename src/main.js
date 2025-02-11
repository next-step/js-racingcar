class Car {
  constructor(name) {
    this.name = name;
  }

  position = 0;

  move() {
    this.position++;
  }

  getStatus() {
    return `${this.name} : ${"-".repeat(this.position)}`;
  }
}

export default Car;

const car = new Car("boky");

car.move();
console.log(car.getStatus());

car.move();
console.log(car.getStatus());
