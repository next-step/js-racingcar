import { MESSAGES, SETTINGS } from '../constants/index.js';

export const validateName = (name) => {
  checkMaxNameLength(name);
  checkMinNameLength(name);
  return name;
};

const checkMaxNameLength = (name) => {
  if (name.length > SETTINGS.MAX.NAME_LENGTH) {
    throw new Error(MESSAGES.ERROR.MAX_NAME_LENGTH);
  }
};

const checkMinNameLength = (name) => {
  if (name.length < SETTINGS.MIN.NAME_LENGTH) {
    throw new Error(MESSAGES.ERROR.MIN_NAME_LENGTH);
  }
};
