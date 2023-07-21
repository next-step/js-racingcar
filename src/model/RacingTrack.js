import ErrorHandler from '../handler/ErrorHandler.js';

class RacingTrack {
  #racingCars;
  constructor() {
    this.#racingCars = {};
  }

  setRacingCars(racingCars) {
    ErrorHandler.confirmCarNames(racingCars);
    racingCars.forEach((carName) => (this.#racingCars[carName] = ''));
  }

  getRacingCars() {
    return this.#racingCars;
  }
}

export default RacingTrack;
