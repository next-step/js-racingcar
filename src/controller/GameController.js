import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { RacingGame } from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';
import { Validator } from '../Validator.js';

export class GameController {
  racingGame;

  static async #getRacingCarNames() {
    try {
      const racingCarNames = await InputView.input(INPUT_MESSAGE.RACING_CAR);
      Validator.check(racingCarNames, INPUT_MESSAGE.RACING_CAR);
      return racingCarNames;
    } catch (error) {
      OutputView.print(error.message);
      return GameController.#getRacingCarNames();
    }
  }

  static async #getRacingCount() {
    try {
      const racingCount = await InputView.input(INPUT_MESSAGE.COUNT);
      Validator.check(racingCount, INPUT_MESSAGE.COUNT);
      return racingCount;
    } catch (error) {
      OutputView.print(error.message);
      return GameController.#getRacingCount();
    }
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
    try {
      const racingCarNames = await GameController.#getRacingCarNames();
      const racingCount = await GameController.#getRacingCount();
      this.racingGame = new RacingGame(racingCarNames, racingCount);
    } catch (error) {
      OutputView.print(error);
      await this.#settingRacingGame();
    }
  }

  #confirmAfterRacing() {
    return [this.racingGame.getRacingResult(), this.racingGame.getRacingWinners()];
  }

  async run() {
    await this.#settingRacingGame();
    this.#startRace();
    const [result, racingWinners] = this.#confirmAfterRacing();
    GameController.#printGameResult(result, racingWinners);
  }
}
