class Car {
  static INVALID_CAR_NAME = "잘못된 자동차 이름입니다.";
  #name;
  #location = 0;

  constructor(name) {
    if (!this.isValidName(name)) {
      throw new Error(Car.INVALID_CAR_NAME);
    }
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getLocation() {
    return this.#location;
  }

  moveForward() {
    this.#location += 1;
  }

  isValidName(name) {
    return name.length >= 1 && name.length <= 5;
  }
}

export default Car;
