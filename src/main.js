class Car {
  static INITIAL_LOCATION = 0;
  static FORWARD_STEP = 1;

  name;
  location = Car.INITIAL_LOCATION;

  constructor(name) {
    this.name = name;
  }

  forward() {
    this.location += Car.FORWARD_STEP;
    return this.location;
  }
}
