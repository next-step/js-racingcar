import { TRIM_BETWEEN_COMMA } from './utils/constants.js';
import { checkValidNames } from './utils/validate.js';
import { $ } from './utils/selector.js';
import { setState } from './model/model.js';

$('#car-name-submit-btn').addEventListener('click', event => {
  event.preventDefault();
  const inputName = $('#car-name-input').value;
  const trimInputNames = inputName.replace(TRIM_BETWEEN_COMMA, ',');
  const carNames = trimInputNames.split(',');
  if (checkValidNames(carNames) === true) {
    setState(carNames);
    $('#set-trial-container').classList.remove('hide');
  } else {
    $('#car-name-input').focus();
  }
});
