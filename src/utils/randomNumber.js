const ERROR_MESSAGE = {
  INVALID_TYPE: "최소값과 최대값은 숫자여야 합니다",
  INVALID_RANGE: "최소값은 최대값보다 작거나 같아야 합니다",
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
