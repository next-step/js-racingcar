import { INITIAL_POSITION, MOVE_DISTANCE } from "./car.constant.js";
import { validateCarName, validateCarPosition } from "./car.contract.js";

export class Car {
  #name;
  #position;

  constructor({ name, position = INITIAL_POSITION }) {
    validateCarName(name);
    validateCarPosition(position);

    this.#name = name;
    this.#position = position;
  }

  move() {
    this.#position += MOVE_DISTANCE;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }
}
