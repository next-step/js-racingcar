class WinnerChecker {
  #winningDistance = null;

  #winners = [];

  get winners() {
    return this.#winners;
  }

  addResult(cars) {
    this.#sortByDistance(cars);
  }

  #sortByDistance(cars) {
    const result = cars.slice().sort((a, b) => b.distance - a.distance);
    this.#setWinningDistance(result);
  }

  #setWinningDistance(ranking) {
    const result = ranking[0].distance;
    this.#winningDistance = result;
    this.#setWinners(ranking);
  }

  #setWinners(ranking) {
    for (let i = 0; i < ranking.length; i += 1) {
      const isWinner = ranking[i].distance === this.#winningDistance;
      if (!isWinner) break;

      this.#winners.push(ranking[i].name);
    }
  }
}

module.exports = WinnerChecker;
