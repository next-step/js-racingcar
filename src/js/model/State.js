import GameProcess from '../components/GameProcess.js';

export default class State {
  static instance;

  #carNames;
  #racingCarList;
  #playTimes;

  static getInstance() {
    if (!this.instance) this.instance = new State();
    return this.instance;
  }

  setGames = ({ carNames, playTimes }) => {
    this.#carNames = carNames;
    this.#playTimes = playTimes;

    this.#racingCarList = this.#carNames.reduce((acc, cur) => {
      acc[cur] = Array.from({ length: this.#playTimes }, () =>
        this.#isStepForward()
      );
      return acc;
    }, {});

    this.startGame();
  };

  startGame = () => {
    GameProcess({
      state: this,
      consumeTime: this.consumeTime,
    });
  };

  consumeTime = () => {
    this.#playTimes -= 1;
  };

  #isStepForward() {
    return Math.floor(Math.random() * 10) > 4 ? 1 : 0;
  }

  get carNames() {
    return Object.keys(this.#racingCarList);
  }

  get playTimes() {
    return this.#playTimes;
  }

  get racingCarList() {
    return this.#racingCarList;
  }
}
