import { alertIfError } from '../view/main.js';

const sliceBegin = 8;
const sliceEnd = -1;

export const catchMessage = message => alertIfError(message);

export const getType = target => Object.prototype.toString.call(target).slice(sliceBegin, sliceEnd);
