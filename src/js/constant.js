export const SELECTOR = {
  CAR_NAME_FORM: '.name-form',
  CAR_NAME_INPUT: '.car-name',
  CAR_NAME_BUTTON: '.car-name-submit-btn',

  TRIAL_NUMBER_FORM: '.times-form',
  TRIAL_NUMBER_INPUT: '.trial-number',
  TRIAL_NUMBER_BUTTON: '.trial-number-submit-btn',

  CAR_PLAYER: '.car-player',
  FORWARD_ICON: '.forward-icon',
  SPINNER_ICON: '.spinner',

  RACE_TIMES_SECTION: '.race-times',
  RACE_PROCESS_COMPONENT: '.race-process-component',
  RACE_RESULT_COMPONENT: '.race-result-component',

  SPINNER_WRAPPER: '.spinner-wrapper',
};

export const CAR_SPINNER_ID = (carName) => `#car-${carName}`;

export const CAR_NAME = {
  MIN: 1,
  MAX: 5,
};

export const CAR_RACE = {
  FORWARD: 4,
  MIN: 0,
  MAX: 9,
  COUNT: 1,
  INTERVAL: 1000,
  MIN_TIMES: 1,
};

export const ERROR_MESSAGE = {
  INVALID_CAR_NAME_LENGTH:
    '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.',
  INVALID_TRIAL_NUMBER:
    '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.',
  DUPLICATED_CAR_NAME: '자동차의 이름이 중복되었습니다.',
};

export const WINNER_MESSAGE = '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇';
