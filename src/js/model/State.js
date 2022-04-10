import GameConfiguration from './GameConfiguration.js';

export default class State {
  static instance;
  #gameConfiguration;

  constructor() {
    this.#gameConfiguration = GameConfiguration.createGameConfiguration();
  }

  static getInstance() {
    if (!this.instance) this.instance = new State();
    return this.instance;
  }

  setGames = () => {
    this.#gameConfiguration.makePlayResult();
  };

  get updateGameConfiguration() {
    return {
      updateCarNames: this.#gameConfiguration.updateCarNames,
      updatePlayTimes: this.#gameConfiguration.updatePlayTimes,
    };
  }

  get consumeTime() {
    return this.#gameConfiguration.consumeTime;
  }

  get gameProcessState() {
    return {
      leftPlayTime: this.#gameConfiguration.playTimes,
      carNames: this.#gameConfiguration.carNames,
      racingCarList: this.#gameConfiguration.racingCarList,
    };
  }
}
