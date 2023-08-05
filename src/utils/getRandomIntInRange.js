import { UTIL } from '../constants';

export const getRandomIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomIntToMovement = () => {
  return getRandomIntInRange(UTIL.RANDOM_INT_MIN, UTIL.RANDOM_INT_MAX);
};
