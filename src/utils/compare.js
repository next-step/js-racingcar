import { ERROR_COMPARE } from "../contants/messages";

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
      throw new Error(ERROR_COMPARE.COMPARISON_OPERATOR);
  }
}
