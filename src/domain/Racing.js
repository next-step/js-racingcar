class Racing {
  #players;
  #lapCount;

  constructor(players, lapCount = 5) {
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
