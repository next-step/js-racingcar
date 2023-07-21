import { CAR_LENGTH_RANGE_REGEX } from '../constants/index.js';

export const isValidCarNames = (carNames) =>
  carNames.every((carName) => CAR_LENGTH_RANGE_REGEX.test(carName));

export const isDuplicateCarNames = (carNames) =>
  carNames.length !== new Set(carNames).size;
