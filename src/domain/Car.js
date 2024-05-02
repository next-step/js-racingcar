import { MAX_CAR_NAME_LENGTH } from "../constants/car.js";
import { ERROR_CAR_NAME_TOO_LONG } from "../constants/error.js";

class Car {
  #name;
  #position = 0;

  constructor(name) {
    Car.validateName(name);

    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  static validateName(name) {
    if (name.length > MAX_CAR_NAME_LENGTH) {
      throw new Error(ERROR_CAR_NAME_TOO_LONG);
    }
  }

  move() {
    this.#position++;
  }
}

export default Car;
