import { ALERT_MESSAGE, LENGTH } from '../constants.js';

const isCarNameValidate = (splitInputValue) => {
  return splitInputValue.forEach((item) => {
    const trimmedItem = item.split(' ').join('');
    if (trimmedItem.length === LENGTH.MIN_LENGTH || trimmedItem.length > LENGTH.MAX_LENGTH) {
      throw new Error(ALERT_MESSAGE.NOT_VALIDATE_NAME);
    }
  });
};

const isMinimumCountValidate = (carTryInputValue) => {
  if (carTryInputValue.length === LENGTH.MIN_LENGTH || parseInt(carTryInputValue, 10) === 0) {
    throw new Error(ALERT_MESSAGE.NO_VALUE_ENTERED);
  }
};

export { isCarNameValidate, isMinimumCountValidate };
