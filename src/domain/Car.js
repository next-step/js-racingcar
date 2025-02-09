class Car {
  static INITIAL_LOCATION = 0;
  static FORWARD_STEP = 1;
  static NAME_MAX_LENGTH = 5;

  #name;
  #location = Car.INITIAL_LOCATION;

  constructor(name) {
    const trimmedName = name.trim();

    const isValidName = Car.validateName(trimmedName);

    if (!isValidName)
      throw new Error(
        `자동차의 이름을 ${Car.NAME_MAX_LENGTH}로 입력해 주세요.`
      );

    this.#name = trimmedName;
  }

  static validateName(name) {
    if (name.length > Car.NAME_MAX_LENGTH) return false;
    return true;
  }

  forward() {
    this.#location += Car.FORWARD_STEP;
    return this.#location;
  }

  get name() {
    return this.#name;
  }

  get location() {
    return this.#location;
  }
}

export default Car;
