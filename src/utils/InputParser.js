import { CONFIG } from '../constants';
export const splitCarNameToArray = (userInput) =>
  userInput.split(CONFIG.INPUT.CAR_NAME_DELIMITER);
