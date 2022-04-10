import {
  MAX_CAR_NAME_LENTH,
  MAX_FORWARD_NUMBER,
  MIN_CAR_NAME_LENTH,
  MIN_FORWARD_NUMBER,
} from '../constants/car.js';
import { ERROR_CAR_NAMES_INPUT } from '../constants/message.js';

export class Car {
  #carName;

  constructor(carName) {
    if (!this.isCorrectLength(carName)) {
      throw ERROR_CAR_NAMES_INPUT;
    }
    this.#carName = carName;
  }

  get carName() {
    return this.#carName;
  }

  isCorrectLength(carName) {
    return carName.length <= MAX_CAR_NAME_LENTH && carName.length >= MIN_CAR_NAME_LENTH;
  }

  createForwardNumber() {
    return Math.floor(Math.random() * (MAX_FORWARD_NUMBER - MIN_FORWARD_NUMBER + 1)) + MIN_FORWARD_NUMBER;
  }
}
