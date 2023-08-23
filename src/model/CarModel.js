import { CONDITIONS, ERROR_MESSAGES } from "../constants/constants.js";

export default class CarModel {
  #name = "";

  #movement = 0;

  constructor(name) {
    this.name = name;
  }

  go(number) {
    if (CONDITIONS.CAR_MOVE_THRESHOLD <= number) {
      this.#movement += 1;
    }
  }

  getInfo() {
    return { name: this.#name, movement: this.#movement };
  }

  get name() {
    return this.#name;
  }

  set name(aName) {
    const name = aName.trim();
    CarModel.#validateName(name);
    this.#name = name;
  }

  get movement() {
    return this.#movement;
  }

  static #validateName(name) {
    if (name.length > CONDITIONS.MAX_CAR_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGES.OVER_MAXIMUM_CAR_NAME_LENGTH);
    }

    if (!name) {
      throw new Error(ERROR_MESSAGES.WHITE_CAR_NAME);
    }
  }
}
