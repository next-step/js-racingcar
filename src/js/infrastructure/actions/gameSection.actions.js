import { isInteger } from '../../@helper/index.js';
import { ERROR_MESSAGE, MAX_GAME_TRY_COUNT } from '../../constants.js';

export const gameTryCountParsing = count => {
  if (!isInteger(count)) throw new Error(ERROR_MESSAGE.REQUIRED_DIGIT);

  const parsedCount = Number(count);
  if (0 >= parsedCount) throw new Error(ERROR_MESSAGE.MUST_MORE_THAN_ONE);
  if (parsedCount > MAX_GAME_TRY_COUNT)
    throw new Error(ERROR_MESSAGE.MUST_LESS_THAN_MAX_GAME_TRY_COUNT);
  return parsedCount;
};
