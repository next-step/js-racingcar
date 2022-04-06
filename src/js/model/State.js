import GameProcess from '../components/GameProcess.js';
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
    this.startGame();
  };

  startGame = () => {
    GameProcess({
      state: this,
      consumeTime: this.#gameConfiguration.consumeTime,
    });
  };

  get updateGameConfiguration() {
    return {
      updateCarNames: this.#gameConfiguration.updateCarNames,
      updatePlayTimes: this.#gameConfiguration.updatePlayTimes,
    };
  }

  get leftPlayTime() {
    return this.#gameConfiguration.playTimes;
  }

  get carNames() {
    return this.#gameConfiguration.carNames;
  }

  get racingCarList() {
    return this.#gameConfiguration.racingCarList;
  }
}
