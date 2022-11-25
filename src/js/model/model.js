import { TRIM_BETWEEN_COMMA } from '../utils/constants.js';

const state = {
  names: [],
};

export const getState = () => state;
export const setName = newName => state.names.push(newName);
export const trimInput = value => value.replace(TRIM_BETWEEN_COMMA, ',');
export const splitName = name => name.split(',');
