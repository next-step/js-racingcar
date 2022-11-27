import { ALERT_MESSAGE, CAR_RACING } from '../service/constant.js';
import { getCarNamesArray, isEmptyNames, isMetNamesLength } from '../util/validator.js';
import { ELEMENT } from './element.js';
import { selector } from './selector.js';

const getTextFromInput = (element) => {
  return selector(element).value;
};

/**
 *
 * @returns {string[]}
 */
export const getCarNamesFromInput = () => {
  return getCarNamesArray(getTextFromInput(ELEMENT.INPUT.CAR_NAMES));
};

export const getAttemtTimesInput = () => {
  return Number(getTextFromInput(ELEMENT.INPUT.ATTEMPT_TIMES));
};

export const validateCarNames = () => {
  const { MAX_LENGTH, MIN_LENGTH } = CAR_RACING.CAR_NAMES;
  const carNames = getCarNamesFromInput();
  if (
    isEmptyNames(carNames) ||
    carNames.some((carName) => !isMetNamesLength({ name: carName, minLength: MIN_LENGTH, maxLength: MAX_LENGTH }))
  ) {
    throw new Error(ALERT_MESSAGE.INVALID.CAR_NAMES_LENGTH);
  }
};

export const validateAttemptTimes = () => {
  const attemptTimes = getAttemtTimesInput();
  if (!attemptTimes || isNaN(Number(attemptTimes))) {
    throw new Error(ALERT_MESSAGE.INVALID.ATTEMPT_TIMES);
  }
};
