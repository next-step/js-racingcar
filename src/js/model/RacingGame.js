/* eslint-disable no-param-reassign */
import randomCarMoveStrategy from '../RandomCarMoveStrategy.js';
import Process from './Process.js';

export default class RacingGame {
  #carList;

  #trialCount;

  #result;

  #winners;

  constructor(carList, trialCount) {
    this.#carList = carList;
    this.#trialCount = trialCount;
  }

  race() {
    this.#carList.forEach($car => {
      const process = this.#runningLap($car);
      $car.process = new Process(process);
    });
    this.#setResult();
  }

  #runningLap(car) {
    return new Array(this.#trialCount.value).fill(false).map(_ => car.run(randomCarMoveStrategy));
  }

  #setResult() {
    this.#result = this.#getResult();
    this.#winners = this.#getWinners();
  }

  #getMaxDistance() {
    let maxDistance = 0;
    this.#carList.forEach(car => {
      maxDistance = Math.max(maxDistance, car.distance);
    });
    return maxDistance;
  }

  #getWinners() {
    return this.#carList.reduce((acc, car) => {
      if (car.distance === this.#getMaxDistance()) return [...acc, car.name.value];
      return acc;
    }, []);
  }

  #getResult() {
    return this.#carList.map(car => [car.name.value, car.distance]);
  }

  get result() {
    return [...this.#result];
  }

  get winners() {
    return this.#winners;
  }
}
