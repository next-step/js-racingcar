import { CarValidator } from '../validator/index.js';

class RacingTrack {
  #racingCars;

  constructor() {
    this.#racingCars = [];
  }

  setRacingCars(racingCars) {
    try {
      CarValidator.validateCarNames(racingCars);
      this.#racingCars.push(...racingCars);
    } catch (error) {
      throw error;
    }
  }

  getRacingCars() {
    return this.#racingCars;
  }
}

export default RacingTrack;
