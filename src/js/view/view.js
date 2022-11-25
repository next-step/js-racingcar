import { $ } from '../utils/selector.js';

export const showTrialForm = () => $('.set-trial-container').classList.remove('hide');

export const focusInput = () => $('.car-name-input').focus();

export const disableInput = () => {
  $('.car-name-input').disabled = true;
};
