import { ERROR_CODES } from "../constants";
import { CarError } from "./errors";

export class Car {
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
      throw new CarError(ERROR_CODES.ERROR_EMPTY_CAR_NAME);
    }

    if (name.length > Car.CAR_NAME_MAX_LEN) {
      throw new CarError(ERROR_CODES.ERROR_LONG_CAR_NAME);
    }
  }

  move(shouldMove) {
    if (shouldMove()) {
      this.moveForward();
    }
  }

  moveForward() {
    this.#position += 1;
  }

  get position() {
    return this.#position;
  }

  get name() {
    return this.#name;
  }
}
