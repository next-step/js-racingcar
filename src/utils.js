import { MESSAGE } from "../constants/message";

export const getRandomNumber = (min, max) => {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new TypeError(MESSAGE.INPUT_TYPE_ERROR);
  }
  if (min > max) {
    throw new Error(MESSAGE.INPUT_RANGE_ERROR);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const parseCarNames = (input) => {
  if (input === "") {
    throw new Error(MESSAGE.INPUT_LENGTH_ERROR);
  }

  return input.split(",");
};

export const parseOutput = (input) => {
  if (!Array.isArray(input)) {
    throw new Error(MESSAGE.INPUT_NOT_ARRAY_ERROR);
  }

  return input.join(",");
};
