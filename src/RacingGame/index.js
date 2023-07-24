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
    let maxDistanceDriven = 0;

    this.#cars.forEach((car) => {
      if (car.getDistanceDriven() > maxDistanceDriven) {
        maxDistanceDriven = car.getDistanceDriven();
      }
    });

    return maxDistanceDriven;
  }

  getWinningCars() {
    return this.#cars.filter(
      (car) => car.getDistanceDriven() === this.getMaxDistanceDriven()
    );
  }

  runRound() {
    this.#rounds = this.#rounds + 1;
  }
}

export default RacingGame;
