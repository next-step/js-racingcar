class Race {
  static ROUNDS = 5;

  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  playRound() {
    this.#cars.forEach((car) => car.forward());
    return this.#cars.map((car) => car.status);
  }

  start() {
    const results = Array.from({ length: Race.ROUNDS }).map(() =>
      this.playRound()
    );

    return results;
  }

  get cars() {
    return this.#cars;
  }
}

export default Race;
