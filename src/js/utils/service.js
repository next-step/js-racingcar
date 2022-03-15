import { ERROR_MESSAGES } from '../constants.js';
import { createRandomArray } from './utils.js';

export const validateCarName = (carName) => {
  if (carName === '') throw Error(ERROR_MESSAGES.NO_CAR_NAMES);
  if (carName.length > 5) throw Error(ERROR_MESSAGES.MAXIMUM_CAR_NAMES_LENGTH);
};

export const isForward = (num) => num >= 4;

export const createProgressArray = (tryCounts) => createRandomArray(tryCounts, 0, 9).map((number) => isForward(number));
