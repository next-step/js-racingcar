import CONSTANTS from '../constants/Constants';
import Random from '../utils/Random';
import Validator from '../utils/Validator';

class Car {
  #name;

  #position;

  constructor(name) {
    Validator.validateCarNames(name);

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
    const randomNumber = Random.getRandomNumber(
      CONSTANTS.car.move.minNumber,
      CONSTANTS.car.move.maxNumber,
    );

    if (randomNumber >= CONSTANTS.car.move.threshold)
      this.#position += CONSTANTS.car.move.distance;
  }
}

export default Car;
