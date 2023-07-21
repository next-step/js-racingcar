import { Car } from './Car';

export class User {
  #car;

  constructor() {
    this.#car = new Car();
  }
}
