import Validator from '../utils/Validator';

class RacingGame {
  #cars;

  #round;

  #winners;

  constructor(cars) {
    Validator.validateInputData(cars);

    this.#cars = cars;
    this.#round = 0;
  }

  get cars() {
    return this.#cars;
  }

  get round() {
    return this.#round;
  }

  get winners() {
    return this.#winners;
  }

  start() {
    while (this.#round < 5) {
      this.#cars.forEach(car => car.move());

      this.#round += 1;
    }

    const maxValue = Math.max(...this.#cars.map(car => car.position));

    this.#winners = this.#cars.filter(car => car.position === maxValue);
  }
}

export default RacingGame;
