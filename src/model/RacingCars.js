import NumberMaker from '../NumberMaker.js';
import {
  AVALIABLE_RANDOM_NUMBER,
  CAR_STATUS_SYMBOLS,
} from '../constants/index.js';

class RacingCars {
  #moveStatus;

  #numberMaker;

  constructor() {
    this.#moveStatus = {};
    this.#numberMaker = NumberMaker;
  }

  initMoveStatus(carNames) {
    carNames.forEach((carName) => {
      this.#moveStatus[carName] = CAR_STATUS_SYMBOLS.EMPTY;
    });
  }

  #isMove(carName) {
    const randomNumber = this.#numberMaker.createRandomNumber(carName);
    return randomNumber >= AVALIABLE_RANDOM_NUMBER;
  }

  move(carNames) {
    carNames.forEach((carName) => {
      if (this.#isMove(carName))
        this.#moveStatus[carName] += CAR_STATUS_SYMBOLS.MOVE;
    });
    return this.#moveStatus;
  }

  getCarNames() {
    return Object.keys(this.#moveStatus);
  }
}

export default RacingCars;
