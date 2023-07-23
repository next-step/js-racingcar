import { RacingGame } from './RacingGame';

export class Model {
  #racingGame;

  constructor() {
    this.#cars = new Map();
  }

  startRacingGame(carNames) {
    this.#racingGame = new RacingGame(carNames);
  }
}
