import { GAME, ERROR_MESSAGE } from '../constants.js';

const tryCountValidator = {
  isEnteredTryCount: tryCount => {
    if (!tryCount) throw new Error(ERROR_MESSAGE.TRY_COUNT_REQUIRED);
  },
  isOverThanZero: tryCount => {
    if (tryCount <= GAME.TRY_COUNT_MIN_LIMIT) throw new Error(ERROR_MESSAGE.INVALID_TRY_COUNT);
  },
};

export default tryCountValidator;
