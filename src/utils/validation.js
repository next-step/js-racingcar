import { ERROR_MESSAGES } from "../constants.js";

export const validateNameLength = ($name) => {
  if ($name.length > 5) {
    throw ERROR_MESSAGES.WORD_LENGTH_ERROR;
  }
};

export const validateNumRange = ($num) => {
  if ($num > 10 || $num < 1) {
    throw ERROR_MESSAGES.NUM_RANGE_ERROR;
  }
};
