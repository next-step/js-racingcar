import { GAME } from './constants.js';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * max + 1) + min;
};

export const moveCar = () => {
  return (
    randomNumber(GAME.MIN_MOVE_COUNT, GAME.MAX_MOVE_COUNT) >= GAME.MOVE_FLAG
  );
};

export const delay = (delay = 0) => {
  return new Promise((resolve) => {
    let startTime = new Date().getTime();

    const callback = function () {
      const currentTime = new Date().getTime();
      if (currentTime - delay > startTime) {
        resolve(true);
      } else {
        requestAnimationFrame(callback);
      }
    };
    requestAnimationFrame(callback);
  });
};
