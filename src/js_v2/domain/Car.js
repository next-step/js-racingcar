import { ERROR_MESSAGE } from '../constant/index.js';
import { isLessThanNthCharacters } from '../util/isLessThanNthCharacters.js';

export default class Car {
  #name;
  #position = 0;

  constructor(name) {
    this.#name = name;
  }

  move(strategy) {
    if(!strategy) {
      this.#position = 0;
      return;
    }
    
    this.#position = 1;
  }

  validateCarName() {
    if (!this.#name || !isLessThanNthCharacters(this.#name)) throw new Error(ERROR_MESSAGE.INVALID_CAR_NAMES);
  }

  get position() {
    return this.#position;
  }

  get name() {
    return this.#name;
  }
}