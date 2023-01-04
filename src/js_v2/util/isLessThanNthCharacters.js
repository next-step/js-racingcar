import { CAR_NAME_MAX_LENGTH } from '../../js/constants';

export function isLessThanNthCharacters(character) {
  return character.length <= CAR_NAME_MAX_LENGTH;
}