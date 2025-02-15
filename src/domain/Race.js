class Race {
  static ROUNDS = 5;

  #cars;
  #results;

  constructor(cars) {
    this.#cars = cars;
  }

  playRound() {
    this.#cars.forEach((car) => car.forward());
    return this.#cars.map(({ name, location }) => {
      return { name, location };
    });
  }

  static validateRoundCount(count) {
    return typeof count === "number" && Number.isInteger(count);
  }

  start(count) {
    const isValidRoundCount = Race.validateRoundCount(count);

    this.#results = Array.from({
      length: isValidRoundCount ? count : Race.ROUNDS,
    }).map(() => this.playRound());

    return this.#results;
  }

  getWinners() {
    const lastRound = this.#results[this.#results.length - 1];

    const maxLocation = Math.max(...lastRound.map((car) => car.location));
    const winners = lastRound
      .filter((car) => car.location === maxLocation)
      .map((car) => car.name);

    return winners;
  }
}

export default Race;
