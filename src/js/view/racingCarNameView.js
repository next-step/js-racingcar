import cars from '../model/Cars.js';
import { $, $$ } from '../utils/selector.js';
import { focusNameInput, toggleDisabledName } from './main.js';

const TRIM_BETWEEN_COMMA = /\s*,\s*/g;
const COMMA = ',';

const trimNameList = value => value.replace(TRIM_BETWEEN_COMMA, COMMA).trim();
const splitNameList = name => name.split(COMMA);

export const processNameList = carNames => {
  const trimmedNames = trimNameList(carNames);
  return splitNameList(trimmedNames);
};

export const showTrialForm = () => {
  $('.trial-form').classList.remove('hide');
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
