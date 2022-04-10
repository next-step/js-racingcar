import { htmlTemplate } from '../constants/template.js';
import { $ } from '../utils/selector.js';

export const renderAttemptCountInput = () => {
  $('#racing-attempt-fieldset').innerHTML = htmlTemplate.attemptCountInput;
  $('#car-name-input').disabled = true;
  $('#car-name-submit').disabled = true;
};

export const resetCarNameInput = () => {
  $('#car-name-input').value = '';
};
