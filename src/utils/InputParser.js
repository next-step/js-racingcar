import { CONFIG } from '../constants';
export const splitCarNameToArray = (userInput) =>
  userInput.split(CONFIG.CAR_NAME_DELIMITER);
