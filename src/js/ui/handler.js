import { ELEMENT } from './element.js';
import { removeClass, validateCarNames } from './function.js';
import { selector } from './selector.js';

export const handleCarNames = () => {
  try {
    validateCarNames();
    removeClass(selector(ELEMENT.FIELD.ATTEMPT_TIMES), 'hidden');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};
