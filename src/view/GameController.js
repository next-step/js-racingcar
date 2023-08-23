import RacingGame from '../domain/RacingGame';
import { input } from '../utils/console';
import { RacingCameView } from './RacingGameVIew';

export class GameController {
  #racingGame;
  #racingGameView;

  constructor() {
    this.#racingGameView = new RacingCameView();
  }

  async start() {
    try {
      const carNames = await this.#racingGameView.getCarNames();
      const lapCount = await this.#racingGameView.getLapCount();

      this.#racingGame = new RacingGame(carNames, lapCount);

      this.#racingGame.startRace();
    } catch (error) {
      this.#racingGameView.printError(error.message);
      return await this.start();
    }

    this.#racingGameView.printRaceResult(this.#racingGame);
    process.exit();
  }
}
