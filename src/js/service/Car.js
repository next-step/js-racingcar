import { CAR_RACING } from './constant.js';

export class Car {
  #movedDistance = 0;
  #name = null;

  /**
   *
   * @param {string} name
   */
  constructor(name) {
    this.#name = name;
  }

  /**
   *
   * @returns {string}
   */
  getName() {
    return this.#name;
  }

  /**
   *
   * @param {number} number
   */
  moveForward() {
    this.#movedDistance += 1;
  }

  /**
   *
   * @returns {number}
   */
  getMovedDistance() {
    return this.#movedDistance;
  }
}
