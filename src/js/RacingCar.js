import { CAR_PROGRESS_THRESHOLD, CAR_NAME_RULE, TRY_COUNT_LIMIT } from './constants.js';

export default class RacingCar {
  cars;
  tryCount;

  constructor(cars = [], tryCount = 0) {
    this.cars = cars;
    this.tryCount = tryCount;
  }

  #isCarNameLengthValid(cars) {
    return cars.every((name) => name.length >= CAR_NAME_RULE.MIN_LENGTH && name.length <= CAR_NAME_RULE.MAX_LENGTH);
  }

  #isCarNameDuplicated(cars) {
    return new Set(cars).size !== cars.length;
  }

  registerCars(carNames) {
    try {
      const cars = carNames.split(',').map((name) => name.trim());

      if (!this.#isCarNameLengthValid(cars)) throw new Error('자동차 이름은 1자 이상, 5자 이하여야 합니다.');
      if (this.#isCarNameDuplicated(cars)) throw new Error('자동차 이름은 중복될 수 없습니다.');

      this.cars = cars.map((name) => ({ name, location: 0 }));
    } catch (err) {
      window.alert(err.message);
    }
  }

  startRacing(tryCount) {
    try {
      if (tryCount > TRY_COUNT_LIMIT) throw new Error('최대 시도 횟수는 30회 입니다.');

      this.tryCount = tryCount;
      for (let i = 0; i < tryCount; i++) {
        this.#moveForwardOnce();
      }
    } catch (err) {
      window.alert(err.message);
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
    this.tryCount = 0;
  }
}
