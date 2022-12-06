import { RacingGame } from '../service/RacingGame.js';
import { ELEMENT } from './element.js';
import { selector } from './selector.js';
import { addClass, removeClass } from './function.js';
import { getAttemtTimesInput, getCarNamesFromInput, validateAttemptTimes, validateCarNames } from './validator.js';

export const handleCarNames = () => {
  try {
    validateCarNames();
    removeClass(selector(ELEMENT.FIELD.ATTEMPT_TIMES), 'hidden');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export const handleAttemptTimes = () => {
  try {
    validateAttemptTimes();
    removeClass(selector(ELEMENT.SECTION.CAR_RACING), 'hidden');
    const game = RacingGame(getCarNamesFromInput(), getAttemtTimesInput());
    game();
    removeClass(selector(ELEMENT.SECTION.WINNER), 'hidden');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export const handlerResetGame = () => {
  try {
    selector(ELEMENT.INPUT.CAR_NAMES).value = '';
    selector(ELEMENT.INPUT.ATTEMPT_TIMES).value = '';
    addClass(selector(ELEMENT.FIELD.ATTEMPT_TIMES), 'hidden');
    addClass(selector(ELEMENT.SECTION.CAR_RACING), 'hidden');
    addClass(selector(ELEMENT.SECTION.WINNER), 'hidden');
  } catch (error) {
    alert(error.message);
  }
};
