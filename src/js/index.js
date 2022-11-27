import { $ } from './utils/dom.js';
import { SELECTOR } from './constants/selector.js';
import { handleCarAttemptsCountSubmit, handleCarNameSubmit } from './eventHandlers/racing-car.js';

const bindEvents = () => {
  $(SELECTOR.CAR_NAME_FORM).addEventListener('submit', handleCarNameSubmit);
  $(SELECTOR.CAR_ATTEMPTS_COUNT_FORM).addEventListener('submit', handleCarAttemptsCountSubmit);
};

bindEvents();
