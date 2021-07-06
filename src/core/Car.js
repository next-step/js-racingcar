import { getRandomNumber } from '../utils/utils.js';
import { GAME } from '../utils/constants.js';

export default class Car {
  #carName;
  #distance;

  constructor(carName) {
    this.#carName = carName;
    this.#distance = 0;
  }

  process() {
    if (getRandomNumber(GAME.MIN_COUNT, GAME.MAX_COUNT) < 4) return;
    this.move();
  }

  move() {
    this.#distance++;
  }

  get carName() {
    return this.#carName;
  }

  get distance() {
    return this.#distance;
  }
}
