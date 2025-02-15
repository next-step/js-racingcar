class Race {
  static DEFAULT_ROUND_COUNT = 5;
  static ROUND_COUNT_ERROR_MESSAGE =
    "라운드 수는 0 이상의 숫자를 입력해주세요.";

  #cars;
  #roundCount;
  #results;
  #forwardCondition;

  static validateRoundCount(count) {
    const isValid =
      typeof count === "number" && Number.isInteger(count) && count > 0;

    if (!isValid) throw new Error(Race.ROUND_COUNT_ERROR_MESSAGE);
  }

  constructor(cars, roundCount, forwardCondition) {
    this.#cars = cars;
    this.#forwardCondition = forwardCondition;

    Race.validateRoundCount(roundCount);
    this.#roundCount = roundCount;
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
