import { CAR_MOVE_POSSIBLE_NUMBER, CAR_NAME_LENGTH_LIMIT } from '../constants';
import { getRandomInt, isMoreThanNumber } from '../utils/common';
import { checkEmptyString, checkOverStringLength } from '../validation';

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
      message: `자동차 이름은 ${CAR_NAME_LENGTH_LIMIT}자리까지 가능합니다.`,
    });

    checkEmptyString(name);
  };
}
