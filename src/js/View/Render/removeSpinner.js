import { selectorAll } from '../../util/consts.js';

export const removeSpinner = () => {
  selectorAll('.spinner-component').forEach((tag) => tag.remove());
};

export const gameOver = (ms) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms);
    }, ms * 1000)
  );
};
