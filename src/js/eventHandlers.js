import {
  validateCarNamesLength,
  validateDuplicatedCarName,
  validateTrialCount,
} from './utils/validator.js';

import {
  disableCarNamesForm,
  showTrialCountForm,
  disableTrialCountForm,
} from './view/racingCar.js';

export const handleCarNames = (e) => {
  e.preventDefault();
  try {
    const $carNames = e.target.elements[0];
    const carNames = $carNames.value.split(',').map((name) => name.trim());

    validateCarNamesLength(carNames);
    validateDuplicatedCarName(carNames);

    disableCarNamesForm();
    showTrialCountForm();
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

    disableTrialCountForm();
  } catch (err) {
    alert(err.message);
    console.error(err.message);
  }
};
