import { ERROR_MESSAGE } from "./car.error.js";
import { validateCarName, validateCarPosition } from "./car.contract.js";
import { INITIAL_POSITION, MOVE_DISTANCE } from "./car.constant.js";

export class Car {
  #name;
  #position;

  constructor({ name, position = INITIAL_POSITION }) {
    validateCarName(name);
    validateCarPosition(position);

    this.#name = name;
    this.#position = position;
  }

  move(shouldMove) {
    if (typeof shouldMove !== "boolean")
      throw new TypeError(ERROR_MESSAGE.MOVE.INVALID_TYPE);

    if (shouldMove) this.#position += MOVE_DISTANCE;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }
}
