import { RACE_CONFIGURE } from './constants/index';
import { generateRandomNumber } from './utils/index';

export default class CarRace {
  #cars;

  #maxLap = RACE_CONFIGURE.MAX_LAP;

  #minSpeed = RACE_CONFIGURE.MIN_SPEED;

  #maxSpeed = RACE_CONFIGURE.MAX_SPEED;

  #moveCondition = RACE_CONFIGURE.MOVE_CONDITION;

  #lap = 0;

  constructor(cars) {
    this.#cars = cars;
  }

  #isRaceNotDone() {
    return this.#lap < this.#maxLap;
  }

  #getDistance() {
    return generateRandomNumber(this.#minSpeed, this.#maxSpeed);
  }

  #isMovable() {
    return this.#getDistance() > this.#moveCondition;
  }

  nextLap() {
    if (this.#isRaceNotDone()) {
      this.#lap += 1;
    }
  }

  race() {
    this.#cars.forEach((car) => {
      car.move(this.#isMovable());
    });
  }

  checkRaceStatus() {
    return this.#isRaceNotDone();
  }

  getCurrentLap() {
    return this.#lap;
  }
}
