import {
  CAR_MAX_LENGTH,
  CAR_MIN_LENGTH,
  ERROR_MESSAGE,
  INPUT_MESSAGE,
  SEPERATOR_SYMBOLS,
} from './constants/index.js';
import { convertStringToArray } from './utils/commons.js';
import {
  isCharacter,
  isDuplicateRacingCars,
  isIncludeSpaces,
  isInvalidLengthRacingCars,
  isNumber,
} from './utils/validate.js';

const Validator = (function Validator() {
  const validateCarNames = (userInput) => {
    const racingCars = convertStringToArray(userInput, SEPERATOR_SYMBOLS.COMMA);
    if (isIncludeSpaces(racingCars)) throw new SyntaxError(ERROR_MESSAGE.INCLUDE_EMPTY_WORDS);
    if (!isCharacter(racingCars)) throw new TypeError(ERROR_MESSAGE.AVALIABLE_CHARACTER);
    if (isInvalidLengthRacingCars(racingCars))
      throw new RangeError(ERROR_MESSAGE.INVALID_RANGE(CAR_MIN_LENGTH, CAR_MAX_LENGTH));
    if (isDuplicateRacingCars(racingCars)) throw new SyntaxError(ERROR_MESSAGE.DUPLICATE_CAR_NAMES);
  };

  const validateCount = (userInput) => {
    const count = Number(userInput);
    if (!isNumber(count)) throw new TypeError(ERROR_MESSAGE.AVALIABLE_NUMBER);
  };

  const validators = {
    [INPUT_MESSAGE.RACING_CAR]: validateCarNames,
    [INPUT_MESSAGE.COUNT]: validateCount,
  };

  return {
    check(userInput, message) {
      const validator = validators[message];
      validator(userInput);
    },
  };
})();

export default Validator;
