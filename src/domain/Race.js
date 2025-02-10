class Race {
  static ROUNDS = 5;

  #cars;

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
    return typeof count === 'number' && Number.isInteger(count);
  }

  start(count) {
    const isValidRoundCount = Race.validateRoundCount(count);

    const results = Array.from({
      length: isValidRoundCount ? count : Race.ROUNDS,
    }).map(() => this.playRound());

    return results;
  }

  get cars() {
    return this.#cars;
  }
}

export default Race;
