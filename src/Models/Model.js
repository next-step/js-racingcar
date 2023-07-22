import { Car } from './Car';

export class Model {
  #car;

  constructor(car) {
    this.#car = new Car();
  }
}
