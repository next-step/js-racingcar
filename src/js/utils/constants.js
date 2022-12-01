export const TRIM_BETWEEN_COMMA = /\s*,\s*/g;

export const NAME_LENGTH_MIN = 1;
export const NAME_LENGTH_MAX = 5;
export const TRIAL_COUNT_MIN = 1;

export const GENERATION_MIN = 0;
export const GENERATION_MAX = 9;

export const GO_OR_STOP_STANDARD = 3;
// 중복 validate ㄱㄱㄱ
export const ERROR_MESSAGES = {
  NAME_OUT_OF_RANGE: `유효하지 않은 이름 길이입니다. 자동차의 이름은 ${NAME_LENGTH_MIN}자이상, ${NAME_LENGTH_MAX}자 이하만 가능합니다.`,
  INVALID_TRIAL_COUNT: `입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 ${TRIAL_COUNT_MIN}이상이어야 합니다.`,
};
