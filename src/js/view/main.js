import { $ } from '../utils/selector.js';

export const getTrialInputValue = () => Number($('.trial-input').value);
export const getNameInputValue = () => $('.car-name-input').value;

export const showTrialForm = () => {
  $('.set-trial-container').classList.remove('hide');
};

export const focusNameInput = () => {
  $('.car-name-input').focus();
};

export const disabledNameInput = () => {
  $('.car-name-input').disabled = true;
};

export const focusTrialInput = () => {
  $('.trial-input').focus();
};

export const disabledTrialInput = () => {
  $('.trial-input').disabled = true;
};
