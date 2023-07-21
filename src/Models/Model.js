import { User } from './User';

export class Model {
  #user;

  constructor(car) {
    this.#user = new User();
  }
}
