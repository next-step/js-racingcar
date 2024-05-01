import CONSTANTS from '../constants/Constants.js';
import Validator from '../utils/Validator.js';

class Car {
  #name;

  #position;

  constructor(name) {
    Validator.validateCarName(name);

    this.#name = name;
    this.#position = CONSTANTS.car.initialPosition;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move() {
    this.#position += CONSTANTS.car.move.distance;
  }
}

export default Car;
