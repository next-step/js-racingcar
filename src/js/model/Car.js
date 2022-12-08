export default class Car {
  #name = null;

  #distance = 0;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  move() {
    this.#distance += 1;
  }

  getDistance() {
    return this.#distance;
  }
}
