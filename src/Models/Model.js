import { RacingGame } from './RacingGame';

export class Model {
  #racingGame;

  constructor() {}

  startRacingGame(carNames) {
    this.#racingGame = new RacingGame(carNames);
  }
}
