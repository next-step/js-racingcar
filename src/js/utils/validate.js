/* eslint-disable import/prefer-default-export */
import { ERROR_MESSAGES } from './constants.js';

const isInRange = names => names.every(name => name.length >= 1 && name.length <= 5);

export const isValidNames = names => {
  try {
    if (isInRange(names) === false) {
      throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
    }
  } catch (error) {
    alert(error.message);
    return false;
  }
  return true;
};
