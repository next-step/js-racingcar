import { AVALIABLE_RANDOM_NUMBER } from '../constants/randomNumber.js';
import { CAR_STATUS_SYMBOLS } from '../constants/view.js';
import { SEPERATOR_SYMBOLS } from '../constants/commons.js';
import { ERROR_MESSAGE } from '../constants/message.js';
import {
  isCharacter,
  isDuplicateRacingCars,
  isIncludeSpaces,
  isInvalidLengthRacingCars,
} from '../utils/validate.js';
import { CAR_MAX_LENGTH, CAR_MIN_LENGTH } from '../constants/validate.js';
import { NumberMaker } from '../NumberMaker.js';

export class RacingCars {
  #moveStatus;

  #numberMaker;

  constructor(carNames, numberMaker) {
    RacingCars.#validateCarNames(carNames);
    this.#init(carNames, numberMaker);
  }

  static #validateCarNames(carNames) {
    const racingCars = carNames.split(SEPERATOR_SYMBOLS.COMMA);
    if (isIncludeSpaces(racingCars)) throw new SyntaxError(ERROR_MESSAGE.INCLUDE_EMPTY_WORDS);
    if (!isCharacter(racingCars)) throw new TypeError(ERROR_MESSAGE.AVALIABLE_CHARACTER);
    if (isInvalidLengthRacingCars(racingCars))
      throw new RangeError(ERROR_MESSAGE.INVALID_RANGE(CAR_MIN_LENGTH, CAR_MAX_LENGTH));
    if (isDuplicateRacingCars(racingCars)) throw new SyntaxError(ERROR_MESSAGE.DUPLICATE_CAR_NAMES);
  }

  #init(carNames, numberMaker = NumberMaker) {
    this.#moveStatus = carNames.split(SEPERATOR_SYMBOLS.COMMA).reduce((acc, cur) => {
      acc[cur] = CAR_STATUS_SYMBOLS.EMPTY;
      return acc;
    }, {});
    this.#numberMaker = numberMaker;
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
