import { getRandomInRange } from '../utils/getRandomInRange.js';
import { MOVE_FORWARD_LIMIT } from './constants.js';

class Car {
  #name;
  #distanceDriven = 0;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getDistanceDriven() {
    return this.#distanceDriven;
  }

  canMoveForward() {
    return getRandomInRange() >= MOVE_FORWARD_LIMIT;
  }

  moveForward() {
    if (this.canMoveForward()) {
      this.#distanceDriven = this.#distanceDriven + 1;
    }
  }
}

export default Car;
