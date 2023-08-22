import { ERROR_MESSAGE } from '../constants/errorMessage';
import {
  CAR_MOVE_POSSIBLE_NUMBER,
  CAR_NAME_LENGTH_LIMIT,
} from '../constants/race-rule';
import { getRandomInt, isMoreThanNumber } from '../utils/common';
import { validateEmptyString, validateOverStringLength } from '../validation';

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

  move = (number, distance = 1) => {
    if (!isMoreThanNumber(number, CAR_MOVE_POSSIBLE_NUMBER)) {
      return;
    }

    this.#addDistance(distance);
  };

  #addDistance = (distance) => {
    this.#distance += distance;
  };

  #nameValidation = (name) => {
    validateOverStringLength({
      value: name,
      length: CAR_NAME_LENGTH_LIMIT,
      message: ERROR_MESSAGE.CAR_NAME_LIMIT,
    });

    validateEmptyString(name);
  };
}
