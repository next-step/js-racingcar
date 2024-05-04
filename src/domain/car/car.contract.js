import { ERROR_MESSAGE } from "./car.error.js";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "./car.constant.js";

export function validateCarName(name) {
  if (typeof name !== "string")
    throw new TypeError(ERROR_MESSAGE.NAME.INVALID_TYPE);

  if (name.length < NAME_MIN_LENGTH)
    throw new RangeError(ERROR_MESSAGE.NAME.REQUIRED);

  if (name.length > NAME_MAX_LENGTH)
    throw new RangeError(ERROR_MESSAGE.NAME.TOO_LONG);
}

export function validateCarPosition(position) {
  if (typeof position !== "number")
    throw new TypeError(ERROR_MESSAGE.POSITION.INVALID_TYPE);
}
