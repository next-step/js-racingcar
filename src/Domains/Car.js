import { Validation } from '../utils';
import { CAR } from '../constants';

export class Car {
  #name;
  #distance = CAR.DEFAULT_DISTANCE;

  constructor(name) {
    this.#validation(name);
    this.#name = name;
  }

  #validation(name) {
    Validation.validateCarName(name);
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
