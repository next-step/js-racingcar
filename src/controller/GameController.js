import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { RacingGame } from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';

class GameController {
  constructor() {
    this.racingGame = new RacingGame();
  }

  static async #getRacingCarNames() {
    const racingCarNames = await InputView.input(INPUT_MESSAGE.RACING_CAR);
    return racingCarNames;
  }

  static async #getRacingCount() {
    const racingCount = await InputView.input(INPUT_MESSAGE.COUNT);
    return Number(racingCount);
  }

  static #printRaceResult(results) {
    OutputView.print(OUTPUT_MESSAGE.RESULT);
    results.forEach((result) => {
      OutputView.print(`${result}\n`);
    });
  }

  static #printRacingWinners(winners) {
    OutputView.print(OUTPUT_MESSAGE.WINNERS(winners));
  }

  #startRace() {
    this.racingGame.race();
  }

  static #printGameResult(result, racingWinners) {
    GameController.#printRaceResult(result);
    GameController.#printRacingWinners(racingWinners);
  }

  async #settingRacingGame() {
    const racingCarNames = await GameController.#getRacingCarNames();
    const racingCount = await GameController.#getRacingCount();
    this.racingGame = new RacingGame(racingCarNames, racingCount);
  }

  #confirmResult() {
    return [this.racingGame.getRacingResult(), this.racingGame.getRacingWinners()];
  }

  async run() {
    await this.#settingRacingGame();
    this.#startRace();
    const [result, racingWinners] = this.#confirmResult();
    GameController.#printGameResult(result, racingWinners);
  }
}

export default GameController;
