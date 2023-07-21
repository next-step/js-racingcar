import { ERROR_MESSAGE } from '../constants/index.js';
import { isValidCarNames } from '../utils/validate.js';

class CarValidator {
  static validateCarNames(carNames) {
    if (!isValidCarNames(carNames))
      throw new RangeError(ERROR_MESSAGE.MORE_FIVE_CHARACTERS);
  }
}

export default CarValidator;
