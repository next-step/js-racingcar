class Car {
  name = 'sadfs';

  location = 0;

  constructor(name) {
    // console.log(adsf, "adsf");
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
