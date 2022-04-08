import { GAME, ERROR_MESSAGE } from '../constants.js';

const carNameValidator = {
  isEnteredCarNames: carNames => {
    if (!carNames) throw new Error(ERROR_MESSAGE.CAR_NAMES_REQUIRED);
  },
  isAllCarNamesHaveUnderFiveLetter: carNames => {
    const enteredCarNames = carNames.split(GAME.CAR_NAME_SPLITTER).map(name => name.trim());
    const carNamesUnderFiveLetters = enteredCarNames.filter(
      carName => carName.length <= GAME.CAR_NAME_MAX_LIMIT_LENGTH,
    );
    if (carNamesUnderFiveLetters.length !== enteredCarNames.length)
      throw new Error(ERROR_MESSAGE.INVALID_CAR_NAMES);
  },
};

export default carNameValidator;
