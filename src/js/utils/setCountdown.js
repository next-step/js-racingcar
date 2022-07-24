import { DELAY } from '../constants/index.js';

export default (handler, countdown) => {
  const interval = setInterval(() => {
    handler();
    // eslint-disable-next-line no-param-reassign
    countdown -= 1;

    if (countdown <= 0) {
      clearInterval(interval);
    }
  }, DELAY);
};
