import Car from '../Car';

class RacingGame {
  #cars;

  constructor(carNames) {
    this.#cars = carNames.map((name) => new Car(name));
  }

  getCars() {
    return this.#cars;
  }
}

export default RacingGame;
