import Racing from '../../Model/Racing.js';
import disable from '../../util/disable.js';
import renderRacingArena from '../../View/Render/renderRacingArena.js';
import renderRacingGame from '../../View/Render/renderRacing.js';

import { VALIDATE } from '../../util/consts.js';
import { gameOver, removeSpinner } from '../../View/Render/removeSpinner.js';

export const racingCountInputEvent = (function () {
  const formHandler = async (target, cars) => {
    const { value } = target.input;

    if (Racing.validate.racingCount(value))
      return alert(VALIDATE.ALERT_LESS_RACING_COUNT);
    disable(target);

    const racing = new Racing(cars.split(','));
    renderRacingArena(cars);

    renderRacingGame(racing, Number(value));

    gameOver(value).then(removeSpinner);
  };

  return {
    racingCountClickEvent(event, cars) {
      if (event.target) {
        const target = {
          input: event.target.previousElementSibling,
          button: event.target,
        };
        formHandler(target, cars);
      }
    },

    racingCountKeyboardEvent(event, cars) {
      if (event.target && event.key === 'Enter') {
        const target = {
          input: event.target,
          button: event.target.nextElementSibling,
        };
        formHandler(target, cars);
      }
    },
  };
})();
