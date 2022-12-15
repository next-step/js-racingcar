import { CAR_RACE } from '../constant.js';

export class Car {
  #name = null;
  #step = 0;
  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get step() {
    return this.#step;
  }

  forwardStep() {
    this.#step = this.#step + 1;
  }
}
