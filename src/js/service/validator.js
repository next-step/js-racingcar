import { ERROR_MESSAGE } from '../constants/errorMessage.js';
import { INPUT_CONDITION } from '../constants/condition.js';

export const validateCarNamesLength = (carNames) => {
  carNames.forEach((name) => {
    if (
      name.length < INPUT_CONDITION.MIN_CAR_NAME_LENGTH ||
      name.length > INPUT_CONDITION.MAX_CAR_NAME_LENGTH
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

export const validateTrialCount = (count) => {
  if (count < INPUT_CONDITION.MIN_TRIAL_COUNT) {
    throw new Error(ERROR_MESSAGE.INVALID_TRIAL_COUNT);
  }
};
