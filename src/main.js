class Car {
  INITIAL_LOCATION = 0;
  FORWARD_STEP = 1;

  constructor(name) {
    this.name = name;
    this.location = INITIAL_LOCATION;
  }

  forward() {
    this.location += FORWARD_STEP;
    return this.location;
  }
}
