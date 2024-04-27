import { ERROR_CODES } from "../constants";

export class Car {
  static MOVE_FORWARD_CAR = 4;
  static CAR_NAME_MAX_LEN = 5;

  #name = "";
  #position = 0;

  constructor(name) {
    this.#validateName(name);
    this.#name = name;
    this.#position = 0;
  }

  #validateName(name) {
    if (!name.length) {
      throw new Error(ERROR_CODES.ERROR_EMPTY_CAR_NAME);
    }

    if (name.length > Car.CAR_NAME_MAX_LEN) {
      throw new Error(ERROR_CODES.ERROR_LONG_CAR_NAME);
    }
  }

  move(condition) {
    if (condition >= Car.MOVE_FORWARD_CAR) {
      this.#position += 1;
    }
  }

  getPosition() {
    return this.#position;
  }

  getName() {
    return this.#name;
  }
}
