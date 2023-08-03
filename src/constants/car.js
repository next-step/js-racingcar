export const CAR_CONSTRUCTOR_NAME = 'Car'
export const DEFAULT_STEP_SIZE = 1
export const RUN_THRESHOLDS = 4
export const MAX_NAME_LENGTH = 5
export const MIN_NAME_LENGTH = 1

export const CAR_ERROR_MESSAGE = {
  OVER_NAME_MAX_LENGTH: maxNum =>
    `자동차의 이름은 ${maxNum}자 이하의 문자열만 가능합니다!`,
  UNDER_NAME_MIN_LENGTH: minNum =>
    `자동차의 이름은 최소 ${minNum}자 이상의 문자열만 가능합니다!`,
  INVALID_NAME_TYPE: '자동차의 이름은 문자열만 가능합니다!',
  INVALID_ON_RUN_TYPE: '자동차의 onRun 메서드는 함수만 가능합니다!'
}
