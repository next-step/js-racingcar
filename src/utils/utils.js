import Game from "../Models/Game";

export function getRandomIntRangeOf(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomNumber() {
  return getRandomIntRangeOf(
    Game.RANDOM_NUM_LOWER_LIMIT,
    Game.RANDOM_NUM_UPPER_LIMIT
  );
}
