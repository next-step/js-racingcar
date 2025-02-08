import { MIN_CAR_NAME_LENGTH, MAX_CAR_NAME_LENGTH } from "./constants.js";

class Validator {
  static #isValidCarName(carName) {
    if (
      carName.length >= MIN_CAR_NAME_LENGTH &&
      carName.length <= MAX_CAR_NAME_LENGTH
    ) {
      return true;
    }
    throw new Error(`자동차의 이름은 최소 1자, 최대 5자이다.`);
  }
  static validateCarName(carNames) {
    carNames.forEach((name) => this.#isValidCarName(name));
    if (new Set([...carNames]).size !== carNames.length) {
      throw new Error(`자동차의 이름은 중복되지 않아야 한다.`);
    }
  }
}

export default Validator;
