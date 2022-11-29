export const CAR_NAME_MAX_LENGTH = 5;
export const CAR_NAME_SEPARATOR = ',';

export const carName = {
  MIN: 1,
  MAX: 5
};

export const carRacing = {
  MIN: 1
};

export const errorMessages = {
  INVALID_CAR_NAMES:
    `유효하지 않은 이름 길이입니다. 자동차의 이름은 ${carName.MIN}자이상, ${carName.MAX}자 이하만 가능합니다.`,
  INVALID_ATTEMPT:
    `입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 ${carRacing.MIN}이상이어야 합니다.`,
};

export const attempts = {
  RIGHT: 7,
  WRONG: 0
};

export const game = {
  MAX_SCORE: 9,
  MIN_SCORE: 0,
  THRESHOLD_SCORE: 4,
};