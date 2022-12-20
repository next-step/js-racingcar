import {
  showTrialForm,
  focusNameInput,
  focusTrialInput,
  updateResult,
  updateWinner,
  showWinner,
  showResult,
  toggleDisabledName,
  toggleDisabledTrial,
  resetResult,
  resetTrial,
  resetName,
} from '../view/main.js';
import cars from '../model/Cars.js';

const TRIM_BETWEEN_COMMA = /\s*,\s*/g;
const COMMA = ',';

const trimNameList = value => value.replace(TRIM_BETWEEN_COMMA, COMMA).trim();
const splitNameList = name => name.split(COMMA);

export const handleSubmitName = event => {
  event.preventDefault();
  const { value: carNames } = event.target.elements['car-name'];
  const trimmedList = trimNameList(carNames);
  const carNameList = splitNameList(trimmedList);

  try {
    cars.setCarNames(carNameList);
    toggleDisabledName();
    showTrialForm();
  } catch (e) {
    alert(e.message);
    focusNameInput();
  }
};

export const handleSubmitTrialCount = event => {
  event.preventDefault();
  const trialCount = Number(event.target.elements['trial-count'].value);

  try {
    cars.setTrialCount(trialCount);
    toggleDisabledTrial();
    cars.generateGame();
    updateResult(cars.result);
    showResult();
    updateWinner(cars.winners);
    showWinner();
  } catch (e) {
    alert(e.message);
    focusTrialInput();
  }
};

export const handleClickReset = () => {
  cars.resetAll();
  resetName();
  resetTrial();
  resetResult();
  focusNameInput();
};
