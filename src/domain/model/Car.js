const validator = require('../../validator.js');
const { MOVE_STANDARD, MOVING_DISTANCE_PER_ROUND } = require('../../constants/racing-rule.js');

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

  move(power) {
    if (power >= MOVE_STANDARD) {
      this.#distance += MOVING_DISTANCE_PER_ROUND;
    }
  }
}

module.exports = Car;
