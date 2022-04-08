import Controller from '../racingGameController.js';

import { selector } from '../../util/consts.js';

const racingCarName = {
  ClickEvent(event) {
    if (event.target) {
      const target = {
        input: selector('.car-name-input'),
        button: event.target,
      };
      Controller.racingCarName(target);
    }
  },

  KeyboardEvent(event) {
    if (event.target && event.key === 'Enter') {
      const target = {
        input: event.target,
        button: selector('.car-name-button'),
      };
      Controller.racingCarName(target);
    }
  },
};

export default racingCarName;
