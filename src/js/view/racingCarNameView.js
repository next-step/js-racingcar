import cars from '../model/Cars.js';
import { $ } from '../utils/selector.js';
import { focusNameInput, toggleDisabledName } from './main.js';

const TRIM_BETWEEN_COMMA = /\s*,\s*/g;
const CAR_NAME_SEPARATOR = ',';

export const processNameList = carNames =>
  carNames.split(CAR_NAME_SEPARATOR).map(name => name.trim());

export const showTrialForm = () => {
  $('.trial-form').classList.remove('hide');
};

export const submitNames = carNames => {
  try {
    cars.setCarNames(carNames);
    toggleDisabledName();
    showTrialForm();
  } catch (e) {
    alert(e.message);
    focusNameInput();
  }
};
