import { CAR_NAME, MIN_RACE_TIMES } from './validation.js';

export const ALERT_MESSAGES = {
  INVALID_CAR_NAMES: `유효하지 않은 이름 길이입니다. 자동차의 이름은 ${CAR_NAME.MIN_LENGTH}자이상, ${CAR_NAME.MAX_LENGTH}자 이하만 가능합니다.`,
  INVALID_RACE_TIEMS: `입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 ${MIN_RACE_TIMES}이상이어야 합니다.`,
};
