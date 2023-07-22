import { genRacingWinners } from '../utils/index.js';

class RacingWinners {
  #racingWinners;

  constructor() {
    this.#racingWinners = [];
  }

  #searchRacingWinners(racingResult) {
    return genRacingWinners(racingResult);
  }

  setRacingWinners(racingResult) {
    const winners = this.#searchRacingWinners(racingResult);
    this.#racingWinners.push(...winners);
  }

  getRacingWinners() {
    return this.#racingWinners;
  }
}

export default RacingWinners;
