import Car from '../Car';

class RacingGame {
  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  getCars() {
    return this.#cars;
  }
}

export default RacingGame;
