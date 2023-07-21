import { User } from './User';

export class Model {
  #user;

  /**
   *
   * @param {User} user
   */
  constructor(user) {
    this.#user = user;
  }
}
