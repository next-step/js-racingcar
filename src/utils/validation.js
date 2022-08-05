import { ERROR_MESSAGES } from "./constants/messages.js";

class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error";
  }
}

class NameLengthError extends Error {
  constructor(message) {
    super(message);
    this.name = "NameLengthError";
  }
}

class NumRangeError extends Error {
  constructor(message) {
    super(message);
    this.name = "NumRangeError";
  }
}

export const validateNameLength = ($name) => {
  if ($name.length > 5) {
    throw new NameLengthError(ERROR_MESSAGES.WORD_LENGTH_ERROR);
  }
};

export const validateNumRange = ($num) => {
  if ($num > 10 || $num < 1) {
    throw new NumRangeError(ERROR_MESSAGES.NUM_RANGE_ERROR);
  }
};
