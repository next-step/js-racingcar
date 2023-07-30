import { RANDOM_NUMBER_NOT_EQUAL_MAX_VALUE } from '../constants/race.const.js';

export const getRaceRandomNumber = () => {
  const randomNumber = Math.floor(
    Math.random() * RANDOM_NUMBER_NOT_EQUAL_MAX_VALUE
  );
  return randomNumber;
};

