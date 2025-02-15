class Race {
  static DEFAULT_ROUND_COUNT = 5;

  #cars;
  #roundCount;
  #results;
  #forwardCondition;

  static validateRoundCount(count) {
    return typeof count === "number" && Number.isInteger(count);
  }

  constructor(cars, roundCount, forwardCondition) {
    this.#cars = cars;
    this.#forwardCondition = forwardCondition;
    this.#roundCount = Race.validateRoundCount(roundCount)
      ? roundCount
      : Race.DEFAULT_ROUND_COUNT;
  }

  playRound() {
    this.#cars.forEach((car) => {
      car.forward(this.#forwardCondition);
    });

    return this.#cars.map(({ name, location }) => {
      return { name, location };
    });
  }

  start() {
    const results = Array.from({
      length: this.#roundCount,
    }).map(() => this.playRound());

    this.#results = results;

    return results;
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
