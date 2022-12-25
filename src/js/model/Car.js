export default class Car {
  #name = null;

  #distance = 0;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }

  move() {
    this.#distance += 1;
  }
}
