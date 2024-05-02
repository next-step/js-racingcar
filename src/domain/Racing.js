import Car from './Car';
import { ERROR_MESSAGE } from '../constnats';
import { generateRandomNumber } from '../utils';

class Racing {
  #players;
  #maxLap;
  #winners;

  static DEFAULT_MAX_LAP = 5;

  constructor(maxLap = Racing.DEFAULT_MAX_LAP) {
    this.#players = [];
    this.#winners = [];
    this.#maxLap = maxLap;
  }

  get players() {
    return this.#players;
  }

  set players(players) {
    if (!Array.isArray(players)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    this.#players = players.map((player) => new Car(player));
  }

  get maxLap() {
    return this.#maxLap;
  }

  get winners() {
    return this.#winners;
  }

  isEndedRace() {
    return this.#getPlayersPosition().includes(this.#maxLap);
  }

  #getPlayersPosition() {
    return this.#players.map((player) => player.position);
  }

  getPlayerCount() {
    return this.#players.length;
  }

  getWinnersName() {
    return this.#winners.map((player) => player.carName);
  }

  race1Lap() {
    this.#players.forEach((player) =>
      player.forwardOrStop(generateRandomNumber(0, 9))
    );
    return this;
  }

  start() {
    while (!this.isEndedRace()) {
      this.race1Lap();
    }
    return this;
  }

  end() {
    this.#winners = this.#players.filter(
      (player) => player.position === this.#maxLap
    );
    return this;
  }
}

export default Racing;
