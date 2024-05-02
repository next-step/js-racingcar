import { CAR, ERROR_MESSAGE } from "../constant/index.js";

export default class Car {
  name;
  position;

  constructor(name) {
    if (name.length > CAR.MAX_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.CAR_NAME_LENGTH);
    }
    this.name = name;
    this.position = 0;
  }

  #moveForward() {
    this.position++;
  }

  move(randomNumber) {
    if (randomNumber >= CAR.MIN_MOVE_THRESHOLD) {
      this.#moveForward();
    }
  }

  get name() {
    return this.name;
  }
}
