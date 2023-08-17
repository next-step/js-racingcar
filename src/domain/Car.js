import {
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_MIN_LENGTH,
  DEFAULT_CAR_CONFIG,
} from "../constants";
import { CarNameError } from "../errors";
import { isString } from "../utils";

export class Car {
  #name;
  #position = DEFAULT_CAR_CONFIG.INIT_POSITION;
  #speed = DEFAULT_CAR_CONFIG.CAR_SPEED;
  #moveThreshold = DEFAULT_CAR_CONFIG.MOVE_THRESHOLD;

  constructor(name) {
    Car.validateName(name);
    this.#name = name;
  }

  static validateName(name) {
    if (!isString(name)) {
      throw new CarNameError("The name is not a string");
    }

    if (name.length < CAR_NAME_MIN_LENGTH) {
      throw new CarNameError("The name is too short");
    }

    if (name.length > CAR_NAME_MAX_LENGTH) {
      throw new CarNameError("The name is too long");
    }
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  get speed() {
    return this.#speed;
  }

  move(number) {
    if (number >= this.#moveThreshold) {
      this.#position += this.#speed;
    }
  }
}
