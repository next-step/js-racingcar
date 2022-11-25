import { ELEMENT } from './element.js';
import { addClass } from './function.js';
import { handleCarNames } from './handler.js';
import { selector } from './selector.js';

export const initialize = () => {
  [ELEMENT.FIELD.ATTEMPT_TIMES, ELEMENT.SECTION.CAR_RACING, ELEMENT.SECTION.WINNER].forEach((element) =>
    addClass(selector(element), 'hidden')
  );
};

export function setListeners() {
  selector(ELEMENT.BUTTON.CAR_NAME_CONFIRM).addEventListener('click', () => {
    handleCarNames();
  });
  selector(ELEMENT.INPUT.CAR_NAMES).addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleCarNames();
    }
  });
}
