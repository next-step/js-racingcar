class Car {
  static INITIAL_LOCATION = 0;
  static FORWARD_STEP = 1;
  static NAME_MAX_LENGTH = 5;

  static #FORWARD_MIN_VALUE = 4;
  static #FORWARD_INPUT_MIN_VALUE = 0;
  static #FORWARD_INPUT_MAX_VALUE = 9;

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

  static validateForwardInput(forwardInput) {
    if (typeof forwardInput !== 'number' && !Number.isInteger(forwardInput))
      return false;

    if (
      forwardInput > Car.#FORWARD_INPUT_MAX_VALUE ||
      forwardInput < Car.#FORWARD_INPUT_MIN_VALUE
    )
      return false;

    return true;
  }

  static generateForwardCondition() {
    // Math.random()은 0에서 1사이의 숫자를 반환한다. 원하는 범위를 얻기 위해 최소값을 더해 범위를 이동시킨다.
    return (
      Math.random() *
        (Car.#FORWARD_INPUT_MAX_VALUE - Car.#FORWARD_INPUT_MIN_VALUE) +
      Car.#FORWARD_INPUT_MIN_VALUE
    );
  }

  forward(forwardInput) {
    const isValidInput = Car.validateForwardInput(forwardInput);
    const input = isValidInput ? forwardInput : Car.generateForwardCondition();

    if (input >= Car.#FORWARD_MIN_VALUE) {
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
