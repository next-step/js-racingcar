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
import { View } from '../view/View.js';

export class GameController {
  #racingGame;

  #view;

  constructor() {
    this.#view = new View();
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
      GameController.#validateCarNames(racingCarNames);
      return racingCarNames;
    });
  }

  async #getRacingCount() {
    return this.#retryOnErrors(async () => {
      const racingCount = await this.#view.inputByUser(INPUT_MESSAGE.COUNT);
      GameController.#validateCount(racingCount);
      return racingCount;
    });
  }

  async #getUserInput() {
    const carNames = await this.#getRacingCarNames();
    const count = await this.#getRacingCount();
    return [carNames, count];
  }

  #settingRacingGame(carNames, count) {
    return this.#retryOnErrors(() => {
      this.#racingGame = new RacingGame(carNames, count);
    });
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
