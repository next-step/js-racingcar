import { MAX_CAR_NAME_LENGTH } from "../constants/car.js";

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
    if (name.length > MAX_CAR_NAME_LENGTH) {
      throw new Error("이름은 5자 이하여야 합니다.");
    }
    this.#name = name;
    this.#moveCondition = moveCondition;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  static isValidName(name) {
    return name.length <= MAX_CAR_NAME_LENGTH;
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
