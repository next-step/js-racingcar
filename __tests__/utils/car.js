import { AVALIABLE_RANDOM_NUMBER } from '../../src/constants/index.js';

export const containsAllRacers = (str) => {
  const patterns = ['jiny', 'pobi', 'conan'];
  return patterns.every((pattern) => new RegExp(pattern).test(str));
};

export const containsAllStatus = (str) => {
  const patterns = ['jiny', 'pobi', 'conan', ':'];
  return patterns.every((pattern) => new RegExp(pattern).test(str));
};

export const MockNumberMaker = {
  createRandomNumber() {
    return AVALIABLE_RANDOM_NUMBER;
  },
};
