class RacingGame {
  #cars;
  #rounds;

  constructor(cars) {
    this.#cars = cars;
    this.#rounds = 0;
  }

  getCars() {
    return this.#cars;
  }

  getRounds() {
    return this.#rounds;
  }

  getMaxDistanceDriven() {
    return Math.max(...this.#cars.map((car) => car.getDistanceDriven()));
  }

  getWinningCars() {
    const maxDistance = this.getMaxDistanceDriven();

    return this.#cars.filter((car) => car.getDistanceDriven() === maxDistance);
  }

  runRound() {
    this.#rounds = this.#rounds + 1;

    this.#cars.forEach((car) => car.moveForward());
  }
}

export default RacingGame;
