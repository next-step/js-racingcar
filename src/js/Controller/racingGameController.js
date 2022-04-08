import Event from './Event/index.js';
import Racing from '../Model/Racing.js';

import disable from '../util/disable.js';

import renderRacingArena from '../View/Render/renderRacingArena.js';
import renderRacingGame from '../View/Render/renderRacing.js';
import renderCountForm from '../View/Render/renderCountForm.js';

import { gameOver, removeSpinner } from '../View/Render/removeSpinner.js';
import { VALIDATE } from '../util/consts.js';

const Controller = {
  racingCarName(target) {
    const { value } = target.input;

    if (Racing.validate.carNameLength(value))
      return alert(VALIDATE.ALERT_WRONG_RACING_CAR_NAME);

    disable(target);

    renderCountForm();

    Event.racingCountEvent(value);
  },

  racingCount(target, cars) {
    const { value } = target.input;

    if (Racing.validate.racingCount(value))
      return alert(VALIDATE.ALERT_LESS_RACING_COUNT);
    const racing = new Racing(cars.split(','));

    disable(target);

    renderRacingArena(cars);
    renderRacingGame(racing, Number(value));
    gameOver(value).then(removeSpinner);
  },
};

export default Controller;
