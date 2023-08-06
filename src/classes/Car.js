import { CAR_CONFIGURE, ERROR_MESSAGE } from '../constants/index';
import { isString, isMinimumLength, isMaximumLength } from '../utils/index';

export default class Car {
  #name = null;
  #moved = 0;
  #moveCondition = CAR_CONFIGURE.MOVE_CONDITION;

  constructor(name) {
    this.#validateCarNameType(name);
    this.#validateCarName(name);

    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get moved() {
    return this.#moved;
  }

  #validateCarName(carName) {
    const { NAME_MIN_LENGTH: min, NAME_MAX_LENGTH: max } = CAR_CONFIGURE;
    if (!isMinimumLength(carName.trim(), min)) {
      throw new Error(ERROR_MESSAGE.NOT_RECEIVED_CAR_NAME);
    }

    if (!isMaximumLength(carName.trim(), max)) {
      throw new Error(ERROR_MESSAGE.CAR_NAME_INCORRECT_LENGTH);
    }
  }

  #validateCarNameType(carName) {
    if (!isString(carName)) {
      throw new Error(ERROR_MESSAGE.CAR_NAME_NOT_STRING);
    }
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

  move(distance) {
    return this.#isMovable(distance) ? this.#moveForward() : this.#moveStop();
  }
}
