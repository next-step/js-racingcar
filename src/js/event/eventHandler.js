import { isValidNames, isValidTrialCount } from '../utils/validate.js';
import racingManager from '../model/racingCar.js';
import {
  showTrialForm,
  focusNameInput,
  disabledNameForm,
  focusTrialInput,
  disabledTrialForm,
  showResult,
  updateResult,
} from '../view/main.js';

export const handleSubmitName = event => {
  event.preventDefault();
  const { value: nameInputValue } = event.target.elements['car-name'];
  const trimmedValue = racingManager.trimNames(nameInputValue);
  const names = racingManager.splitName(trimmedValue);

  if (!isValidNames(names)) {
    focusNameInput();
    return;
  }

  racingManager.setName(names);
  disabledNameForm();
  showTrialForm();
};

export const handleSubmitTrialCount = event => {
  event.preventDefault();
  const trialCount = Number(event.target.elements['trial-count'].value);

  if (!isValidTrialCount(trialCount)) {
    focusTrialInput();
    return;
  }

  racingManager.setTrialCount(trialCount);
  disabledTrialForm();

  const gameResult = racingManager.generateGame();
  racingManager.setGameResult(gameResult);
  updateResult(gameResult);
  showResult();
};
