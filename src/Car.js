class Car {
  static INITIAL_POSITION = 0;
  static STEP_SIZE = 1;

  position = Car.INITIAL_POSITION;

  constructor({ name }) {
    this.name = name;
  }

  moveForward() {
    this.position += Car.STEP_SIZE;
  }
}

export default Car;
