export default class GameProcessModel {
  #consumeTime;
  #leftPlayTime;
  #carNames;
  #racingCarList;

  constructor({ consumeTime, playTimes, carNames, racingCarList }) {
    this.#consumeTime = consumeTime;
    this.#leftPlayTime = playTimes;
    this.#carNames = carNames;
    this.#racingCarList = racingCarList;
  }

  consumeTime = () => {
    this.#leftPlayTime -= 1;
  };

  get consumeTime() {
    return this.#consumeTime;
  }

  get carNames() {
    return this.#carNames;
  }

  get leftPlayTime() {
    return this.#leftPlayTime;
  }

  get racingCarList() {
    return this.#racingCarList;
  }
}
