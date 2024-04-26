import { DEFAULT_LAP_COUNT } from '../constants';
import Car from './Car';

class Racing {
  #players;
  #lapCount;
  #winners;

  constructor(players, lapCount = DEFAULT_LAP_COUNT) {
    if (!Array.isArray(players)) {
      throw new TypeError('잘못된 형식입니다.');
    }
    this.#players = players.map((player) => new Car(player));
    this.#lapCount = lapCount;
  }

  getPlayers() {
    return this.#players;
  }

  getPlayerCount() {
    return this.#players.length;
  }

  getLapCount() {
    return this.#lapCount;
  }

  start() {
    this.#winners = [1, 2];
    return this;
  }

  getWinners() {
    return this.#winners;
  }
}

export default Racing;
