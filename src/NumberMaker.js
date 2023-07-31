import { MAX_RANDOM_NUMBER_RANGE } from './constants/index.js';

const NumberMaker = {
  createRandomNumber() {
    return Math.floor(Math.random() * MAX_RANDOM_NUMBER_RANGE);
  },
};

export default NumberMaker;
