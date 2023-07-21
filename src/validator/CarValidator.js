import { ERROR_MESSAGE } from '../constants/index.js';
import { isDuplicateCarNames, isValidCarNames } from '../utils/validate.js';

class CarValidator {
  static validateCarNames(carNames) {
    if (!isValidCarNames(carNames))
      throw new RangeError(ERROR_MESSAGE.MORE_FIVE_CHARACTERS);
    if (isDuplicateCarNames(carNames))
      throw new SyntaxError(ERROR_MESSAGE.DUPLICATE_CAR_NAMES);
  }
}

export default CarValidator;
