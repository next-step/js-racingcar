import RacingGameService from '../services/racingGame.service.js';

export default class RacingGameController {
  #service;

  constructor() {
    this.#service = new RacingGameService();
  }

  start(params) {
    this.#service.setRacingGame(params);
  }

  finish() {
    return this.#service.getWinnedCars();
  }

  reset() {
    this.#service.setRacingGame({ cars: [], tryCount: 0 });
  }
}
