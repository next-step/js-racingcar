import { ERROR_MESSAGES } from '../utils/constants.js';

class Car {
  #name;
  #location = 0;

  constructor(name) {
    if (!this.isValidName(name)) {
      throw new Error(ERROR_MESSAGES.INVALID_CAR_NAME);
    }
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getLocation() {
    return this.#location;
  }

  moveForward() {
    this.#location += 1;
  }

  isValidName(name) {
    return name.length >= 1 && name.length <= 5;
  }
}

export default Car;
