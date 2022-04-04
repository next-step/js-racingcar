<<<<<<< HEAD
import { CAR_NAME, MIN_RACE_TIMES } from './constants/validation.js';
import { ALERT_MESSAGES } from './constants/alertMessages.js';

export const validateCarNames = (carNames) => {
  if (carNames.some((carName) => carName.length > CAR_NAME.MAX_LENGTH || carName.length < CAR_NAME.MIN_LENGTH)) {
    throw new Error(ALERT_MESSAGES.INVALID_CAR_NAMES);
  }
};

export const validateRaceTimes = (raceTimes) => {
  if (raceTimes < MIN_RACE_TIMES || Number.isNaN(raceTimes)) {
    throw new Error(ALERT_MESSAGES.INVALID_RACE_TIEMS);
  }
};
=======
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
>>>>>>> da6b6b9 (feat: 자동차 이동횟수 입력 유효성 검사)
