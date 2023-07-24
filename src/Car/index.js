import { getRandomNumberFromZeroToNine } from '../utils/getRandomNumber';

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
    return getRandomNumberFromZeroToNine() >= 4;
  }

  moveForward() {
    if (this.canMoveForward()) {
      this.#distanceDriven = this.#distanceDriven + 1;
    }
  }
}

export default Car;
