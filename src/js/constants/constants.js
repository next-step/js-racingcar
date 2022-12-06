export const CAR = {
  GO_OR_STOP_STANDARD: 4,
  NAME_MAX_LENGTH: 5,
  MIN_NUMBER_OF_ATTEMPTS: 1,
  NUMBER_OF_ATTEMPTS_ZERO: 0,
};

export const ALERT_MESSAGE = {
  INVALID_INPUT_CAR_NAMES: `유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, ${CAR.NAME_MAX_LENGTH}자 이하만 가능합니다`,
  INVALID_INPUT_NUMBER_OF_ATTEMPTS: `시도횟수는 ${CAR.NUMBER_OF_ATTEMPTS_ZERO} 또는 음수가 불가능합니다. 숫자 ${CAR.MIN_NUMBER_OF_ATTEMPTS}이상 입력해주세요!`,
};
