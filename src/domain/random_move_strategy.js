import { isSatisfied } from './move_condition.js';

const RANDOM_BOUND = 10;

const randomNumber = () => Math.floor(Math.random() * RANDOM_BOUND);

export const movable = () => {
  const number = randomNumber();
  return isSatisfied(number);
};
