import { SELECTOR } from './constants/selector.js';

import { $ } from './utils/dom.js';

import { handleSubmitCarNames, handleSubmitTrialCount } from './eventHandlers.js';

const initEvents = () => {
  $(SELECTOR.CAR_NAMES_FORM).addEventListener('submit', handleSubmitCarNames);
  $(SELECTOR.TRIAL_COUNT_FORM).addEventListener('submit', handleSubmitTrialCount);
};

initEvents();
