import { SEPERATOR_SYMBOLS } from '../constants/commons.js';
import { ERROR_MESSAGE, INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { CAR_MAX_LENGTH, CAR_MIN_LENGTH } from '../constants/validate.js';
import { RacingGame } from '../model/index.js';
import {
  isCharacter,
  isDuplicateRacingCars,
  isIncludeSpaces,
  isInvalidLengthRacingCars,
  isNumber,
} from '../utils/validate.js';
import { InputView, OutputView } from '../view/index.js';

export class GameController {
  #racingGame;

  #inputView;

  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  static #validateCarNames(carNames) {
    const racingCars = carNames.split(SEPERATOR_SYMBOLS.COMMA);
    if (isIncludeSpaces(racingCars)) throw new SyntaxError(ERROR_MESSAGE.INCLUDE_EMPTY_WORDS);
    if (!isCharacter(racingCars)) throw new TypeError(ERROR_MESSAGE.AVALIABLE_CHARACTER);
    if (isInvalidLengthRacingCars(racingCars))
      throw new RangeError(ERROR_MESSAGE.INVALID_RANGE(CAR_MIN_LENGTH, CAR_MAX_LENGTH));
    if (isDuplicateRacingCars(racingCars)) throw new SyntaxError(ERROR_MESSAGE.DUPLICATE_CAR_NAMES);
  }

  static #validateCount(count) {
    const racingCount = Number(count);
    if (!isNumber(racingCount)) throw new TypeError(ERROR_MESSAGE.AVALIABLE_NUMBER);
  }

  async #getRacingCarNames() {
    try {
      const racingCarNames = await this.#inputView.input(INPUT_MESSAGE.RACING_CAR);
      GameController.#validateCarNames(racingCarNames);
      return racingCarNames;
    } catch (error) {
      this.#outputView.print(error.message);
      return this.#getRacingCarNames();
    }
  }

  async #getRacingCount() {
    try {
      const racingCount = await this.#inputView.input(INPUT_MESSAGE.COUNT);
      GameController.#validateCount(racingCount);
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
