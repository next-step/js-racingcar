import Controller from '../racingGameController.js';

import { selector } from '../../util/consts.js';

const racingCount = {
  ClickEvent(event, cars) {
    if (event.target) {
      const target = {
        input: selector('.racing-count-input'),
        button: event.target,
      };
      Controller.racingCount(target, cars);
    }
  },

  KeyboardEvent(event, cars) {
    if (event.target && event.key === 'Enter') {
      const target = {
        input: event.target,
        button: selector('.racing-count-button'),
      };
      Controller.racingCount(target, cars);
    }
  },
};

export default racingCount;
