const COMPETITION_COUNT = {
  MIN: 1,
};

const CAR_TEXT_LENGTH = {
  MIN: 1,
  MAX: 5,
};

const CAR_FORWARD_CONDITION = {
  MIN: 0,
  MAX: 9,
  FORWARD: 4,
};

const ALERT_TEXT = {
  CAR_VALIDATION_ERROR: `유효하지 않은 이름 길이입니다. 자동차의 이름은 ${CAR_TEXT_LENGTH.MIN}자이상, ${CAR_TEXT_LENGTH.MAX}자 이하만 가능합니다.`,

  COMPETITION_COUNT_ERROR: `입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 ${COMPETITION_COUNT.MIN}이상이어야 합니다.`,
};

export {
  ALERT_TEXT,
  CAR_TEXT_LENGTH,
  COMPETITION_COUNT,
  CAR_FORWARD_CONDITION,
};
