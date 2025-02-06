class Car {
  constructor(name) {
    this.name = name;
  }

  position = 0;

  move() {
    this.position += 1;
  }
}

export default Car;
