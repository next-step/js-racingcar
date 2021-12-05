import { GAME } from './constants.js';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * max + 1) + min;
};

export const moveCar = () => {
  return (
    randomNumber(GAME.MIN_MOVE_COUNT, GAME.MAX_MOVE_COUNT) >= GAME.MOVE_FLAG
  );
};
