class Race {
  static RACE_ROUNDS = 5;

  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  proceed() {
    this.#cars.forEach((car) => car.forward());
    return this.#cars.map((car) => car.status);
  }

  start() {
    let result = [];

    for (let i = 0; i < Race.RACE_ROUNDS; i++) {
      const roundResult = this.proceed();
      result.push(roundResult);
    }

    return result;
  }

  get cars() {
    return this.#cars;
  }
}

export default Race;
