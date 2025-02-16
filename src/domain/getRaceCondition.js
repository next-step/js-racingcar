import { getRandomNumber } from "../getRandomNumber.js";

const MIN_VALUE = 4;
const MIN_RANGE = 0;
const MAX_RANGE = 9;

export function getRaceCondition() {
  return getRandomNumber(MIN_RANGE, MAX_RANGE) >= MIN_VALUE;
}
