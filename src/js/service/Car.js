import { CAR_RACING } from './constant.js';

export class Car {
  #movedDistance = 0;
  #carName = null;

  /**
   *
   * @param {string} carName
   */
  constructor(carName) {
    this.#carName = carName;
  }

  /**
   *
   * @returns {string}
   */
  getCarName() {
    return this.#carName;
  }

  /**
   *
   * @param {number} number
   */
  moveForward(number) {
    if (number >= CAR_RACING.CAR.CONDITION.FORWARD) {
      this.#movedDistance += 1;
    }
  }

  /**
   *
   * @returns {number}
   */
  getMovedDistance() {
    return this.#movedDistance;
  }
}
