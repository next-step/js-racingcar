export default class GameConfiguration {
  #carNames;
  #playTimes;
  #racingCarList;

  constructor({ carNames, playTimes }) {
    this.#carNames = carNames;
    this.#playTimes = playTimes;
    this.#makePlayResult();
  }

  static createGameConfiguration({ carNames, playTimes }) {
    return new GameConfiguration({ carNames, playTimes });
  }

  #makePlayResult() {
    this.#racingCarList = this.carNames.reduce((acc, cur) => {
      acc[cur] = Array.from({ length: this.playTimes }, () =>
        this.#isStepForward()
      );
      return acc;
    }, {});
  }

  #isStepForward() {
    return Math.floor(Math.random() * 10) > 4 ? 1 : 0;
  }

  consumeTime = () => {
    this.#playTimes -= 1;
  };

  get carNames() {
    return this.#carNames;
  }

  get playTimes() {
    return this.#playTimes;
  }

  get racingCarList() {
    return this.#racingCarList;
  }
}
