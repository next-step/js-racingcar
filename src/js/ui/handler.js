import { ELEMENT } from './element.js';
import { removeClass } from './function.js';
import { selector } from './selector.js';
import { validateAttemptTimes, validateCarNames } from './validator.js';

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
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};
