import { CAR_NAME_MAX_LENGTH, errorMessages } from '../constants.js';

export default function validateCarName(name) {
  const names = name.split(',');
  const isLessThanFiveCharacters = (characters) => characters.length <= CAR_NAME_MAX_LENGTH;

  if(!names.every(isLessThanFiveCharacters) || !name) throw new Error(errorMessages.INVALID_CAR_NAMES);
}