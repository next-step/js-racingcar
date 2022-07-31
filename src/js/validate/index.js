import { LENGTH } from '../constants.js';

const generateError = (message) => {
  throw new Error(message);
};

const isCarNameInputPassCondition = (splittedValue) => {
  let count = 0;
  splittedValue.forEach((item) => {
    const trimmedItem = item.split(' ').join('');
    if (trimmedItem.length === LENGTH.CAR_NAME_MIN_LENGTH || trimmedItem.length > LENGTH.CAR_NAME_MAX_LENGTH) {
      count += 1;
    }
  });

  return count === 0;
};

const isMinimumCountValidate = (carTryInputValue) => {
  return !(carTryInputValue.length === LENGTH.CAR_TRY_VALUE_MIN_LENGTH || parseInt(carTryInputValue, 10) === 0);
};

const checkValidation = (condition, message) => {
  if (!condition) {
    generateError(message);
  }
};

export { isCarNameInputPassCondition, isMinimumCountValidate, checkValidation };
