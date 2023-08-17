import { ERROR_RANDOM_NUMBER } from "../contants/messages";

export function generateRandomNumber(min, max) {
  if (min >= max) {
    throw new Error(ERROR_RANDOM_NUMBER.MIN_LESS_THAN_MAX);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
