import { MAX_CAR_NAME_LENGTH } from "../constants/car.js";
import { ERROR_CAR_NAME_TOO_LONG } from "../constants/error.js";

class Car {
  #name;
  #position = 0;
  #moveCondition;

  constructor(
    name,
    moveCondition = () => {
      return true;
    }
  ) {
    Car.validateName(name);

    this.#name = name;
    this.#moveCondition = moveCondition;
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
    const canMove = this.#moveCondition();
    if (canMove) {
      this.#position++;
    }
  }

  positionToString() {
    return "-".repeat(this.#position);
  }

  statusToString() {
    return `${this.#name} : ${this.positionToString()}`;
  }
}

export default Car;
