import { ERROR_CODES } from "../constants";

export class Car {
  static CAR_NAME_MAX_LEN = 5;

  #name = "";
  #position = 0;
  #moveStrategy;

  constructor(name, moveStrategy) {
    this.#validateName(name);
    this.#name = name;
    this.#position = 0;
    this.#moveStrategy = moveStrategy;
  }

  #validateName(name) {
    if (!name.length) {
      throw new Error(ERROR_CODES.ERROR_EMPTY_CAR_NAME);
    }

    if (name.length > Car.CAR_NAME_MAX_LEN) {
      throw new Error(ERROR_CODES.ERROR_LONG_CAR_NAME);
    }
  }

  move() {
    if (this.#moveStrategy) {
      this.#moveStrategy.move(this);
    }
  }

  moveForward() {
    this.#position += 1;
  }

  getPosition() {
    return this.#position;
  }

  getName() {
    return this.#name;
  }
}
