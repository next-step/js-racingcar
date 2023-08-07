import { MESSAGES } from '../constants/messages.js';
import {
  ATTEMPT_MAX_NUMBER,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  ROUND_MAX_NUMBER,
  SEPERATOR,
} from '../constants/settings.js';
import { trimString } from '../util/index.js';

export const IsMaxAttempt = (attempt) => attempt > ATTEMPT_MAX_NUMBER;

export const validateNames = (names) => {
  const namesArray = names.split(SEPERATOR).map((name) => trimString(name));
  namesArray.forEach((name) => {
    validateNameMaxLength(name);
    validateNameMinLength(name);
  });
};

export const validateRound = (round) => {
  validateIsNumber(Number(round));
  validateIsNotInteger(Number(round));
  validateIsMaxNumber(Number(round));
};

const validateIsNumber = (round) => {
  if (isNaN(round)) {
    throw new Error(MESSAGES.ERROR.IS_NOT_NUMBER);
  }
};

const validateIsNotInteger = (round) => {
  if (!Number.isInteger(Number(round)) || round < 0) {
    throw new Error(MESSAGES.ERROR.IS_NOT_INTEGER_NUMBER);
  }
};

const validateIsMaxNumber = (round) => {
  if (round > ROUND_MAX_NUMBER) {
    throw new Error(MESSAGES.ERROR.IS_ROUND_MAX_NUMBER);
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
