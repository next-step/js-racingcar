const NAME = {
  MAX_LENGTH: 5,
  MIN_LENGTH: 0,
};

const RACE_COUNT = {
  MAX: 10000,
  MIN: 0,
};

const RACE_STATUS = {
  LOADING: 0,
  GO: 1,
  STOP: 2,
};

export const CAR = {
  NAME,
  RACE_COUNT,
  SEPARATOR: ',',
  RACE_STATUS,
};

export const DICE = {
  TOTAL: 9,
  SEPARATOR_NUMBER: 4,
};

export const ERROR_MESSAGE = {
  INVALIDATE_CAR_NAME: '자동차 이름은 5자 이하만 입력 가능합니다.',
  INVALIDATE_CAR_RACE_COUNT: '시도할 횟수는 0이상 입력 가능합니다.',
};
