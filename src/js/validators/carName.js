import { GAME, ERROR_MESSAGE } from '../constants.js';

export default {
  isEnteredCarNames: carNames => {
    if (!carNames) throw new Error(ERROR_MESSAGE.CAR_NAMES_REQUIRED);
  },
  isAllCarNamesHaveUnderFiveLetter(carNames) {
    const enteredCarNames = carNames.split(', ');
    const carNamesUnderFiveLetters = enteredCarNames.filter(i => i.length <= GAME.NAME_LIMIT);
    if (carNamesUnderFiveLetters.length !== enteredCarNames.length)
      throw new Error(ERROR_MESSAGE.INVALID_CAR_NAMES);
  },
};
