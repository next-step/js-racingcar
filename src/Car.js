import { ERROR_MESSAGE } from './constants/message.js';

export default class Car {
  #position = 0;
  #name;

  constructor(name) {
    this.#name = this.#validateCarName(name);
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  set position(position) {
    throw new Error(ERROR_MESSAGE.POSITION_INPUT);
  }

  #validateCarName(name) {
    if (!name || name.trim() === '' || name.trim().length > 5) {
      throw new Error(ERROR_MESSAGE.NAME_LENGTH);
    }
    return name.trim();
  }

  moveForward() {
    this.#position += 1;
  }
}
