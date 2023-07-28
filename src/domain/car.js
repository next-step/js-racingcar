import { CAR_MOVE_POSSIBLE_NUMBER, CAR_NAME_LENGTH_LIMIT } from '../constants';
import { getRandomInt, isMoreThanNumber } from '../utils/common';
import { checkEmptyString, checkOverStringLength } from '../validation';
import { ERROR_MESSAGE } from '../validation/errorMessage';

export default class Car {
  #name;
  #distance = 0;

  constructor(name) {
    this.#nameValidation(name);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#distance;
  }

  runOneLap() {
    const randomInt = getRandomInt(10);
    this.move(randomInt);
  }

  move = (number) => {
    if (!isMoreThanNumber(number, CAR_MOVE_POSSIBLE_NUMBER)) {
      return;
    }

    this.#addDistance();
  };

  #addDistance = () => {
    this.#distance += 1;
  };

  #nameValidation = (name) => {
    checkOverStringLength({
      value: name,
      length: CAR_NAME_LENGTH_LIMIT,
      message: ERROR_MESSAGE.CAR_NAME_LIMIT,
    });

    checkEmptyString(name);
  };
}
