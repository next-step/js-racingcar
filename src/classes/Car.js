import { CAR_CONFIGURE } from '../constants/index';
import { validateCarName, validateCarNameType } from '../race/index';

export default class Car {
  #name = null;
  #moved = 0;
  #moveCondition = CAR_CONFIGURE.MOVE_CONDITION;

  constructor(name) {
    this.#validateCarName(name);
    this.#name = name;
  }

  #validateCarName(carName) {
    const { NAME_MIN_LENGTH: min, NAME_MAX_LENGTH: max } = CAR_CONFIGURE;
    validateCarName(carName, { min, max });
    validateCarNameType(carName);
  }

  #moveForward() {
    this.#moved += 1;
  }

  #moveStop() {
    this.#moved += 0;
  }

  #isMovable(distance) {
    return distance >= this.#moveCondition;
  }

  get name() {
    return this.#name;
  }

  get moved() {
    return this.#moved;
  }

  move(distance) {
    return this.#isMovable(distance) ? this.#moveForward() : this.#moveStop();
  }
}
