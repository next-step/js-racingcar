import { ERROR_MESSAGE, MAX_NAME_DIGITS } from '../constants.js';
import { isDuplicatedArray } from '../helpers/index.js';

export const checkValidations = carNames => {
  const checkedLength = carNames.filter(carName => {
    if (carName.length < 1) throw new Error(ERROR_MESSAGE.REQUIRED_NAME);
    if (carName.length > MAX_NAME_DIGITS) throw new Error(ERROR_MESSAGE.MUST_LESS_THAN);
    return carName;
  });

  if (isDuplicatedArray(checkedLength)) throw new Error(ERROR_MESSAGE.NOT_ACCEPT_DUPLICATED);

  return checkedLength;
};
