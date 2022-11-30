class RacingGame {
  #Cars = [];
  #racingCount = 0;
  constructor() {}

  get Cars() {
    return this.#Cars;
  }

  set Cars(Cars) {
    this.#Cars = Cars;
  }

  get racingCount() {
    return this.#racingCount;
  }

  set racingCount(count) {
    this.#racingCount = count;
  }
}

export default RacingGame;
