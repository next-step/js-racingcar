import { ERROR_MESSAGE } from '../constants/errorMessage.js';
import { CONDITION } from '../constants/condition.js';

export const validateCarNamesLength = (carNames) => {
  carNames.forEach((name) => {
    if (
      name.length < CONDITION.MIN_CAR_NAME_LENGTH ||
      name.length > CONDITION.MAX_CAR_NAME_LENGTH
    ) {
      throw new Error(ERROR_MESSAGE.INVALID_CAR_NAMES_LENGTH);
    }
  });
};

export const validateDuplicatedCarName = (carNames) => {
  if (new Set(carNames).size < carNames.length) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_CAR_NAME);
  }
};
