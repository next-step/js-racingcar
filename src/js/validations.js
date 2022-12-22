import { CAR_NAME, CAR_RACE, ERROR_MESSAGE } from './constant.js';
import {
  duplicatedName,
  isInvalidMinNumber,
  isInValidName,
} from './utils/validator.js';

export const nameValidations = [
  (value) => {
    const isInvalid = isInValidName(value, CAR_NAME.MIN, CAR_NAME.MAX);
    if (isInvalid) {
      throw new Error(ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
    }
  },
  (value) => {
    const isInvalid = duplicatedName(value);
    if (isInvalid) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_CAR_NAME);
    }
  },
];

export const trialTimesValidations = [
  (value) => {
    const isInvalid = isInvalidMinNumber(value, CAR_RACE.MIN_TIMES);
    if (isInvalid) {
      throw new Error(ERROR_MESSAGE.INVALID_TRIAL_NUMBER);
    }
  },
];
