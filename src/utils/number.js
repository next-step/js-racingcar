import { ERROR_NUMBER } from "../contants/messages";

export function generateRandomNumber(min, max) {
  if (min >= max) {
    throw new Error(ERROR_NUMBER.MIN_LESS_THAN_MAX);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function compareNumber(
  number,
  conditionValue,
  comparisonOperator = ">=",
) {
  switch (comparisonOperator) {
    case ">=":
      return number >= conditionValue;
    case ">":
      return number > conditionValue;
    case "<=":
      return number <= conditionValue;
    case "<":
      return number < conditionValue;
    case "===":
      return number === conditionValue;
    default:
      throw new Error(ERROR_NUMBER.COMPARISON_OPERATOR);
  }
}
