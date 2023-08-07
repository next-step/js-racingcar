import { getRandomInRange } from '../utils/getRandomInRange.js';

class Car {
  /**
   * 전진 조건.
   * 해당 값 이상이면 전진할 수 있음.
   */
  static MOVE_FORWARD_THRESHOLD = 4;

  static NAME_LENGTH = {
    MIN: 1,
    MAX: 5,
  };

  static NAME_ERROR_MESSAGE = {
    LESS_THAN_MIN: `자동차 이름은 최소 ${Car.NAME_LENGTH.MIN}글자 이상 입니다.`,
    OVER_THAN_MAX: `자동차 이름은 최대 ${Car.NAME_LENGTH.MAX}글자 입니다.`,
  };

  #name;
  #distanceDriven = 0;

  static of(name) {
    return new Car(name);
  }

  constructor(name) {
    this.validateName(name);

    this.#name = name;
  }

  validateName(name) {
    if (name.length < Car.NAME_LENGTH.MIN) {
      throw new Error(Car.NAME_ERROR_MESSAGE.LESS_THAN_MIN);
    }

    if (name.length > Car.NAME_LENGTH.MAX) {
      throw new Error(Car.NAME_ERROR_MESSAGE.OVER_THAN_MAX);
    }
  }

  getName() {
    return this.#name;
  }

  getDistanceDriven() {
    return this.#distanceDriven;
  }

  canMoveForward() {
    return getRandomInRange() >= Car.MOVE_FORWARD_THRESHOLD;
  }

  moveForward() {
    if (this.canMoveForward()) {
      this.#distanceDriven = this.#distanceDriven + 1;
    }
  }
}

export default Car;
