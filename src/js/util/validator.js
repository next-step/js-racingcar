import { removeSpaces } from './string.js ';

/**
 * @typedef IsMetNamesLengthArgument
 * @property {string} name
 * @property {?number} minLength
 * @property {?number} maxLength
 */

/**
 * @param {string} names
 * @return {string[]}
 */
export const getCarNamesArray = (names) => {
  return removeSpaces(names).split(',');
};

/**
 *
 * @param {string[]} names
 * @returns {boolean}
 */
export const isEmptyNames = (names) => {
  return names.length !== names.filter((name) => !!name).length;
};

/**
 *
 * @param {IsMetNamesLengthArgument} isMetNamesLengthArgument
 * @returns {boolean}
 */
export const isMetNamesLength = ({ name, minLength, maxLength }) => {
  const { length } = name;
  if (minLength && maxLength) return length >= minLength && length <= maxLength;
  if (minLength) return length >= minLength;
  return length <= maxLength;
};

/**
 *
 * @param {number} minLength
 * @param {number} maxLength
 * @returns {number}
 */
export const generateNumber = (minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
  return Math.floor(Math.random() * (maxLength + 1)) + minLength;
};
