import Car from '../Car';

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
}

export default RacingGame;
