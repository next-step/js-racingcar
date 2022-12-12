import racingManager from '../model/racingManager.js';
import {
  showTrialForm,
  focusNameInput,
  focusTrialInput,
  updateResult,
  resetTrialForm,
  updateWinner,
  showWinner,
  showResult,
  hideResult,
  hideWinner,
  toggleDisabledName,
  resetNameForm,
  hideTrialForm,
  toggleDisabledTrial,
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
  toggleDisabledName();
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
  toggleDisabledTrial();

  const gameResult = racingManager.generateGame();
  racingManager.gameResult = gameResult;
  const winners = racingManager.getWinner();
  racingManager.winners = winners;

  updateResult(gameResult);
  showResult();
  updateWinner(winners);
  showWinner();
};

export const handleClickReset = () => {
  racingManager.resetAll();
  resetNameForm();
  toggleDisabledName();

  resetTrialForm();
  toggleDisabledTrial();
  hideTrialForm();

  updateResult(racingManager.gameResult);
  hideResult();
  updateWinner(racingManager.winners);
  hideWinner();

  focusNameInput();
};
