import { SELECTOR } from './constants/selector.js';

import { $ } from './utils/dom.js';

import { handleCarNames } from './eventHandlers.js';

const initEvents = () => {
  $(SELECTOR.CAR_NAMES_FORM).addEventListener('submit', handleCarNames);
};

initEvents();
