import { ERROR, SETTING } from '../constants/index.js';

export const validation = (name) => {
  if (name.length > SETTING.MAX_NAME_LENGTH) {
    throw new Error(ERROR.MAX_NAME);
  }

  if (name.length < SETTING.MIN_NAME_LENGTH) {
    throw new Error(ERROR.MIN_NAME);
  }
  return name;
};
