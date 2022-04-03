import { CAR_NAME } from './constants/validation.js';
import { ALERT_MESSAGES } from './constants/alertMessages.js';

export const validateCarNames = (carNames) => {
  if (carNames.some((carName) => carName.length > CAR_NAME.MAX_LENGTH || carName.length < CAR_NAME.MIN_LENGTH)) {
    throw new Error(ALERT_MESSAGES.INVALID_CAR_NAMES);
  }
};
