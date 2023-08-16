import { DEFAULT_POSITION, MOVE_UNIT, FORWARD_INDICATOR } from "./contants/car";

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

  moveForward() {
    this.#position += MOVE_UNIT;
  }

  getStatus() {
    return `${this.#name} : ${FORWARD_INDICATOR.repeat(this.#position)}`;
  }
}
