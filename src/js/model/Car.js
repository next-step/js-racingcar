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

  forwardStep(condition) {
    if (condition >= CAR_RACE.FORWARD) {
      this.#step = this.#step + 1;
    }
  }
}
