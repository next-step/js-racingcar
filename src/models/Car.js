import { ERROR_MESSAGE } from "../constants/Messages";
import { CAR } from "../constants/Numbers";

class Car {
  #name;
  #position = CAR.START_POSITION;

  constructor(name) {
    this.validateName(name);
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  validateName(name) {
    if (!name) {
      throw new Error(ERROR_MESSAGE.INVALID_LENGTH);
    }

    if (
      name.length > CAR.NAME_MAX_LENGTH ||
      name.length < CAR.NAME_MIN_LENGTH
    ) {
      throw new Error(ERROR_MESSAGE.INVALID_LENGTH);
    }
  }

  move() {
    this.#position += CAR.RUN_UNIT;
  }
}

export default Car;
