class Car {
  #name;

  #distance;

  constructor(name) {
    this.#name = name;
    this.#distance = 1;
  }

  get distance() {
    return this.#distance;
  }

  decideMove() {}

  move() {}
}

module.exports = Car;
