export const MAX_NAME_DIGITS = 5;

export const MAX_GAME_TRY_COUNT = 100;

export const ERROR_MESSAGE = {
  REQUIRED_NAME: '자동차 이름을 입력해주세요!',
  MUST_LESS_THAN: `자동차 이름은 ${MAX_NAME_DIGITS}자 이하여야만 해요!`,
  NOT_ACCEPT_DUPLICATED: '자동차 이름은 중복될 수 없어요!',
  REQUIRED_DIGIT: '숫자를 입력해주세요!',
  MUST_MORE_THAN_ONE: '시도 횟수는 0보다 커야 해요!',
  MUST_LESS_THAN_MAX_GAME_TRY_COUNT: `시도 횟수는 ${MAX_GAME_TRY_COUNT}보다 낮아야 해요!`,
};
