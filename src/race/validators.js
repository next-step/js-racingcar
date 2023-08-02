import { ERROR_MESSAGE } from '../constants/index';
import { isMaximumLength, isMinimumLength, isString, isDuplicateArray, isFunction } from '../utils/index';

const {
  NOT_RECEIVED_CAR_NAME,
  CAR_NAME_INCORRECT_LENGTH,
  CAR_NAME_NOT_STRING,
  DUPLICATE_CAR,
  NOT_RECEIVED_FUNCTION,
  NOT_RECEIVED_INPUT
} = ERROR_MESSAGE;

export const validateCarNameType = (carName) => {
  if (!isString(carName)) {
    throw new Error(CAR_NAME_NOT_STRING);
  }
};

export const validateCarName = (carName, boundaries) => {
  const { min, max } = boundaries;

  if (!isMinimumLength(carName.trim(), min)) {
    throw new Error(NOT_RECEIVED_CAR_NAME);
  }

  if (!isMaximumLength(carName.trim(), max)) {
    throw new Error(CAR_NAME_INCORRECT_LENGTH);
  }
};

export const validateDuplicateCars = (cars) => {
  if (isDuplicateArray(cars)) {
    throw new Error(DUPLICATE_CAR);
  }
};

export const validatePromptListenerType = (listener) => {
  if (!isFunction(listener)) {
    throw new Error(NOT_RECEIVED_FUNCTION);
  }
};

export const validateInputMessage = (input) => {
  if (!input.trim()) {
    throw new Error(NOT_RECEIVED_INPUT);
  }
};
