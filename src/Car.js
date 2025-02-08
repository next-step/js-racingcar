class Car {
  name;
  location = 0;

  constructor(name) {
    this.name = name;
  }

  moveForward() {
    this.location += 1;
  }
}

export default Car;
