import gameSetting from './model/GameSetting.js';

import {
  validateCarNamesLength,
  validateDuplicatedCarName,
  validateTrialCount,
  ValidationError,
} from './service/validator.js';
import { startGame } from './service/game.js';

import {
  disableCarNamesForm,
  disableTrialCountForm,
  enableCarNamesForm,
  enableTrialCountForm,
  focusTrialCountInput,
  hideTrialCountForm,
  resetCarNamesForm,
  resetTrialCountForm,
  showTrialCountForm,
} from './view/gameSettingForm.js';
import { hideGamePlay } from './view/playGame.js';
import { hideGameResult } from './view/gameResult.js';

export const handleSubmitCarNames = (e) => {
  e.preventDefault();
  try {
    const $carNames = e.target.elements[0];
    gameSetting.setNames($carNames);

    const carNames = gameSetting.getNames();

    validateCarNamesLength(carNames);
    validateDuplicatedCarName(carNames);

    disableCarNamesForm();
    showTrialCountForm();
    focusTrialCountInput();
  } catch (err) {
    if (err instanceof ValidationError) {
      alert(err.message);
    }
    console.error(err.message);
  }
};

export const handleSubmitTrialCount = (e) => {
  e.preventDefault();
  try {
    const trialCount = e.target.elements[0].valueAsNumber;

    validateTrialCount(trialCount);

    gameSetting.setTrialCount(trialCount);

    disableTrialCountForm();

    startGame();
  } catch (err) {
    if (err instanceof ValidationError) {
      alert(err.message);
    }
    console.error(err.stack);
  }
};

export const handleRestartGame = () => {
  resetCarNamesForm();
  enableCarNamesForm();

  resetTrialCountForm();
  enableTrialCountForm();
  hideTrialCountForm();

  hideGamePlay();
  hideGameResult();
};
