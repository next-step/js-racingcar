import racingCarName from './racingCarNameEvent.js';
import racingCount from './racingCountEvent.js';

import { selector } from '../../util/consts.js';

const Event = {
  init() {
    const carForm = selector('.racing-form');
    carForm.addEventListener('submit', (event) => event.preventDefault());

    const carNameButton = selector('.car-name-button');
    carNameButton.addEventListener('click', racingCarName.ClickEvent);

    const carNameInput = selector('.car-name-input');
    carNameInput.addEventListener('keypress', racingCarName.KeyboardEvent);
  },

  racingCountEvent(value) {
    const racingCountButton = selector('.racing-count-button');
    racingCountButton.addEventListener('click', (event) =>
      racingCount.ClickEvent(event, value)
    );

    const racingCountInput = selector('.racing-count-input');
    racingCountInput.addEventListener('keypress', (event) =>
      racingCount.KeyboardEvent(event, value)
    );
  },
};

export default Event;
