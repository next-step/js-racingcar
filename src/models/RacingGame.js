class RacingGame {
  #cars = [];
  #racingCount = 0;
  constructor() {}

  get cars() {
    return this.#cars;
  }

  set cars(cars) {
    this.#cars = cars;
  }

  get racingCount() {
    return this.#racingCount;
  }

  set racingCount(count) {
    this.#racingCount = count;
  }
}

export default RacingGame;
