class Racing {
  #players;

  constructor(players) {
    if (!Array.isArray(players)) {
      throw new TypeError('잘못된 형식입니다.');
    }
    this.#players = players;
  }

  getPlayerCount() {
    return this.#players.length;
  }
}

export default Racing;
