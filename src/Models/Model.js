import { Car } from './Car';

export class Model {
  #cars;

  constructor() {
    this.#cars = new Map();
  }

  createCarByArray(namesArray) {
    for (let name of namesArray) {
      this.#cars.set(name, new Car(name));
    }
  }
}
