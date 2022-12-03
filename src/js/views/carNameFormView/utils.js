import { CAR_NAME } from '../../const.js';

export function getTrimmedCarNames(nextCardNames) {
  return nextCardNames.replace(/ /g, '').split(CAR_NAME.SEPARATOR);
}
