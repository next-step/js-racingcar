import { getRandomNumberFromZeroToNine } from '../utils/getRandomNumber.js';
import { printMessage } from '../utils/printMessage.js';
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
    return getRandomNumberFromZeroToNine() >= MOVE_FORWARD_LIMIT;
  }

  moveForward() {
    if (this.canMoveForward()) {
      this.#distanceDriven = this.#distanceDriven + 1;
    }
  }

  printInfo() {
    if (!this.#distanceDriven) {
      printMessage(`${this.#name} : `);

      return;
    }

    const distanceString = new Array(this.#distanceDriven).fill('-').join('');

    printMessage(`${this.#name} : ${distanceString}`);
  }
}

export default Car;
