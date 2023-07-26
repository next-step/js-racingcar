import { SEPERATOR_SYMBOLS } from '../constants';

class RacingWinners {
  #racingWinners;

  constructor() {
    this.#racingWinners = [];
  }

  static #seperateCarNameAndDistance(resultString) {
    const [racer, distance] = resultString.split(SEPERATOR_SYMBOLS.COLON);
    return [racer, distance.length];
  }

  static #createFinalResultArray(racingResult) {
    return racingResult
      .at(-1)
      .split(SEPERATOR_SYMBOLS.NEW_LINE)
      .map((s) => RacingWinners.#seperateCarNameAndDistance(s));
  }

  static #createDistanceArray(result) {
    return result.map(([, distance]) => distance);
  }

  static #createMaxDistance(result) {
    return Math.max(...RacingWinners.#createDistanceArray(result));
  }

  static createRacingWinners(racingResult) {
    const finalResult = RacingWinners.#createFinalResultArray(racingResult);
    const maxDistance = RacingWinners.#createMaxDistance(finalResult);
    return finalResult
      .filter(([, distance]) => distance === maxDistance)
      .map(([racer]) => racer);
  }

  setRacingWinners(racingResult) {
    this.#racingWinners = RacingWinners.createRacingWinners(racingResult);
  }

  getRacingWinners() {
    return this.#racingWinners;
  }
}

export default RacingWinners;
