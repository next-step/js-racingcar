class Car {
  static INITIAL_LOCATION = 0;
  static FORWARD_STEP = 1;
  static NAME_MAX_LENGTH = 5;

  static #FORWARD_MIN_VALUE = 4;
  static #FORWARD_MIN_RANGE = 0;
  static #FORWARD_MAX_RANGE = 9;

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

  static getRandomNumber() {
    // Math.random()은 0에서 1사이의 숫자를 반환한다. 원하는 범위를 얻기 위해 최소값을 더해 범위를 이동시킨다.
    return (
      Math.random() * (Car.#FORWARD_MAX_RANGE - Car.#FORWARD_MIN_RANGE) +
      Car.#FORWARD_MIN_RANGE
    );
  }

  /** #FORWARD_MAX_RANGE와 #FORWARD_MIN_RANGE 중 숫자를 랜덤으로 골라, 해당 숫자가 FORWARD_MIN_VALUE 보다 큰지 검사한다. */
  static forwardCondition() {
    const randomNumber = Car.getRandomNumber();
    return randomNumber >= Car.#FORWARD_MIN_VALUE;
  }

  forward(condition) {
    const isCanForward = condition ? condition() : Car.forwardCondition();

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
