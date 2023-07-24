class RacingGame {
  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  getCars() {
    return this.#cars;
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
}

export default RacingGame;
