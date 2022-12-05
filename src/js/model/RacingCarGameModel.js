import { RACING_CAR } from '../constants/racingCar.js';

class RacingCarGameModel {
  #cars = [];

  #attemptsCount = RACING_CAR.MIN_ATTEMPTS_COUNT;

  #record = {};

  #winners = [];

  get cars() {
    return this.#cars;
  }

  set cars(cars) {
    this.#cars = cars;
  }

  get attemptsCount() {
    return this.#attemptsCount;
  }

  set attemptsCount(count) {
    this.#attemptsCount = count;
  }

  get record() {
    return this.#record;
  }

  set record(record) {
    this.#record = record;
  }

  get winners() {
    return this.#winners.join(', ');
  }

  set winners(winners) {
    this.#winners = winners;
  }
}

const racingCarGameModel = new RacingCarGameModel();

export default racingCarGameModel;
