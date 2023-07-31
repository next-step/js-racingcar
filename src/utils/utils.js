import {
  RANDOM_NUM_LOWER_LIMIT,
  RANDOM_NUM_UPPER_LIMIT,
} from "../constants/gameController";

/**
 * getRandomIntRangeOf - Returns a random integer between min (inclusive) and max (inclusive).
 * @param {Number} min
 * @param {Number} max
 * @returns Number
 */
export function getRandomIntRangeOf(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * getRandomNumber - Returns a random integer between game setting lower limit (inclusive) and game setting upper limit (inclusive).
 * @returns Number
 */
export function getRandomNumber() {
  return getRandomIntRangeOf(RANDOM_NUM_LOWER_LIMIT, RANDOM_NUM_UPPER_LIMIT);
}
