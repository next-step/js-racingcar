import { CAR_PROGRESS_THRESHOLD } from './constants.js';

export default class RacingCar {
  constructor() {
    this.cars = [];
    this.tryCount = null;
  }

  storeCars(cars) {
    this.cars = cars.map((name) => ({ name, location: 0 }));
  }

  race(tryCount) {
    this.tryCount = tryCount;
    for (let i = 0; i < tryCount; i++) {
      this.#moveForwardOnce();
    }
  }

  #moveForwardOnce() {
    this.cars.forEach((car) => {
      const isMoved = Math.floor(Math.random() * 10) >= CAR_PROGRESS_THRESHOLD;
      if (isMoved) car.location++;
    });
  }

  reset() {
    this.cars = [];
    this.tryCount = null;
  }
}
