import { getRandomNumber } from '../utils/random.js';
export default class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  process() {
    this.go(getRandomNumber(0, 10));
  }

  go(value) {
    if (value >= 4) {
      this.#position++;
    }
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }
}
