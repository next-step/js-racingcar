const DELAY_TIME_MS = 1000;

const ALERT_MESSAGE = {
  INVALID_CAR_NAME_LENGTH: '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.',
  INVALID_RACING_COUNT: '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.',
};

const LENGTH = {
  CAR_NAME_MIN_LENGTH: 0,
  CAR_TRY_VALUE_MIN_LENGTH: 0,
  CAR_NAME_MAX_LENGTH: 5,
};

export { ALERT_MESSAGE, LENGTH, DELAY_TIME_MS };
