import Car from './Car';

class Racing {
  #players;
  #maxLap;
  #winners;

  static DEFAULT_MAX_LAP = 5;

  constructor(maxLap = Racing.DEFAULT_MAX_LAP) {
    this.#players = [];
    this.#maxLap = maxLap;
  }

  isEndedRace() {
    return this.#getPlayersPosition().includes(this.#maxLap);
  }

  #getPlayersPosition() {
    return this.#players.map((player) => player.getPosition());
  }

  get players() {
    return this.#players;
  }

  set players(players) {
    if (!Array.isArray(players)) {
      throw new TypeError('잘못된 형식입니다.');
    }
    this.#players = players.map((player) => new Car(player));
  }

  getPlayerCount() {
    return this.#players.length;
  }

  get maxLap() {
    return this.#maxLap;
  }

  get winners() {
    return this.#winners;
  }

  getWinnersName() {
    return this.#winners.map((player) => player.name);
  }

  race() {
    this.#players.forEach((player) => player.forward());
  }

  start() {
    while (!this.isEndedRace()) {
      this.race();
    }
    return this;
  }

  end() {
    this.#winners = this.#players.filter(
      (player) => player.getPosition() === this.#maxLap
    );
    return this;
  }
}

export default Racing;
