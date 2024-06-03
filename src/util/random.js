import { NINE, ZERO } from "../constants/number.js";

export const generateRandomNumber = () => {
  return Math.random() * (NINE - ZERO) + ZERO;
};
