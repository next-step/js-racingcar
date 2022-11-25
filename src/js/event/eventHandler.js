import { isValidNames, isValidTrialCount } from '../utils/validate.js';
import { $ } from '../utils/selector.js';
import { setName, setTrialCount, trimInput, splitName } from '../model/racingcar.js';
import { showTrialForm, focusInput, disableInput } from '../view/main.js';

export const onSubmitName = event => {
  event.preventDefault();
  const inputValue = $('.car-name-input').value;
  const trimmedValue = trimInput(inputValue);
  const names = splitName(trimmedValue);

  if (isValidNames(names) === false) {
    focusInput($('.car-name-input'));
    return;
  }

  setName(names);
  console.log(names);
  showTrialForm();
  disableInput();
};

export const onSubmitTrialCount = event => {
  event.preventDefault();
  const trialCount = Number($('.trial-input').value);
  console.log(trialCount);

  if (isValidTrialCount(trialCount) === false) {
    focusInput($('.trial-input'));
    return;
  }

  setTrialCount(trialCount);
};
