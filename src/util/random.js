import { SYSTEM } from "../constants/error.js";
import { NINE, ZERO } from "../constants/number.js";

export const generateRandomNumber = (min = ZERO, max = NINE) => {
  if (min > max) throw new Error(SYSTEM.MIN_IS_GREATER_THAN_MAX);
  return Math.random() * (max - min) + min;
};
