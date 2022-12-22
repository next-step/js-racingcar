import cars from '../model/Cars.js';
import {
  submitNames,
  processNameList,
  generateGame,
  submitTrialCount,
  resetResult,
  resetTrial,
  resetName,
} from '../view/racingCar.js';

export const handleSubmitName = event => {
  event.preventDefault();
  const { value: carNames } = event.target.elements['car-name'];

  submitNames(processNameList(carNames));
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
