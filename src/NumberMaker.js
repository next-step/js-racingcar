import { MAX_RANDOM_NUMBER_RANGE } from './constants/randomNumber.js';

export const NumberMaker = {
  createRandomNumber() {
    return Math.floor(Math.random() * MAX_RANDOM_NUMBER_RANGE);
  },
};
