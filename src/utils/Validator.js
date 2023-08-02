import { MESSAGE, CAR, RACING_GAME } from '../constants';

/* Common Validate Functions */
const isValidLength = (value, maxLength) => value.length <= maxLength;
const isValidPattern = (value, regexPattern) => regexPattern.test(value);

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
