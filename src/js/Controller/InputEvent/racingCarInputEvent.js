import Racing from '../../Model/Racing.js';
import renderCountForm from '../../View/Render/renderCountForm.js';
import disable from '../../util/disable.js';

import { VALIDATE } from '../../util/consts.js';
import { racingCountEvent } from './index.js';

export const racingCarInputEvent = (function () {
  const formHandler = (target) => {
    const { value } = target.input;

    if (Racing.validate.carNameLength(value))
      return alert(VALIDATE.ALERT_WRONG_RACING_CAR_NAME);

    disable(target);

    renderCountForm();

    racingCountEvent(value);
  };

  return {
    racingCarNameClickEvent(event) {
      if (event.target) {
        const target = {
          input: event.target.previousElementSibling,
          button: event.target,
        };
        formHandler(target);
      }
    },

    racingCarNameKeyboardEvent(event) {
      if (event.target && event.key === 'Enter') {
        const target = {
          input: event.target,
          button: event.target.nextElementSibling,
        };
        formHandler(target);
      }
    },
  };
})();
