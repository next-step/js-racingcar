/**
 * 전진 조건.
 * 해당 값 이상이면 전진할 수 있음.
 */
export const MOVE_FORWARD_THRESHOLD = 4;

export const NAME_LENGTH = {
  MIN: 1,
  MAX: 5,
};

export const NAME_ERROR_MESSAGE = {
  LESS_THAN_MIN: `자동차 이름은 최소 ${NAME_LENGTH.MIN}글자 이상 입니다.`,
  OVER_THAN_MAX: `자동차 이름은 최대 ${NAME_LENGTH.MAX}글자 입니다.`,
};
