import { ERROR_MESSAGE } from '../constants/errorMessage.js';
import { RACING_CAR } from '../constants/racingCar.js';

export const isMoveForwardNumber = (num) => {
  return num >= RACING_CAR.STANDARD_MOVE_FORWARD_NUMBER;
};

const isLessThanOrEqualToLengthInArray = (value, length) => {
  if (!Array.isArray(value)) return;

  return value.every((elem) => elem.length <= length);
};

const hasZeroElementLengthInArray = (value) => {
  if (!Array.isArray(value)) return;

  return value.some((elem) => elem.length === 0);
};

const validate = (predicate, message) => {
  if (!predicate) {
    throw new Error(message);
  }
};

export const validateCarName = (carName) => {
  validate(
    isLessThanOrEqualToLengthInArray(carName, RACING_CAR.NAME_LENGTH_LIMIT),
    ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH,
  );

  validate(!hasZeroElementLengthInArray(carName), ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
};

export const validateCarAttemptsCount = (count) => {
  validate(count >= RACING_CAR.MIN_ATTEMPTS_COUNT, ERROR_MESSAGE.INVALID_CAR_ATTEMPTS_COUNT);
};
