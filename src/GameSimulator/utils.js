import { CAR_NAME_ERROR_MESSAGE, CAR_NAME_LENGTH } from './constants.js';

export const validateCarName = (carName) => {
  if (carName.length <= CAR_NAME_LENGTH.MIN) {
    throw new Error(CAR_NAME_ERROR_MESSAGE.LESS_THAN_MIN);
  }

  if (carName.length > CAR_NAME_LENGTH.MAX) {
    throw new Error(CAR_NAME_ERROR_MESSAGE.OVER_THAN_MAX);
  }
};
