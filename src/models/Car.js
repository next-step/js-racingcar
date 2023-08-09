import { INVALID_CAR_NAME_LENGTH } from "../constants/ErrorMessages";
import {
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_MIN_LENGTH,
  CAR_RUN_UNIT,
  CAR_START_POSITION,
} from "../constants/Numbers";

class Car {
  #name;
  #position = CAR_START_POSITION;

  constructor(name) {
    this.#validateName(name);
    this.#name = name;
  }

  #validateName(name) {
    if (!name) {
      throw new Error(INVALID_CAR_NAME_LENGTH);
    }

    if (
      name.length > CAR_NAME_MAX_LENGTH ||
      name.length < CAR_NAME_MIN_LENGTH
    ) {
      throw new Error(INVALID_CAR_NAME_LENGTH);
    }
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  move() {
    this.#position += CAR_RUN_UNIT;
  }
}

export default Car;
