import { validateCarName } from './utils/index';

export default class Car {
  #name = null;

  #moved = 0;

  constructor(name) {
    this.#validateCarName(name);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get moved() {
    return this.#moved;
  }

  #moveForward() {
    this.#moved += 1;
  }

  #moveStop() {
    this.#moved += 0;
  }

  move(movable) {
    return movable ? this.#moveForward() : this.#moveStop();
  }

  #validateCarName = validateCarName;
}
