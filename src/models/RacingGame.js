class RacingGame {
  #Cars = [];
  #racingCount = 0;
  constructor() {}

  init() {
    this.racingCount = 0;
    this.Cars = [];
  }

  get Cars() {
    return this.#Cars;
  }

  set Cars(Cars) {
    this.#Cars = Cars;
  }

  get winnerCars() {
    const movementResults = this.#Cars.map((Car) => Car.movementResult);
    const winnerMovementCount = Math.max(...movementResults);

    return this.#Cars.filter(
      (Car) => Car.movementResult === winnerMovementCount
    );
  }

  get racingCount() {
    return this.#racingCount;
  }

  set racingCount(count) {
    this.#racingCount = count;
  }
}

export default RacingGame;
