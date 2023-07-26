class RacingWinners {
  #racingWinners;

  constructor() {
    this.#racingWinners = [];
  }

  static createResultArray(racingResult) {
    return racingResult
      .at(-1)
      .split('\n')
      .map((s) => {
        const [racer, distance] = [s.split(' : ')[0], s.split(' : ')[1].length];
        return [racer, distance];
      });
  }

  static createDistanceArray = (result) =>
    result.map(([, distance]) => distance);

  static createMaxDistance(result) {
    const distanceArr = result.map(([, distance]) => distance);
    return Math.max(...distanceArr);
  }

  static #isMaxDistance = (distance, maxDistance) => distance === maxDistance;

  static createRacingWinners(racingResult) {
    const result = RacingWinners.createResultArray(racingResult);
    const maxDistance = RacingWinners.createMaxDistance(result);
    return result
      .filter(([, distance]) =>
        RacingWinners.#isMaxDistance(distance, maxDistance),
      )
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
