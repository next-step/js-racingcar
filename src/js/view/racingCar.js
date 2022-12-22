import {
  toggleDisabledName,
  showTrialForm,
  focusNameInput,
  updateDistance,
  showDistance,
  toggleDisabledTrial,
  addLoadingHTML,
  resetTrialForm,
  hideDistance,
  hideWinner,
  renderProcess,
  hideTrialForm,
  timeoutSetting,
  updateWinner,
  resetNameForm,
  focusTrialInput,
} from './main.js';
import cars from '../model/Cars.js';

const TRIM_BETWEEN_COMMA = /\s*,\s*/g;
const COMMA = ',';

const trimNameList = value => value.replace(TRIM_BETWEEN_COMMA, COMMA).trim();
const splitNameList = name => name.split(COMMA);

export const processNameList = carNames => {
  const trimmedNames = trimNameList(carNames);
  return splitNameList(trimmedNames);
};

export const submitNames = carNameList => {
  try {
    cars.setCarNames(carNameList);
    toggleDisabledName();
    showTrialForm();
  } catch (e) {
    alert(e.message);
    focusNameInput();
  }
};

export const submitTrialCount = trialCount => {
  try {
    cars.setTrialCount(trialCount);
    toggleDisabledTrial();
  } catch (e) {
    alert(e.message);
    focusTrialInput();
  }
};

export const generateGame = () => {
  try {
    cars.generateGame();
    updateDistance(cars.result);
    showDistance();
    addLoadingHTML();
    const interval = renderProcess(cars.carList);
    timeoutSetting(interval, cars.trialCount);
    updateWinner(cars.winners);
  } catch (e) {
    alert(e.message);
    focusTrialInput();
  }
};

export const resetName = () => {
  resetNameForm();
  toggleDisabledName();
	focusNameInput();
};

export const resetTrial = () => {
  resetTrialForm();
  toggleDisabledTrial();
  hideTrialForm();
};

export const resetResult = () => {
  updateDistance([]);
  hideDistance();
  updateWinner([]);
  hideWinner();
};
