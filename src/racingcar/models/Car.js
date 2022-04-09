import { GO_FLAG_NUMBER } from '../constatns';

export default class Car {
  #name;
  #moved;

  constructor(name) {
    this.#name = name;
    this.#moved = 0;
  }

  get moved() {
    return this.#moved;
  }

  get name() {
    return this.#name;
  }

  move(playRandomNumber) {
    if (playRandomNumber >= GO_FLAG_NUMBER) this.#moved++;
  }
}
