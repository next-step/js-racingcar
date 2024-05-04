const ERROR_MESSAGE = {
  INVALID_TYPE: "min and max must be numbers",
  INVALID_RANGE: "min must be less than or equal to max",
};

export function generateRandomNumber(min, max) {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new TypeError(ERROR_MESSAGE.INVALID_TYPE);
  }

  if (min > max) {
    throw new RangeError(ERROR_MESSAGE.INVALID_RANGE);
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
