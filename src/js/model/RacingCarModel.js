import { RACING_CAR } from '../constants/racingCar.js';

class RacingCarModel {
  #carName = '';

  #carAttemptsCount = RACING_CAR.MIN_ATTEMPTS_COUNT;

  #record = {};

  #racingCarWinners = [];

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

  get racingCarWinners() {
    return this.#racingCarWinners;
  }

  set racingCarWinners(winners) {
    this.#racingCarWinners = winners;
  }

  get record() {
    return this.#record;
  }
}

const racingCarModel = new RacingCarModel();

export default racingCarModel;
