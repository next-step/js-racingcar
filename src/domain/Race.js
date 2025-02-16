class Race {
  static DEFAULT_ROUND_COUNT = 5;
  static ROUND_COUNT_ERROR_MESSAGE =
    "라운드 수는 0 이상의 숫자를 입력해주세요.";

  #cars;
  #results;

  static validateRoundCount(count) {
    const validRoundCount =
      typeof count === "number" && Number.isInteger(count) && count > 0;

    if (!validRoundCount) throw new Error(Race.ROUND_COUNT_ERROR_MESSAGE);
  }

  constructor(cars) {
    this.#cars = cars;
  }

  playRound(forwardCondition) {
    this.#cars.forEach((car) => {
      car.forward(forwardCondition);
    });

    return this.#cars.map(({ name, location }) => {
      return { name, location };
    });
  }

  start(roundCount, forwardCondition) {
    Race.validateRoundCount(roundCount);

    const results = Array.from({
      length: roundCount,
    }).map(() => this.playRound(forwardCondition));

    this.#results = results;

    return results;
  }

  getWinners() {
    const lastRound = this.#results.at(-1);

    const maxLocation = Math.max(...lastRound.map((car) => car.location));
    const winners = lastRound
      .filter((car) => car.location === maxLocation)
      .map((car) => car.name);

    return winners;
  }
}

export default Race;
