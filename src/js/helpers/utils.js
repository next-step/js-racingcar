import { DICE_RANGE, ERROR_MESSAGE } from '../constants.js';

// prettier-ignore
export const pipe = (...fns) => value => fns.reduce((_value, fn) => fn(_value), value);

export const trim = value => {
  if (typeof value !== 'string') throw new ReferenceError(ERROR_MESSAGE.INVALID_TYPE);

  return value.trim();
};

export const trimComma = value => {
  if (typeof value !== 'string') throw new ReferenceError(ERROR_MESSAGE.INVALID_TYPE);

  let parsed = value.startsWith(',') ? value.slice(1) : value;
  return parsed.endsWith(',') ? parsed.slice(0, -1) : parsed;
};

export const split = (target, separator = ',') => {
  if (typeof target !== 'string') throw new ReferenceError(`${ERROR_MESSAGE.INVALID_TYPE}?????`);
  return target.split(separator);
};

export const removeSpace = targetArray => {
  if (!(targetArray instanceof Array)) throw new ReferenceError(ERROR_MESSAGE.INVALID_TYPE);
  return targetArray.map(element => element.replace(/\s/gi, ''));
};

export const generateRandomNumbers = ({
  count: length,
  min = DICE_RANGE.MIN,
  max = DICE_RANGE.MAX,
}) => {
  if (typeof length !== 'number' || typeof min !== 'number' || typeof max !== 'number')
    throw new ReferenceError(ERROR_MESSAGE.INVALID_TYPE);

  return Array.from({ length }).map(() => Math.floor(Math.random() * max) + min);
};

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const delayLoop = ({
  limit = 1,
  delayMs = 1000,
  func = console.log,
  callback = console.log,
  params = {},
}) => {
  return async () => {
    console.log(`%cdelayLoop: %cstart`, 'color: gray', 'color: #0031d1; font-weight: bold');
    for (let index = 0; index < limit; index++) {
      await delay(delayMs);
      func(params);
    }
    console.log(`%cdelayLoop: %cend`, 'color: gray', 'color: #2ca9e8; font-weight: bold');
    callback(params);
  };
};
