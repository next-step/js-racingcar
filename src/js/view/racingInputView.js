import TEMPLATE from '../constants/template.js';
import { $ } from '../utils/selector.js';

export const renderAttemptCountInput = () => {
  $('#racing-attempt-fieldset').innerHTML = TEMPLATE.ATTEMPT_COUNT_INPUT;
  disableInputOfCarName();
};

const disableInputOfCarName = () => {
  $('#car-name-input').disabled = true;
  $('#car-name-submit').disabled = true;
};

export const resetCarNameInput = () => {
  $('#car-name-input').value = '';
};
