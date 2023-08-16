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

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move(condition) {
    if (condition >= FORWARD_CONDITION) {
      this.#position += MOVE_UNIT;
    }
  }

  getStatus() {
    return `${this.#name} : ${FORWARD_INDICATOR.repeat(this.#position)}`;
  }
}
