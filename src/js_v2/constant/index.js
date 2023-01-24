export const GAME = {
  MAX_SCORE: 9,
  MIN_SCORE: 0,
  THRESHOLD_SCORE: 4,
};

export const ATTEMPTS_WRONG = 0;

export const CAR_NAME_LENGTH = {
  MIN: 1,
  MAX: 5
};

export const ERROR_MESSAGE = {
  INVALID_CAR_NAMES:
    `유효하지 않은 이름 길이입니다. 자동차의 이름은 ${CAR_NAME_LENGTH.MIN}자이상, ${CAR_NAME_LENGTH.MAX}자 이하만 가능합니다.`,
  INVALID_ATTEMPT:
    `입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 ${ATTEMPTS_WRONG + 1}이상이어야 합니다.`,
};