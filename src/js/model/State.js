import GameProcess from '../components/GameProcess.js';
import GameConfiguration from './GameConfiguration.js';
export default class State {
  static instance;
  #gameConfiguration;

  static getInstance() {
    if (!this.instance) this.instance = new State();
    return this.instance;
  }

  setGames = ({ carNames, playTimes }) => {
    this.#gameConfiguration = GameConfiguration.createGameConfiguration({
      carNames,
      playTimes,
    });

    this.startGame();
  };

  startGame = () => {
    GameProcess({
      state: this,
      consumeTime: this.consumeTime,
    });
  };

  get consumeTime() {
    return this.#gameConfiguration.consumeTime;
  }

  get consumeTime() {
    return this.#gameConfiguration.consumeTime;
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
