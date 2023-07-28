const { MOVE_STANDARD } = require('../constants/racing-rule.js');
const { getRandomNumber } = require('../utils.js');

class Car {
  #name;

  #distance;

  constructor(name) {
    this.#name = name;
    this.#distance = 1;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#distance;
  }

  #move() {
    this.#distance += 1;
  }

  moveByRandomNumber() {
    const randomNumber = getRandomNumber();
    const isMoved = randomNumber > MOVE_STANDARD;

    if (isMoved) this.#move();
  }
}

module.exports = Car;
