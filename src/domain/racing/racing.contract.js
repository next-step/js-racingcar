import { ERROR_MESSAGE } from "./racing.error.js";

export function validateRacingRound(racingRound) {
  if (typeof racingRound !== "number") {
    throw new TypeError(ERROR_MESSAGE.ROUND.INVALID_TYPE);
  }

  if (racingRound < 0) {
    throw new RangeError(ERROR_MESSAGE.ROUND.INVALID_RANGE);
  }
}
