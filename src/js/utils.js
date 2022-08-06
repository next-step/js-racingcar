import { RANDOM_MULTIPLICATION_NUMBER } from './constants.js';

export const addHiddenClass = (selector) => {
  selector.classList.add('hidden');
};

export const removeHiddenClass = (selector) => {
  selector.classList.remove('hidden');
};

export const getRandomCount = () => {
  return Math.floor(Math.random() * RANDOM_MULTIPLICATION_NUMBER);
};
