import cars from '../model/Cars.js';
import { resetResult, resetTrial, resetName } from '../view/main.js';
import { submitNames, processNameList } from '../view/racingCarNameView.js';
import { submitTrialCount } from '../view/trialCountView.js';
import { generateGame } from '../view/racingGameView.js';

export const handleSubmitName = event => {
  event.preventDefault();
  const { value: carNames } = event.target.elements['car-name'];

  const carLists = processNameList(carNames);
  submitNames(carLists);
};

export const handleSubmitTrialCount = event => {
  event.preventDefault();
  const trialCount = Number(event.target.elements['trial-count'].value);

  submitTrialCount(trialCount);
  generateGame();
};

export const handleClickReset = () => {
  cars.resetAll();
  resetName();
  resetTrial();
  resetResult();
};
