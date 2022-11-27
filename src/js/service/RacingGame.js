import { CAR_RACING } from './constant.js';
import { generateNumber } from '../util/validator.js';
// eslint-disable-next-line no-unused-vars
import { Car } from './Car.js';

export class RacingGame {
  #cars = null;
  #attemtTimes = null;
  #winnerMovedDistance = Number.MIN_SAFE_INTEGER;
  #done = false;

  /**
   *
   * @param {Car[]} cars
   * @param {number} attemptTimes
   */
  constructor(cars, attemptTimes) {
    this.cars = cars;
    this.attemptTimes = attemptTimes;
  }

  run() {
    const { cars, attemptTimes } = this;
    for (let i = 0; i < attemptTimes; i++) {
      cars.forEach((car) => car.moveForward(generateNumber(CAR_RACING.RANDOM_VALUE.MIN, CAR_RACING.RANDOM_VALUE.MAX)));
    }
    this.#winnerMovedDistance = Math.max(...cars.map((car) => car.getMovedDistance()));
    this.isDone = true;
  }

  /**
   * @returns {boolean}
   */
  isDone() {
    return this.#done;
  }

  /**
   * @returns {Car[]}
   */
  getWinners() {
    return this.cars.filter((car) => car.getMovedDistance() === this.winnerMovedDistance);
  }
}
