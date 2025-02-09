class Car {
  name;
  position = 0;

  static NAME_MIN_LENGTH = 1;
  static NAME_MAX_LENGTH = 5;
  static VALIDATION_ERROR_MESSAGE = `자동차 이름은 ${Car.NAME_MIN_LENGTH}자 이상, ${Car.NAME_MAX_LENGTH}자 이하여야 합니다.`;

  constructor(name) {
    if (!this.#isValidName(name)) {
      throw new Error(Car.VALIDATION_ERROR_MESSAGE);
    }

    this.name = name;
  }

  moveForward() {
    this.position += 1;
  }

  #isValidName(name) {
    if (name.length < Car.NAME_MIN_LENGTH) return false;
    if (name.length > Car.NAME_MAX_LENGTH) return false;
    return true;
  }
}

export default Car;
