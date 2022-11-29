import { CAR_RACE } from '../constant.js';

export class Car {
  #name = null;
  step = 0;
  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  forwardStep(condition) {
    if (condition >= CAR_RACE.FORWARD) {
      this.step += 1;
    }
  }
}
