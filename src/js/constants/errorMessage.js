import { CONDITION } from './condition.js';

export const ERROR_MESSAGE = {
  INVALID_CAR_NAMES_LENGTH: `유효하지 않은 이름 길이입니다.\n자동차 이름은 쉼표(,)를 기준으로 ${CONDITION.MIN_CAR_NAME_LENGTH}자 이상 ${CONDITION.MAX_CAR_NAME_LENGTH}자 이하로 입력해주세요.`,
  DUPLICATED_CAR_NAME: `중복된 이름이 존재합니다.\n자동차 이름을 중복되지 않도록 입력해주세요.`,

  INVALID_TRIAL_COUNT: `유효하지 않은 시도 횟수입니다.\n시도 횟수는 ${CONDITION.MIN_TRIAL_COUNT}이상 입력해주세요.`,
};
