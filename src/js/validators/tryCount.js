import { GAME, ERROR_MESSAGE } from '../constants.js';

const tryCountValidator = {
  isOverThanZero: tryCount => {
    if (tryCount <= GAME.TRY_COUNT_MIN_LIMIT) throw new Error(ERROR_MESSAGE.INVALID_TRY_COUNT);
  },
};

export default tryCountValidator;
