export const CAR_NAME_DIVIDER = ',';
export const CAR_NAME_REGEXP = new RegExp(`^[a-zA-Zㄱ-하-ㅣ가-힣${CAR_NAME_DIVIDER} ]+$`, 'g');
export const CAR_NAME_MAX_LENGTH = 5;
export const CAR_ADVANCE_CONDITION_NUMBER = 4;
export const CAR_NAMES_MIN_LENGTH = 2;

export const MESSAGES = Object.freeze({
  CAR_NAME_EMPTY: '자동차 이름을 입력해주세요.',
  CAR_NAME_NOT_MATCH_REGEXP: '자동차 이름은 영문, 한글, 쉼표만 입력할 수 있습니다',
  CAR_NAME_LENGTH_OVER: `자동차 이름은 쉼표를 기준으로 ${CAR_NAME_MAX_LENGTH}자 이하만 가능합니다.`,
  CAR_NAMES_LENGTH_UNDER: `자동차 이름은 ${CAR_NAMES_MIN_LENGTH}개 이상 입력해주세요.`,
  RACE_LAP_EMPTY: '시도할 횟수를 입력해주세요.',
});

export const SELECTORS = Object.freeze({
  APP: '#app',
  FORM: '#form',
  CAR_NAME_INPUT: '#car-name-input',
  CAR_NAME_SUBMIT_BUTTON: '#car-name-submit-button',
  RACE_LAP_INPUT: '#race-lap-input',
  RACE_LAP_SUBMIT_BUTTON: '#race-lap-submit-button',
  RACE_TRACK: '#race-track',
  FORWARD_ICON: '.forward-icon',
  SPINNER: '.spinner-container',
});
