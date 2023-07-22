import { CAR_SYMBOLS, INIT_RACING_COUNT } from '../constants/model.js';
import ErrorHandler from '../handler/ErrorHandler.js';
import { isExitRace, moveRacingCar, parseRacingResultStatus } from '../utils/racingTrack.js';

class RacingTrack {
  #racingCars;
  #racingCount;
  #racingResult;
  constructor() {
    this.#racingCars = {};
    this.#racingCount = INIT_RACING_COUNT;
    this.#racingResult = [];
  }

  setRacingCars(racingCars) {
    ErrorHandler.confirmCarNames(racingCars);
    racingCars.forEach((carName) => (this.#racingCars[carName] = CAR_SYMBOLS.EMPTY));
  }

  getRacingCars() {
    return this.#racingCars;
  }

  getRacingResult() {
    return this.#racingResult;
  }

  #updateRacingCars(updateRacingCars) {
    this.#racingCars = updateRacingCars;
  }

  #updateRacingResult(newRacingCars) {
    this.#racingResult.push(parseRacingResultStatus(newRacingCars));
  }

  #minusRacingCount() {
    this.#racingCount -= 1;
  }

  race() {
    const racingCars = Object.keys(this.#racingCars);
    while (!isExitRace(this.#racingCount)) {
      const newRacingCars = moveRacingCar(racingCars, this.#racingCars);
      this.#updateRacingCars(newRacingCars);
      this.#updateRacingResult(newRacingCars);
      this.#minusRacingCount();
    }
  }
}

export default RacingTrack;
