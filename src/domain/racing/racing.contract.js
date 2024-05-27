import { ERROR_MESSAGE } from "./racing.error.js";

export function validateTotalRounds(totalRounds) {
  if (isNaN(totalRounds) || typeof totalRounds !== "number") {
    throw new TypeError(ERROR_MESSAGE.ROUND.INVALID_TYPE);
  }

  if (totalRounds <= 0) {
    throw new RangeError(ERROR_MESSAGE.ROUND.INVALID_RANGE);
  }

  return totalRounds;
}
