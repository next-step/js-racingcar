export const CONTROLL_KEY = {
  CAR_NAMES: 'car-names',
  CAR_NAMES_AFTER: 'car-names-after',
  TRY_COUNT_AFTER: 'try-count',
  GAME_BEFORE: 'game-before',
  GAME: 'game',
};

export const MAX_NAME_DIGITS = 5;
export const MAX_GAME_TRY_COUNT = 100;

export const MOVE_CONDITION = 4;
export const MOVE_DECIDE_DELAY = 1000;

export const DICE_RANGE = {
  MIN: 1,
  MAX: 9,
};

export const ERROR_MESSAGE = {
  INVALID_TYPE: '옳지 못한 타입입니다.',
  NOT_EXISTS_KEY: '등록되지 않은 상태 키입니다.',
  MUST_LESS_THAN: `자동차 이름은 ${MAX_NAME_DIGITS}자 이하여야만 해요!`,
  NOT_ACCEPT_DUPLICATED: '자동차 이름은 중복될 수 없어요!',
};
