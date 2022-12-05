import { ALERT_MESSAGE, CAR_RACING } from '../service/constant.js';
import { getCarNamesArray, isContainEmptyNames, isDuplicatedCarNames, isMetNamesLength } from '../util/validator.js';
import { ELEMENT } from './element.js';
import { selector } from './selector.js';

/**
 *
 * @returns {string[]}
 */
export const getCarNamesFromInput = () => {
  return getCarNamesArray(selector(ELEMENT.INPUT.CAR_NAMES).value);
};

export const getAttemtTimesInput = () => {
  return selector(ELEMENT.INPUT.ATTEMPT_TIMES).valueAsNumber;
};

export const validateCarNames = () => {
  const { MAX_LENGTH, MIN_LENGTH } = CAR_RACING.CAR_NAMES;
  const carNames = getCarNamesFromInput();
  if (
    isContainEmptyNames(carNames) ||
    carNames.some((carName) => !isMetNamesLength({ name: carName, minLength: MIN_LENGTH, maxLength: MAX_LENGTH }))
  ) {
    throw new Error(ALERT_MESSAGE.INVALID.CAR_NAMES_LENGTH);
  }
  if (isDuplicatedCarNames(carNames)) {
    throw new Error(ALERT_MESSAGE.INVALID.DUPLICATED_CAR_NAMES);
  }
};

export const validateAttemptTimes = () => {
  const attemptTimes = getAttemtTimesInput();
  if (!attemptTimes || attemptTimes < CAR_RACING.ATTEMPT_TIMES.MIN) {
    throw new Error(ALERT_MESSAGE.INVALID.ATTEMPT_TIMES);
  }
};
