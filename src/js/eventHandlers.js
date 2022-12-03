import gameSetting from './model/GameSetting.js';

import {
  validateCarNamesLength,
  validateDuplicatedCarName,
  validateTrialCount,
} from './service/validator.js';
import { startGame } from './service/game.js';

import {
  disableCarNamesForm,
  showTrialCountForm,
  focusTrialCountInput,
  disableTrialCountForm,
} from './view/racingCar.js';

export const handleCarNames = (e) => {
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
    alert(err.message);
    console.error(err.message);
  }
};

export const handleTrialCount = (e) => {
  e.preventDefault();
  try {
    const trialCount = e.target.elements[0].valueAsNumber;

    validateTrialCount(trialCount);

    gameSetting.setTrialCount(trialCount);

    disableTrialCountForm();

    startGame();
  } catch (err) {
    alert(err.message);
    console.error(err.message);
  }
};
