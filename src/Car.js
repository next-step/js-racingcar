import validate from './utils/validate';

export default class Car {
  #name;

  constructor(name) {
    this.#validateCarName(name);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  #validateCarName = validate;
}
