import { Car } from './';

export class RacingGame {
  #cars;

  constructor(carNames) {
    this.#cars = [];
    this.#setCars(carNames);
  }

  #setCars(carNames) {
    for (let carName of carNames) this.#cars.push(new Car(carName));
  }
}
