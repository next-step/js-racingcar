import { DEFAULT_POSITION, MOVE_UNIT } from "./contants/car";

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
}
