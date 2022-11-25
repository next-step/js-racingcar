import { TRIM_BETWEEN_COMMA } from '../utils/constants.js';

const state = {
  names: [],
  trialCount: 0,
};

export const getState = () => state;
export const setName = newName => {
  state.names.push(newName);
};
export const setTrialCount = newTrialCount => {
  state.trialCount = newTrialCount;
};

export const trimInput = value => value.replace(TRIM_BETWEEN_COMMA, ',').trim();
export const splitName = name => name.split(',');
