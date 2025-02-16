class InvalidRoundCountException extends Error {
  constructor(minCount, maxCount) {
    const message = `라운드 수는 ${minCount} 이상 ${maxCount} 이하의 숫자를 입력해주세요.`;
    super(message);
  }
}

class Race {
  static MIN_ROUND_COUNT = 1;
  static MAX_ROUND_COUNT = 10;

  #cars = [];
  #results = [];

  static validateRoundCount(count) {
    const validRoundCount =
      typeof count === "number" &&
      Number.isInteger(count) &&
      count >= Race.MIN_ROUND_COUNT &&
      count <= Race.MAX_ROUND_COUNT;

    if (!validRoundCount)
      throw new InvalidRoundCountException(
        Race.MIN_ROUND_COUNT,
        Race.MAX_ROUND_COUNT
      );
  }

  constructor(cars) {
    this.#cars = cars;
  }

  #playRound(forwardCondition) {
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
    }).map(() => this.#playRound(forwardCondition));

    this.#results = [...this.#results, ...results];

    return this.#results.map((round) => round.map((car) => ({ ...car })));
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
