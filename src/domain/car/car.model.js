import { INITIAL_POSITION, MOVE_DISTANCE } from "./car.constant.js";
import { validateCarName, validateCarPosition } from "./car.contract.js";

class Car {
  #name;
  #position;

  constructor({ name, position = INITIAL_POSITION }) {
    this.#name = validateCarName(name);
    this.#position = validateCarPosition(position);
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

export default Car;
