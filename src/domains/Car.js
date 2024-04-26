import { CAR } from "../constants/car";

export class Car {
  #name;
  #position;
  constructor(name) {
    this.#name = name;
    this.#position = CAR.DEFAULT_POSITION;
  }

  move() {
    this.#position += CAR.MOVE_UNIT;
  }
  get name() {
    return this.#name;
  }
  get position() {
    return this.#position;
  }
}
