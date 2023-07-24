import { RACING_GAME } from '../constants';

export class Car {
  #name;
  #distance;

  constructor(name) {
    this.#name = name;
    this.#distance = 0;
  }

  advance() {
    this.#distance += RACING_GAME.DISTANCE_UNIT;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }
}
