import { ELEMENT } from './element.js';
import { addClass, setClickListener, setInputEnterListener } from './function.js';
import { handleAttemptTimes, handleCarNames, handlerResetGame } from './handler.js';
import { selector } from './selector.js';

export const initialize = () => {
  [ELEMENT.FIELD.ATTEMPT_TIMES, ELEMENT.SECTION.CAR_RACING, ELEMENT.SECTION.WINNER].forEach((element) =>
    addClass(selector(element), 'hidden')
  );
};

export function setListeners() {
  // STEP1. 자동차 이름 입력
  setClickListener(ELEMENT.BUTTON.CAR_NAME_CONFIRM, handleCarNames);
  setInputEnterListener(ELEMENT.INPUT.CAR_NAMES, handleCarNames);

  // STEP2. 자동차 시도 횟수 입력
  setClickListener(ELEMENT.BUTTON.ATTEMT_TIMES_CONFIRM, handleAttemptTimes);
  setInputEnterListener(ELEMENT.INPUT.ATTEMPT_TIMES, handleAttemptTimes);

  setClickListener(ELEMENT.BUTTON.RESTART, handlerResetGame);
}
