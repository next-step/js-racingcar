import { UTIL } from '../constants';

export const splitCarNameToArray = (userInput) =>
  userInput.split(UTIL.CAR_NAME_DELIMITER);
