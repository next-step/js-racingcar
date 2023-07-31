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
    const winningDistance = this.#winningDistance;
    this.#winners = ranking.filter((car) => car.distance === winningDistance).map((car) => car.name);
  }

  reset() {
    this.#winners = [];
    this.#winningDistance = null;
  }
}

module.exports = WinnerChecker;
