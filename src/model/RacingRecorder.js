import RacingWinners from './RacingWinners.js';

class RacingRecorder {
  #racingResult;

  #racingWinners;

  constructor() {
    this.#racingResult = [];
    this.#racingWinners = new RacingWinners();
  }

  static #createNewResult(newMoveStatus) {
    return Object.entries({ ...newMoveStatus })
      .map((racerInfo) => racerInfo.join(' : '))
      .join('\n');
  }

  #setRacingResult(newResult) {
    this.#racingResult.push(newResult);
  }

  updateResults(newMoveStatus) {
    const newResult = RacingRecorder.#createNewResult(newMoveStatus);
    this.#setRacingResult(newResult);
  }

  updateWinners() {
    this.#racingWinners.setRacingWinners(this.#racingResult);
  }

  getRacingResult() {
    return this.#racingResult;
  }

  getRacingWinners() {
    return this.#racingWinners.getRacingWinners();
  }
}

export default RacingRecorder;
