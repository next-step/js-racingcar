import { NAME_CONFIGURE } from '../constants/index';
import { validateCarName, validateCarNameType } from '../race/index';

export default class Car {
  #name = null;
  #moved = 0;

  constructor(name) {
    this.#validateCarName(name);
    this.#name = name;
  }

  #validateCarName(carName) {
    const { MIN_LENGTH: min, MAX_LENGTH: max } = NAME_CONFIGURE;
    validateCarName(carName, { min, max });
    validateCarNameType(carName);
  }

  #moveForward() {
    this.#moved += 1;
  }

  #moveStop() {
    this.#moved += 0;
  }

  get name() {
    return this.#name;
  }

  get moved() {
    return this.#moved;
  }

  move(movable) {
    return movable ? this.#moveForward() : this.#moveStop();
  }
}
