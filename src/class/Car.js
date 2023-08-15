export default class Car {
  #name;
  #distance;
  static ERROR_MESSAGES = Object.freeze({
    INVALID_EMPTY_NAME: "자동차 이름은 빈값일 수 없습니다.",
    INVALID_NAME_LENGTH: "자동차 이름은 5자를 넘길 수 없습니다.",
    INVALID_NAME_TYPE: "자동차 이름은 문자열이여야 합니다.",
  });
  static #CAR_NAME_MAX_LENGTH = 5;
  static #CAR_NAME_MIN_LENGTH = 1;
  #validateCarName = (name) => {
    if (typeof name !== "string") {
      throw new Error(Car.ERROR_MESSAGES.INVALID_NAME_TYPE);
    }

    if (name.trim().length < Car.#CAR_NAME_MIN_LENGTH) {
      throw new Error(Car.ERROR_MESSAGES.INVALID_EMPTY_NAME);
    }

    if (name.length > Car.#CAR_NAME_MAX_LENGTH) {
      throw new Error(Car.ERROR_MESSAGES.INVALID_NAME_LENGTH);
    }
  };

  constructor(name) {
    this.#validateCarName(name);

    this.#name = name;
    this.#distance = 0;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#distance;
  }

  advance() {
    this.#distance += 1;
  }
}
