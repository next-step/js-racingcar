import { UTIL } from '../constants';

export const splitCarNameToArray = (userInput) =>
  userInput.split(UTIL.CAR_NAME_DELIMITER);

export const getRacingResult = (name, distance) => {
  const repeatedDistanceSymbol = UTIL.DISTANCE_SYMBOL.repeat(distance);

  return `${name} : ${repeatedDistanceSymbol}`;
};
