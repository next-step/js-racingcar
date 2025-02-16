class InvalidCarNameException extends Error {
  constructor(minLength, maxLength) {
    const message = `자동차의 이름은 ${minLength}자 이상 ${maxLength}자 이하로 입력해 주세요.`;
    super(message);
  }
}

class Car {
  static INITIAL_LOCATION = 0;
  static FORWARD_STEP = 1;

  static NAME_MIN_LENGTH = 1;
  static NAME_MAX_LENGTH = 5;

  #name;
  #location = Car.INITIAL_LOCATION;

  static validateName(name) {
    const validName =
      name.length >= Car.NAME_MIN_LENGTH && name.length <= Car.NAME_MAX_LENGTH;

    if (!validName)
      throw new InvalidCarNameException(
        Car.NAME_MIN_LENGTH,
        Car.NAME_MAX_LENGTH
      );
  }

  constructor(name) {
    const trimmedName = name.trim();
    Car.validateName(name.trim());

    this.#name = trimmedName;
  }

  forward(condition) {
    const canForward = condition?.() ?? true;

    if (canForward) {
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
