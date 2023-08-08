export const CAR = {
  DEFAULT_STEP_SIZE: 1,
  RUN_THRESHOLDS: 4,
  MAX_NAME_LENGTH: 5,
  MIN_NAME_LENGTH: 1
}

export const CAR_ERROR_MESSAGE = {
  OVER_NAME_MAX_LENGTH: maxNum =>
    `자동차의 이름은 ${maxNum}자 이하의 문자열만 가능합니다!`,
  UNDER_NAME_MIN_LENGTH: minNum =>
    `자동차의 이름은 최소 ${minNum}자 이상의 문자열만 가능합니다!`,
  INVALID_NAME_TYPE: '자동차의 이름은 문자열만 가능합니다!',
  NOT_ASSIGN_NAME: 'name을 직접 할당할 수 없습니다.',
  NOT_ASSIGN_POSITION: 'position을 직접 할당할 수 없습니다.'
}
