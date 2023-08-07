import Game from "../Models/Game";

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
  return getRandomIntRangeOf(
    Game.RANDOM_NUM_LOWER_LIMIT,
    Game.RANDOM_NUM_UPPER_LIMIT
  );
}
