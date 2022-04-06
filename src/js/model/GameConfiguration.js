export default class GameConfiguration {
  #carNames;
  #playTimes;
  #racingCarList;

  static createGameConfiguration() {
    return new GameConfiguration();
  }

  makePlayResult() {
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

  updateCarNames = carNames => {
    this.#carNames = carNames;
  };
  updatePlayTimes = playTimes => {
    this.#playTimes = playTimes;
  };

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
