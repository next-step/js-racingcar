import Car from './Car';
import { generateRandomNumber } from '../utils';
import ThrowMessage from '../utils/ThrowMessage';

class Racing {
  #players;
  #winners;
  #lap;
  #maxLap;

  static DEFAULT_MAX_LAP = 5;
  static INITIAL_LAP = 0;
  static MIN_LAP_LIMIT = 1;

  constructor() {
    this.#players = [];
    this.#winners = [];
    this.#lap = Racing.INITIAL_LAP;
    this.#maxLap = Racing.DEFAULT_MAX_LAP;
  }

  get players() {
    return this.#players;
  }

  set players(players) {
    new ThrowMessage(players).isArray();

    this.#players = players.map((player) => new Car(player));
  }

  get maxLap() {
    return this.#maxLap;
  }

  get winners() {
    return this.#winners;
  }

  set maxLap(maxLap) {
    new ThrowMessage(maxLap).min(Racing.MIN_LAP_LIMIT);

    this.#maxLap = maxLap;
  }

  isEndedRace() {
    return this.#lap >= this.#maxLap;
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
    this.#lap = this.#lap + 1;
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
    const winnerPosition = Math.max(...this.#getPlayersPosition());
    this.#winners = this.#players.filter(
      (player) => player.position === winnerPosition
    );
    return this;
  }
}

export default Racing;
