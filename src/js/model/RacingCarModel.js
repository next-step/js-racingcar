import { RACING_CAR } from '../constants/racingCar.js';

class RacingCarModel {
  #name = '';

  #attemptsCount = RACING_CAR.MIN_ATTEMPTS_COUNT;

  #record = {};

  #winners = [];

  get name() {
    return this.#name.split(',').map((elem) => elem.trim());
  }

  set name(name) {
    this.#name = name;
  }

  get attemptsCount() {
    return this.#attemptsCount;
  }

  set attemptsCount(count) {
    this.#attemptsCount = count;
  }

  get winners() {
    return this.#winners.join(', ');
  }

  set winners(winners) {
    this.#winners = winners;
  }

  get record() {
    return this.#record;
  }
}

const racingCarModel = new RacingCarModel();

export default racingCarModel;
