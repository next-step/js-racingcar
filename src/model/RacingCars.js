import {
  AVALIABLE_RANDOM_NUMBER,
  CAR_STATUS_SYMBOLS,
  SEPERATOR_SYMBOLS,
} from '../constants/index.js';

export class RacingCars {
  #moveStatus;

  #numberMaker;

  constructor(carNames, numberMaker) {
    this.#moveStatus = RacingCars.#initMoveStatus(carNames);
    this.#numberMaker = numberMaker;
  }

  static #initMoveStatus(carNames = []) {
    return carNames.split(SEPERATOR_SYMBOLS.COMMA).reduce((acc, cur) => {
      acc[cur] = CAR_STATUS_SYMBOLS.EMPTY;
      return acc;
    }, {});
  }

  #isMove(carName) {
    const randomNumber = this.#numberMaker.createRandomNumber(carName);
    return randomNumber >= AVALIABLE_RANDOM_NUMBER;
  }

  move() {
    Object.keys(this.#moveStatus).forEach((carName) => {
      if (this.#isMove(carName)) this.#moveStatus[carName] += CAR_STATUS_SYMBOLS.MOVE;
    });
    return this.#moveStatus;
  }
}
