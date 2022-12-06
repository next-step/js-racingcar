/* eslint-disable import/prefer-default-export */
import { alertIfError } from '../view/main.js';

export const catchMessage = message => alertIfError(message);

export const getType = target => Object.prototype.toString.call(target).slice(8, -1);
