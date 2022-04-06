export default class GameConfiguration {
  #carNames;
  #playTimes;

  constructor({ carNames, playTimes }) {
    this.#carNames = carNames;
    this.#playTimes = playTimes;
    this.#makePlayResult();
  }

  static createGameConfiguration({ carNames, playTimes }) {
    return new GameConfiguration({ carNames, playTimes });
  }

  #makePlayResult() {
    this.carNames.reduce((acc, cur) => {
      acc[cur] = Array.from({ length: this.playTimes }, () =>
        this.#isStepForward()
      );
      return acc;
    }, {});
  }

  #isStepForward() {
    return Math.floor(Math.random() * 10) > 4 ? 1 : 0;
  }

  get carNames() {
    return this.#carNames;
  }

  get playTimes() {
    return this.#playTimes;
  }
}
