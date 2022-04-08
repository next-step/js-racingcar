import { GO_FLAG_NUMBER, MAX_RANDOM_NUMBER } from '../constatns';

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

  move() {
    if (Car.#isGo()) this.#moved++;
  }

  static #isGo() {
    return Math.floor(Math.random() * MAX_RANDOM_NUMBER + 1) >= GO_FLAG_NUMBER
      ? true
      : false;
  }
}
