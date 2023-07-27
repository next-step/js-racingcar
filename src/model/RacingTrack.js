import NumberMaker from '../NumberMaker.js';
import { EXIT_COUNT, INIT_RACING_COUNT } from '../constants/index.js';
import { RacingCars, RacingRecorder } from './index.js';

class RacingTrack {
  #racingCount;

  #racingCars;

  #racingRecorder;

  constructor() {
    this.#racingCount = INIT_RACING_COUNT;
    this.#racingCars = new RacingCars(NumberMaker);
    this.#racingRecorder = new RacingRecorder();
  }

  getRacingResult() {
    return this.#racingRecorder.getRacingResult();
  }

  getRacingWinners() {
    return this.#racingRecorder.getRacingWinners();
  }

  updateMoveStatus(racingCars) {
    this.#racingCars.initMoveStatus(racingCars);
  }

  #updateMoveStatus(carNames) {
    return this.#racingCars.move(carNames);
  }

  #updateRacingResults(newMoveStatus) {
    this.#racingRecorder.updateResults(newMoveStatus);
  }

  #updateRacingWinners() {
    this.#racingRecorder.updateWinners();
  }

  #minusRacingCount() {
    this.#racingCount -= 1;
  }

  #isExitRace() {
    return this.#racingCount === EXIT_COUNT;
  }

  race(carNames) {
    while (!this.#isExitRace()) {
      const newMoveStatus = this.#updateMoveStatus(carNames);
      this.#updateRacingResults(newMoveStatus);
      this.#updateRacingWinners();
      this.#minusRacingCount();
    }
  }
}

export default RacingTrack;
