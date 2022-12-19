import { alertIfError } from '../service/alertIfError.js';

const sliceBegin = 8;
const sliceEnd = -1;

export const catchMessage = (type, message) => {
  if (type === 'window') return alertIfError(message);
  return null;
};

export const getType = target => Object.prototype.toString.call(target).slice(sliceBegin, sliceEnd);
