class RacingCarGame {
  #cars;
  #tryCount;

  constructor() {
    this.#cars = [];
    this.#tryCount = 0;
  }

  get cars() {
    return this.#cars;
  }

  get tryCount() {
    return this.#tryCount;
  }

  set cars(cars) {
    this.#cars = cars;
  }

  set tryCount(tryCount) {
    this.#tryCount = tryCount;
  }
}

export default RacingCarGame;
