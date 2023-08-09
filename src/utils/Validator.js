import { MESSAGE, CAR, RACING_GAME } from '../constants';

/* Common Validate Functions */
const isValidLength = (value, maxLength) => value.length <= maxLength;
const isValidPattern = (value, regexPattern) => regexPattern.test(value);
const isEmptyString = (string) => string === '';
const isDuplicatedItemInArray = (array) => new Set(array).size !== array.length;

export const Validation = {
  /* Car Names */
  // Model
  validateCarName(name) {
    if (!isValidLength(name, CAR.MAX_NAME_LENGTH))
      throw new Error(MESSAGE.ERROR.LENGTH_OVERFLOW(CAR.MAX_NAME_LENGTH));
  },

  // Controller
  validateCarNameInput(namesArray) {
    if (isDuplicatedItemInArray(namesArray))
      throw new Error(MESSAGE.ERROR.DUPLICATED_CAR_NAME);
  },

  /* Total Rounds */
  validateTotalRounds(totalRounds) {
    if (!isValidPattern(totalRounds, RACING_GAME.REGEX.TOTAL_ROUND))
      throw new Error(
        MESSAGE.ERROR.INVALID_TYPE(MESSAGE.ERROR.INVALID_TOTAL_ROUND)
      );
  },

  /* Input */
  validateInput(input) {
    if (isEmptyString(input)) throw new Error('빈 문자열은 허용되지 않습니다.');
  },
};
