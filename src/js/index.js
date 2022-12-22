import { SELECTOR } from './constants/selector.js';

import { $ } from './utils/dom.js';

import {
  handleSubmitCarNames,
  handleSubmitTrialCount,
  handleRestartGame,
} from './eventHandlers.js';

const initEvents = () => {
  $(SELECTOR.CAR_NAMES_FORM).addEventListener('submit', handleSubmitCarNames);
  $(SELECTOR.TRIAL_COUNT_FORM).addEventListener('submit', handleSubmitTrialCount);
  $(SELECTOR.RESTART_GAME_BTN).addEventListener('click', handleRestartGame);
};

initEvents();
