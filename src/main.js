class Car {
  name = "";
  location = 0;
  constructor(name) {
    this.name = name;
  }

  moveForward() {
    this.location += 1;
  }

  moveBackward() {
    this.location -= 1;
  }

  getLocation() {
    return this.location;
  }

  getName() {
    return this.name;
  }
}

export default Car;
