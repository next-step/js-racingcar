import { MESSAGE, CAR, RACING_GAME } from '../constants';

/* Common Validate Functions */
const isValidLength = (value, maxLength) => {
  if (value.length <= maxLength) return true;

  return false;
};

const isValidPattern = (value, regexPattern) => {
  return regexPattern.test(value);
};

/* Car Names */
export const validateCarName = (name) => {
  if (!isValidLength(name, CAR.MAX_NAME_LENGTH))
    throw new Error(MESSAGE.ERROR.LENGTH_OVERFLOW(CAR.MAX_NAME_LENGTH));
};

/* Total Rounds */
export const validateTotalRounds = (totalRounds) => {
  if (!isValidPattern(totalRounds, RACING_GAME.TOTAL_ROUND.VALID_PATTERN))
    throw new Error(
      MESSAGE.ERROR.INVALID_TYPE(RACING_GAME.TOTAL_ROUND.VALID_TYPE)
    );
};
