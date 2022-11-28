import { RACING_CAR } from '../constants/racingCar.js';

class Model {
  #carName = '';

  #carAttemptsCount = RACING_CAR.MIN_ATTEMPTS_COUNT;

  #record = {};

  get carName() {
    return this.#carName.split(',').map((elem) => elem.trim());
  }

  set carName(carName) {
    this.#carName = carName;
  }

  get carAttemptsCount() {
    return this.#carAttemptsCount;
  }

  set carAttemptsCount(count) {
    this.#carAttemptsCount = count;
  }

  get record() {
    return this.#record;
  }
}

const model = new Model();

export default model;
