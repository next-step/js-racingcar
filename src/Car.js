import { validateCarName } from './utils/index';

export default class Car {
  #name;

  #movedTrack = 0;

  constructor(name) {
    this.#validateCarName(name);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#movedTrack;
  }

  #moveForward() {
    this.#movedTrack += 1;
  }

  #moveStop() {
    this.#movedTrack += 0;
  }

  move(movable) {
    return movable ? this.#moveForward() : this.#moveStop();
  }

  #validateCarName = validateCarName;
}
