import { NAME_CONFIGURE, CAR_CONFIGURE } from '../constants/index';
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

  #isMovable(distance) {
    return distance >= this.#moveCondition;
  }

  getName() {
    return this.#name;
  }

  getMoved() {
    return this.#moved;
  }

  move(distance) {
    return this.#isMovable(distance) ? this.#moveForward() : this.#moveStop();
  }
}
