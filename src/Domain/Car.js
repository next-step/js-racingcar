import CONSTANTS from '../constants/Constants';
import Validator from '../utils/Validator';

class Car {
  #name;

  #position = CONSTANTS.car.initialPosition;

  constructor(name) {
    Validator.validateCarNames(name);

    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move() {
    if (Car.getRandomNumber() >= CONSTANTS.car.move.threshold)
      this.#position += CONSTANTS.car.move.distance;
  }

  static getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}

export default Car;
