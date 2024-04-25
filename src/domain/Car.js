import {
  ERROR_EMPTY_CAR_NAME,
  ERROR_LONG_CAR_NAME,
  MOVE_FORWARD_CAR,
} from "../constants";

export class Car {
  constructor(name) {
    if (!name.length) {
      throw new Error(ERROR_EMPTY_CAR_NAME);
    }
    if (name.length > 5) {
      throw new Error(ERROR_LONG_CAR_NAME);
    }
    this.name = name;
    this.position = 0;
  }

  move(condition) {
    if (condition >= MOVE_FORWARD_CAR) {
      this.position += 1;
    }
  }

  getPosition() {
    return this.position;
  }

  getName() {
    return this.name;
  }
}
