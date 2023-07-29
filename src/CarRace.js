import { RACE_CONFIGURE } from './constants/index';

export default class CarRace {
  #maxLap = RACE_CONFIGURE.MAX_LAP;
  #lap = 0;

  #isRaceNotDone() {
    return this.#lap < this.#maxLap;
  }

  nextLap() {
    if (this.#isRaceNotDone()) {
      this.#lap += 1;
    }
  }

  getCurrentLap() {
    return this.#lap;
  }
}
