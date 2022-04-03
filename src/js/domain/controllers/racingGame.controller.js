import RacingGameService from '../services/racingGame.service.js';

export default class RacingGameController {
  #service;

  constructor() {
    this.#service = new RacingGameService();
  }

  getCars() {
    return this.#service.getCars();
  }

  getTryCount() {
    return this.#service.getTryCount();
  }

  setCars(cars) {
    this.#service.setCars(cars);
    return this;
  }

  setTryCount(count) {
    this.#service.setTryCount(count);
    return this;
  }

  setRacingGame({ cars, tryCount }) {
    this.#service.setCars(cars);
    this.#service.setTryCount(tryCount);
  }

  start() {
    this.#service.startGame();
    return this;
  }

  gameFinishedResult() {
    return this.#service.getWinnedCars();
  }

  reset() {
    this.#service.setRacingGame({ cars: [], tryCount: 0 });
    return this;
  }
}
