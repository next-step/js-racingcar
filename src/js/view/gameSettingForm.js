import { SELECTOR } from '../constants/selector.js';

import { $ } from '../utils/dom.js';

export const focusCarNamesInput = () => {
  $(SELECTOR.CAR_NAMES_INPUT).focus();
};

export const disableCarNamesForm = () => {
  $(SELECTOR.CAR_NAMES_INPUT).disabled = true;
  $(SELECTOR.CAR_NAMES_BTN).disabled = true;
};

export const enableCarNamesForm = () => {
  $(SELECTOR.CAR_NAMES_INPUT).disabled = false;
  $(SELECTOR.CAR_NAMES_BTN).disabled = false;
};

export const resetCarNamesForm = () => {
  $(SELECTOR.CAR_NAMES_FORM).reset();
};

export const showTrialCountForm = () => {
  $(SELECTOR.TRIAL_COUNT_FORM).classList.remove('display-none');
};

export const hideTrialCountForm = () => {
  $(SELECTOR.TRIAL_COUNT_FORM).classList.add('display-none');
};

export const focusTrialCountInput = () => {
  $(SELECTOR.TRIAL_COUNT_INPUT).focus();
};

export const disableTrialCountForm = () => {
  $(SELECTOR.TRIAL_COUNT_INPUT).disabled = true;
  $(SELECTOR.TRIAL_COUNT_BTN).disabled = true;
};

export const enableTrialCountForm = () => {
  $(SELECTOR.TRIAL_COUNT_INPUT).disabled = false;
  $(SELECTOR.TRIAL_COUNT_BTN).disabled = false;
};

export const resetTrialCountForm = () => {
  $(SELECTOR.TRIAL_COUNT_FORM).reset();
};
