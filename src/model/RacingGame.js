import { EXIT_COUNT, INIT_RACING_COUNT } from '../constants/model.js';
import { SEPERATOR_SYMBOLS } from '../constants/commons.js';
import { NumberMaker } from '../NumberMaker.js';
import { RacingCars, RacingWinners } from './index.js';

export class RacingGame {
  #racingCount;

  #racingCars;

  #racingResult;

  #racingWinners;

  constructor(carNames, count) {
    this.#init(carNames, count);
  }

  static #createNewResult(newMoveStatus) {
    return Object.entries({ ...newMoveStatus })
      .map((racerInfo) => racerInfo.join(SEPERATOR_SYMBOLS.COLON))
      .join(SEPERATOR_SYMBOLS.NEW_LINE);
  }

  #init(carNames, count) {
    this.#racingCount = Number(count) || INIT_RACING_COUNT;
    this.#racingCars = new RacingCars(carNames, NumberMaker);
    this.#racingWinners = new RacingWinners();
    this.#racingResult = [];
  }

  #updateMoveStatus() {
    return this.#racingCars.move();
  }

  #setRacingResult(newResult) {
    this.#racingResult.push(newResult);
  }

  #updateRacingResults(newMoveStatus) {
    const newResult = RacingGame.#createNewResult(newMoveStatus);
    this.#setRacingResult(newResult);
  }

  #updateRacingWinners() {
    this.#racingWinners.setRacingWinners(this.#racingResult);
  }

  #minusRacingCount() {
    this.#racingCount -= 1;
  }

  #isExitRace() {
    return this.#racingCount === EXIT_COUNT;
  }

  getRacingResult() {
    return this.#racingResult;
  }

  getRacingWinners() {
    return this.#racingWinners.getRacingWinners();
  }

  race() {
    while (!this.#isExitRace()) {
      const newMoveStatus = this.#updateMoveStatus();
      this.#updateRacingResults(newMoveStatus);
      this.#updateRacingWinners();
      this.#minusRacingCount();
    }
  }
}
