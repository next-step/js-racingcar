const validator = require('../validator.js');
const { MOVE_STANDARD } = require('../constants/racing-rule.js');
const { getRandomNumber } = require('../utils.js');

class Car {
  #name;

  #distance = 1;

  constructor(name) {
    validator.checkValidCarName(name);
    this.#name = name;
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
    const isMoved = randomNumber >= MOVE_STANDARD;

    if (isMoved) this.#move();
  }
}

module.exports = Car;
