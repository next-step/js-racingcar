import { DEFAULT_LAP_COUNT } from '../constants';
import Car from './Car';

class Racing {
  #players;
  #lapCount;
  #winners;

  constructor(lapCount = DEFAULT_LAP_COUNT) {
    this.#players = [];
    this.#lapCount = lapCount;
  }

  isEndedRace() {
    return this.#getPlayersPosition().includes(this.#lapCount);
  }

  endRace() {
    this.#winners = this.#players.filter(
      (player) => player.getPosition() === this.#lapCount
    );
  }

  #getPlayersPosition() {
    return this.#players.map((player) => player.getPosition());
  }

  getPlayers() {
    return this.#players;
  }

  setPlayers(players) {
    if (!Array.isArray(players)) {
      throw new TypeError('잘못된 형식입니다.');
    }
    this.#players = players.map((player) => new Car(player));
  }

  getPlayerCount() {
    return this.#players.length;
  }

  getLapCount() {
    return this.#lapCount;
  }

  getWinners() {
    return this.#winners;
  }

  getWinnerNames() {
    return this.#winners.map((player) => player.getName());
  }

  race() {
    this.#players.forEach((player) => player.forward());
  }

  start() {
    while (!this.isEndedRace()) {
      this.race();
    }

    this.endRace();
    return this;
  }
}

export default Racing;
