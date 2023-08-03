import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { RacingGame } from '../model/index.js';
import { View } from '../view/View.js';
import { Validator } from '../Validator.js';

export class GameController {
  #racingGame;

  #view;

  constructor() {
    this.#view = new View();
  }

  async #retryOnErrors(retryableAction) {
    try {
      return await retryableAction();
    } catch (error) {
      this.#view.print(error.message);
      return this.#retryOnErrors(retryableAction);
    }
  }

  async #getRacingCarNames() {
    return this.#retryOnErrors(async () => {
      const racingCarNames = await this.#view.inputByUser(INPUT_MESSAGE.RACING_CAR);
      Validator.check(racingCarNames, INPUT_MESSAGE.RACING_CAR);
      return racingCarNames;
    });
  }

  async #getRacingCount() {
    return this.#retryOnErrors(async () => {
      const racingCount = await this.#view.inputByUser(INPUT_MESSAGE.COUNT);
      Validator.check(racingCount, INPUT_MESSAGE.COUNT);
      return racingCount;
    });
  }

  async #getUserInput() {
    const carNames = await this.#getRacingCarNames();
    const count = await this.#getRacingCount();
    return [carNames, count];
  }

  #settingRacingGame(carNames, count) {
    this.#racingGame = new RacingGame(carNames, count);
  }

  #printRaceResult(results) {
    this.#view.print(OUTPUT_MESSAGE.RESULT);
    results.forEach((result) => {
      this.#view.print(`${result}\n`);
    });
  }

  #printRacingWinners(winners) {
    this.#view.print(OUTPUT_MESSAGE.WINNERS(winners));
  }

  #startRace() {
    this.#racingGame.race();
  }

  #printGameResult(result, racingWinners) {
    this.#printRaceResult(result);
    this.#printRacingWinners(racingWinners);
  }

  #confirmAfterRacing() {
    return [this.#racingGame.getRacingResult(), this.#racingGame.getRacingWinners()];
  }

  async run() {
    const [carNames, count] = await this.#getUserInput();
    this.#settingRacingGame(carNames, count);
    this.#startRace();
    const [result, racingWinners] = this.#confirmAfterRacing();
    this.#printGameResult(result, racingWinners);
  }
}
