import { ALERT_MESSAGE, LENGTH } from '../constants.js';

const isCarNameValidate = (splitInputValue) => {
  return splitInputValue.forEach((item) => {
    const trimmedItem = item.split(' ').join('');
    if (trimmedItem.length === LENGTH.MIN_LENGTH || trimmedItem.length > LENGTH.MAX_LENGTH) {
      throw new Error(ALERT_MESSAGE.NOT_VALIDATE_NAME);
    }
  });
};

export { isCarNameValidate };
