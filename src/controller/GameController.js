import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { RacingGame } from '../model/index.js';
import { Validator } from '../Validator.js';
import { InputView, OutputView } from '../view/index.js';

export class GameController {
  #racingGame;

  #inputView;

  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async #getRacingCarNames() {
    try {
      const racingCarNames = await this.#inputView.input(INPUT_MESSAGE.RACING_CAR);
      Validator.check(racingCarNames, INPUT_MESSAGE.RACING_CAR);
      return racingCarNames;
    } catch (error) {
      this.#outputView.print(error.message);
      return this.#getRacingCarNames();
    }
  }

  async #getRacingCount() {
    try {
      const racingCount = await this.#inputView.input(INPUT_MESSAGE.COUNT);
      Validator.check(racingCount, INPUT_MESSAGE.COUNT);
      return racingCount;
    } catch (error) {
      this.#outputView.print(error.message);
      return this.#getRacingCount();
    }
  }

  #printRaceResult(results) {
    this.#outputView.print(OUTPUT_MESSAGE.RESULT);
    results.forEach((result) => {
      this.#outputView.print(`${result}\n`);
    });
  }

  #printRacingWinners(winners) {
    this.#outputView.print(OUTPUT_MESSAGE.WINNERS(winners));
  }

  #startRace() {
    this.#racingGame.race();
  }

  #printGameResult(result, racingWinners) {
    this.#printRaceResult(result);
    this.#printRacingWinners(racingWinners);
  }

  async #settingRacingGame() {
    try {
      const racingCarNames = await this.#getRacingCarNames();
      const racingCount = await this.#getRacingCount();
      this.#racingGame = new RacingGame(racingCarNames, racingCount);
    } catch (error) {
      this.#outputView.print(error);
      await this.#settingRacingGame();
    }
  }

  #confirmAfterRacing() {
    return [this.#racingGame.getRacingResult(), this.#racingGame.getRacingWinners()];
  }

  async run() {
    await this.#settingRacingGame();
    this.#startRace();
    const [result, racingWinners] = this.#confirmAfterRacing();
    this.#printGameResult(result, racingWinners);
  }
}
