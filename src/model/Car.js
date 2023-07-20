class Car {
  #name;

  #distance;

  constructor(name) {
    this.#name = name;
    this.#distance = 1;
  }

  decideMove() {}

  move() {}
}

module.exports = Car;
