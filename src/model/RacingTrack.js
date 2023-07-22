import NumberMaker from '../NumberMaker.js';
import { CAR_SYMBOLS, INIT_RACING_COUNT } from '../constants/model.js';
import ErrorHandler from '../handler/ErrorHandler.js';
import { isExitRace, isMove } from '../utils/racingTrack.js';

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

  race() {
    const racingCars = Object.keys(this.#racingCars);
    while (!isExitRace(this.#racingCount)) {
      const randomNumbers = NumberMaker.genRacingCarNumbers(racingCars);
      racingCars.forEach(
        (car, i) => isMove(randomNumbers[i]) && (this.#racingCars[car] += CAR_SYMBOLS.MOVE)
      );
      this.#racingResult.push(
        Object.entries({ ...this.#racingCars })
          .map((arr) => arr.join(' : '))
          .join('\n')
      );
      this.#racingCount -= 1;
    }
  }
}

export default RacingTrack;
