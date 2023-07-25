import { EXIT_COUNT, INIT_RACING_COUNT } from '../constants/index.js';
import RacingCars from './RacingCars.js';

class RacingTrack {
  #racingCount;

  #racingResult;

  #racingCars;

  constructor() {
    this.#racingCount = INIT_RACING_COUNT;
    this.#racingResult = [];
    this.#racingCars = new RacingCars();
  }

  setRacingCars(racingCars) {
    this.#racingCars.initMoveStatus(racingCars);
  }

  getRacingResult() {
    return this.#racingResult;
  }

  #updateMoveStatus(racers) {
    return this.#racingCars.move(racers);
  }

  #updateRacingResult(newRacingCarStatus) {
    const newResult = Object.entries({ ...newRacingCarStatus })
      .map((racerInfo) => racerInfo.join(' : '))
      .join('\n');
    this.#racingResult.push(newResult);
  }

  #minusRacingCount() {
    this.#racingCount -= 1;
  }

  #requestCarNames() {
    return this.#racingCars.getCarNames();
  }

  #isExitRace() {
    return this.#racingCount === EXIT_COUNT;
  }

  race() {
    const carNames = this.#requestCarNames();
    while (!this.#isExitRace()) {
      const newMoveStatus = this.#updateMoveStatus(carNames);
      this.#updateRacingResult(newMoveStatus);
      this.#minusRacingCount();
    }
  }
}

export default RacingTrack;
