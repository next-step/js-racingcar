import { isLessThanNthCharacters } from '../util/isLessThanNthCharacters';

export class Car {
  #name;
  #position = 0;
  #movementStrategy;

  constructor(name, movementStrategy) {
    this.#name = name;
    this.#movementStrategy = movementStrategy;
  }

  move() {
    if(this.#movementStrategy) {
      this.#position += 1;
    }
  }

  validateCarName() {
    if (!this.#name || !this.#name.every(isLessThanNthCharacters))
    throw new Error(errorMessages.INVALID_CAR_NAMES);

    return this.#name;
  }

  get carPosition() {
    return this.#position;
  }

  get carName() {
    return this.#name;
  }
}