import ErrorHandler from '../handler/ErrorHandler.js';

class RacingTrack {
  #racingCars;
  constructor() {
    this.#racingCars = [];
  }

  setRacingCars(racingCars) {
    ErrorHandler.confirmCarNames(racingCars);
    this.#racingCars.push(...racingCars);
  }

  getRacingCars() {
    return this.#racingCars;
  }
}

export default RacingTrack;
