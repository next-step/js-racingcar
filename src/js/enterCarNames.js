import { ALERT_TEXT, CAR_TEXT_LENGTH } from './constants.js';
import { $ } from './DOM.js';
import getCarNames from './getCarNames.js';
import { alertText, setElementDisabled, setVisible } from './util.js';

const checkCarNamesValidation = () => {
  if (getCarNames().includes('')) {
    return false;
  }

  if (
    getCarNames().filter((name) => name.length > CAR_TEXT_LENGTH.MAX).length !==
    0
  ) {
    return false;
  }

  return true;
};

const setCarNamesFormDisabled = () => {
  setElementDisabled($('.car-name-input'));
  setElementDisabled($('.car-name-enter-button'));
};

const setCompetitionCountFormVisible = () => {
  setVisible($('.competition-count-input-container'));
};

const enterCarNames = () => {
  if (!checkCarNamesValidation()) {
    alertText(ALERT_TEXT.CAR_VALIDATION_ERROR);
    return;
  }
  setCarNamesFormDisabled();
  setCompetitionCountFormVisible();
};

export default enterCarNames;
