import { SELECTOR } from './constants/selector.js';

import { $ } from './utils/dom.js';

import { handleCarNames, handleTrialCount } from './eventHandlers.js';

const initEvents = () => {
  $(SELECTOR.CAR_NAMES_FORM).addEventListener('submit', handleCarNames);
  $(SELECTOR.TRIAL_COUNT_FORM).addEventListener('submit', handleTrialCount);
};

initEvents();
