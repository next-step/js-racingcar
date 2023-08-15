import {
  DEFAULT_POSITION,
  MOVE_UNIT,
  FORWARD_CONDITION,
  FORWARD_INDICATOR,
} from "./contants/car";

export default class Car {
  #name;
  #position = DEFAULT_POSITION;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  move(condition) {
    if (condition >= FORWARD_CONDITION) {
      this.#position += MOVE_UNIT;
    }
  }

  getStatus() {
    return `${this.getName()} : ${FORWARD_INDICATOR.repeat(
      this.getPosition(),
    )}`;
  }
}
