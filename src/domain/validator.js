import { MESSAGES } from '../constants/messages.js';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, SEPERATOR } from '../constants/settings.js';
import { trimString } from '../util/index.js';

export const validateNames = (names) => {
  const namesArray = names.split(SEPERATOR).map((name) => trimString(name));
  namesArray.forEach((name) => {
    validateNameMaxLength(name);
    validateNameMinLength(name);
  });
};

export const validateRound = (round) => {
  validateIsNumber(round);
};

const validateIsNumber = (round) => {
  if (isNaN(round)) {
    throw new Error(MESSAGES.ERROR.IS_NOT_NUMBER);
  }

  if (!Number.isInteger(round) || round <= 0) {
    throw new Error(MESSAGES.ERROR.IS_NOT_INTEGER_NUMBER);
  }
};
const validateNameMaxLength = (name) => {
  if (name.length > NAME_MAX_LENGTH) {
    throw new Error(MESSAGES.ERROR.MAX_NAME_LENGTH);
  }
};

const validateNameMinLength = (name) => {
  if (name.length < NAME_MIN_LENGTH) {
    throw new Error(MESSAGES.ERROR.MIN_NAME_LENGTH);
  }
};
