const ERROR_MESSAGE = Object.freeze({
  NAME_LENGTH: "각 이름은 1글자 이상, 5글자 이하여야 합니다.",
  RACING_TIMES: "1 이상의 숫자를 입력하셔야 합니다.",
});

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 5;

const RACE_MOVE_PIVOT = 4;
const RANDOM_MIN = 0;
const RANDOM_MAX = 9;

export {
  ERROR_MESSAGE,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  RACE_MOVE_PIVOT,
  RANDOM_MIN,
  RANDOM_MAX,
};
