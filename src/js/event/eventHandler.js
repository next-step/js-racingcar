import { isValidNames, isValidTrialCount } from '../utils/validate.js';
import { setName, setTrialCount, trimNames, splitName } from '../model/racingCar.js';
import {
  showTrialForm,
  focusNameInput,
  disabledNameInput,
  focusTrialInput,
  getNameInputValue,
  getTrialInputValue,
  disabledTrialInput,
} from '../view/main.js';

export const handleSubmitName = event => {
  event.preventDefault();
  const trimmedValue = trimNames(getNameInputValue());
  const names = splitName(trimmedValue);

  if (!isValidNames(names)) {
    focusNameInput();
    return;
  }

  setName(names);
  console.log(names);
  showTrialForm();
  disabledNameInput();
};

export const handleSubmitTrialCount = event => {
  event.preventDefault();
  const trialCount = getTrialInputValue();

  if (!isValidTrialCount(trialCount)) {
    focusTrialInput();
    return;
  }

  setTrialCount(trialCount);
  disabledTrialInput();
};
