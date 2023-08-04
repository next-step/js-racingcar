import { getRandomInRange } from '../utils/getRandomInRange.js';
import {
  NAME_LENGTH,
  NAME_ERROR_MESSAGE,
  MOVE_FORWARD_THRESHOLD,
} from './constants.js';

class Car {
  #name;
  #distanceDriven = 0;

  static of(name) {
    return new Car(name);
  }

  constructor(name) {
    this.validateName(name);

    this.#name = name;
  }

  validateName(name) {
    if (name.length < NAME_LENGTH.MIN) {
      throw new Error(NAME_ERROR_MESSAGE.LESS_THAN_MIN);
    }

    if (name.length > NAME_LENGTH.MAX) {
      throw new Error(NAME_ERROR_MESSAGE.OVER_THAN_MAX);
    }
  }

  getName() {
    return this.#name;
  }

  getDistanceDriven() {
    return this.#distanceDriven;
  }

  canMoveForward() {
    return getRandomInRange() >= MOVE_FORWARD_THRESHOLD;
  }

  moveForward() {
    if (this.canMoveForward()) {
      this.#distanceDriven = this.#distanceDriven + 1;
    }
  }
}

export default Car;
