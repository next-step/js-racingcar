import { SELECTOR } from '../constants/selector.js';

import { $ } from '../utils/dom.js';

export const focusCarNamesInput = () => {
  $(SELECTOR.CAR_NAMES_INPUT).focus();
};

export const disableCarNamesForm = () => {
  $(SELECTOR.CAR_NAMES_INPUT).disabled = true;
  $(SELECTOR.CAR_NAMES_BTN).disabled = true;
};

export const showTrialCountForm = () => {
  $(SELECTOR.TRIAL_COUNT_FORM).classList.remove('display-none');
};

export const focusTrialCountInput = () => {
  $(SELECTOR.TRIAL_COUNT_INPUT).focus();
};

export const disableTrialCountForm = () => {
  $(SELECTOR.TRIAL_COUNT_INPUT).disabled = true;
  $(SELECTOR.TRIAL_COUNT_BTN).disabled = true;
};
