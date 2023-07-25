import { CAR_SYMBOLS, INIT_RACING_COUNT } from '../constants/model.js';
import ErrorHandler from '../handler/ErrorHandler.js';
import {
  isExitRace,
  moveRacingCar,
  parseRacingResultStatus,
} from '../utils/racingTrack.js';

class RacingTrack {
  #racingCarStatus;

  #racingCount;

  #racingResult;

  constructor() {
    this.#racingCarStatus = {};
    this.#racingCount = INIT_RACING_COUNT;
    this.#racingResult = [];
  }

  setRacingCars(racingCars) {
    ErrorHandler.confirmCarNames(racingCars);
    racingCars.forEach((carName) => {
      this.#racingCarStatus[carName] = CAR_SYMBOLS.EMPTY;
    });
  }

  getRacingCars() {
    return this.#racingCarStatus;
  }

  getRacingResult() {
    return this.#racingResult;
  }

  #updateRacingCarStatus(newRacingCarStatus) {
    this.#racingCarStatus = newRacingCarStatus;
  }

  #updateRacingResult(newRacingCarStatus) {
    this.#racingResult.push(parseRacingResultStatus(newRacingCarStatus));
  }

  #minusRacingCount() {
    this.#racingCount -= 1;
  }

  race() {
    const racers = Object.keys(this.#racingCarStatus);
    while (!isExitRace(this.#racingCount)) {
      const newRacingCarStatus = moveRacingCar(racers, this.#racingCarStatus);
      this.#updateRacingCarStatus(newRacingCarStatus);
      this.#updateRacingResult(newRacingCarStatus);
      this.#minusRacingCount();
    }
  }
}

export default RacingTrack;
