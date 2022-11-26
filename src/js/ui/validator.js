import { ALERT_MESSAGE, CAR_RACING } from '../service/constant.js';
import { getCarNamesArray, isEmptyNames, isMetNamesLength } from '../util/validator.js';
import { ELEMENT } from './element.js';
import { selector } from './selector.js';

export const validateCarNames = () => {
  const { MAX_LENGTH, MIN_LENGTH } = CAR_RACING.CAR_NAMES;
  const carNames = getCarNamesArray(selector(ELEMENT.INPUT.CAR_NAMES).value);
  if (
    isEmptyNames(carNames) ||
    carNames.some((carName) => !isMetNamesLength({ name: carName, minLength: MIN_LENGTH, maxLength: MAX_LENGTH }))
  ) {
    throw new Error(ALERT_MESSAGE.INVALID.CAR_NAMES_LENGTH);
  }
};

export const validateAttemptTimes = () => {
  const attemptTimes = selector(ELEMENT.INPUT.ATTEMPT_TIMES).value;
  if (!attemptTimes || isNaN(Number(attemptTimes))) {
    throw new Error(ALERT_MESSAGE.INVALID.ATTEMPT_TIMES);
  }
};
