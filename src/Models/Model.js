import { RacingGame } from './RacingGame';

export class Model {
  #racingGame;

  constructor() {}

  startRacingGame(carNames, totalRounds) {
    this.#racingGame = new RacingGame(carNames, totalRounds);
  }

  getGameResult() {
    return this.#racingGame.getGameResult();
  }
}
