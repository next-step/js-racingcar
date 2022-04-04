import { CAR_NAME, MIN_RACE_TIMES } from './constants/validation.js';
import { ALERT_MESSAGES } from './constants/alertMessages.js';

export const validateCarNames = (carNames) => {
  if (carNames.some((carName) => carName.length > CAR_NAME.MAX_LENGTH || carName.length < CAR_NAME.MIN_LENGTH)) {
    throw new Error(ALERT_MESSAGES.INVALID_CAR_NAMES);
  }
};

export const validateRaceTimes = (raceTimes) => {
  if (raceTimes < MIN_RACE_TIMES) {
    throw new Error(ALERT_MESSAGES.INVALID_RACE_TIEMS);
  }
};
