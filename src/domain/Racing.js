import { DEFAULT_LAP_COUNT } from '../constants';

class Racing {
  #players;
  #lapCount;

  constructor(players, lapCount = DEFAULT_LAP_COUNT) {
    if (!Array.isArray(players)) {
      throw new TypeError('잘못된 형식입니다.');
    }
    this.#players = players;
    this.#lapCount = lapCount;
  }

  getPlayerCount() {
    return this.#players.length;
  }

  getLapCount() {
    return this.#lapCount;
  }
}

export default Racing;
