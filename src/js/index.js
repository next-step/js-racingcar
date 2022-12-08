import { $ } from './utils/dom.js';
import { SELECTOR } from './constants/selector.js';
import { handleCarAttemptsCountSubmit, handleCarNameSubmit, handleRestartClick } from './eventHandlers/racingCar.js';

const bindEvents = () => {
  $(SELECTOR.CAR_NAME_FORM).addEventListener('submit', handleCarNameSubmit);
  $(SELECTOR.CAR_ATTEMPTS_COUNT_FORM).addEventListener('submit', handleCarAttemptsCountSubmit);
  $(SELECTOR.CAR_GAME_RESTART_BUTTON).addEventListener('click', handleRestartClick);
};

bindEvents();
