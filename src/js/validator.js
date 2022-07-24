import { CAR_NAME_MAX_LENGTH, errorMessages } from './constants/index.js';

/**
 * @param {string} carNames
 */
export const validateCarNames = (carNames) => {
  const errorCount = carNames
    .split(',')
    .filter(
      (carName) =>
        carName.trim().length === 0 ||
        carName.trim().length > CAR_NAME_MAX_LENGTH
    ).length;

  if (errorCount > 0) {
    throw new Error(errorMessages.INVALID_CAR_NAMES);
  }
};

/**
 * @param {number | string} carNames
 */
export const validateCoin = (value) => {
  const coin = Number(value);

  if (!coin || typeof coin !== 'number') {
    throw new Error(errorMessages.INVALID_COIN);
  }
};
