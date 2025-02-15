class Car {
  static INITIAL_LOCATION = 0;
  static FORWARD_STEP = 1;
  static NAME_MAX_LENGTH = 5;
  static NAME_MAX_LENGTH_ERROR_MESSAGE = `자동차의 이름은 1자 이상 ${Car.NAME_MAX_LENGTH}자 이하로 입력해 주세요.`;

  #name;
  #location = Car.INITIAL_LOCATION;

  static validateName(name) {
    const isValid = name.length > 0 && name.length <= Car.NAME_MAX_LENGTH;

    if (!isValid) throw new Error(Car.NAME_MAX_LENGTH_ERROR_MESSAGE);
  }

  constructor(name) {
    const trimmedName = name.trim();
    Car.validateName(name.trim());

    this.#name = trimmedName;
  }

  forward(condition) {
    const isCanForward = condition ? condition() : true;

    if (isCanForward) {
      this.#location += Car.FORWARD_STEP;
    }

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
