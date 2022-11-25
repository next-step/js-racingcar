import { isValidNames } from '../utils/validate.js';
import { $ } from '../utils/selector.js';
import { setName, trimInput, splitName } from '../model/model.js';
import { showTrialForm, focusInput, disableInput } from '../view/view.js';

/* eslint-disable import/prefer-default-export */

export const onNameSubmit = event => {
  event.preventDefault();
  const inputValue = $('.car-name-input').value;
  const trimmedValue = trimInput(inputValue);
  const names = splitName(trimmedValue);

  if (isValidNames(names) === false) {
    focusInput();
    return;
  }

  setName(names);
  console.log(names);
  showTrialForm();
  disableInput();
};
