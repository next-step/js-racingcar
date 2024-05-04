import { CAR, ERROR_MESSAGE } from "../constant/index.js";

export default class Car {
  name;
  position;

  constructor(name) {
    this.#validateName(name);
    this.name = name;
    this.position = 0;
  }

  moveForward() {
    this.position++;
  }

  #validateNameLength(name) {
    if (name.length > CAR.MAX_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.CAR_NAME_LENGTH);
    }
  }

  #validateNameRequired(name) {
    if (name === "") {
      throw new Error(ERROR_MESSAGE.CAR_NAME_REQUIRED);
    }
  }

  #validateName(name) {
    this.#validateNameRequired(name);
    this.#validateNameLength(name);
  }

  get name() {
    return this.name;
  }
}
