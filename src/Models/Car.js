import { CAR } from '../constants';

export class Car {
  #name;
  #distance = CAR.DEFAULT_DISTANCE;

  constructor(name) {
    this.#name = name;
  }

  advance() {
    this.#distance += CAR.DISTANCE_UNIT;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }
}
