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

  getPlayerPosition() {
    return this.#players.map((player) => player.getPosition());
  }

  race() {
    return this.#players.map((player) => player.forward());
  }

  isEndedRace() {
    return this.getPlayerPosition().includes(this.#lapCount);
  }

  start() {
    while (!this.isEndedRace()) {
      this.race();
    }
    this.#winners = this.getPlayerPosition();
    return this;
  }

  getWinners() {
    return this.#winners;
  }
}

export default Racing;
