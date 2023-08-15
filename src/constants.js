export const MOVE_DISTANCE = 1;
export const MOVE_CONDITION = 4;
export const MIN_LENGTH = 1;
export const MAX_LENGTH = 5;
export const MAX_NUM = 9;
export const MIN_NUM = 0;
export const NOT_ALLOW_CHARACTER = ",";

export const NAME_ERROR_MESSAGE = {
  NOT_STRING: "name should be string",
  NOT_IN_RANGE: `name should be ${MIN_LENGTH} or more and ${MAX_LENGTH} or less`,
  NOT_ALLOW_CHARACTER: `name should not include ${NOT_ALLOW_CHARACTER}`,
};

export const NUM_ERROR_MESSAGE = {
  NOT_NUMBER: "num should be number",
  NOT_IN_RANGE: `num should be ${MIN_NUM} or more and ${MAX_NUM} or less`,
};
