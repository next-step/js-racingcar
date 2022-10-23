import { errorMessages } from '../constants.js';

export default function validateCarName(name) {
  const names = name.split(',');
  const isLessThanFiveCharacters = (characters) => characters.length <= 5;

  if(!names.every(isLessThanFiveCharacters) || !name) throw new Error(errorMessages.INVALID_CAR_NAMES);
}