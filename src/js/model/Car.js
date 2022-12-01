export default class Car {
  #name = '';

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}
