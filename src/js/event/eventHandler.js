import racingManager from '../model/racingcar.js';

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

  if (!racingManager.isValidNames(names)) {
    focusNameInput();
    return;
  }

  racingManager.names = names;
  disabledNameForm();
  showTrialForm();
};

export const handleSubmitTrialCount = event => {
  event.preventDefault();
  const trialCount = Number(event.target.elements['trial-count'].value);

  if (!racingManager.isValidTrialCount(trialCount)) {
    focusTrialInput();
    return;
  }

  racingManager.trialCount = trialCount;
  disabledTrialForm();

  const gameResult = racingManager.generateGame();
  racingManager.gameResult = gameResult;
  updateResult(gameResult);
  showResult();
};
