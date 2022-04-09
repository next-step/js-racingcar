export const DOM = Object.freeze({
  RACING_CAR_GAME_APP_ID: 'app',
  CAR_NAMES_FORM: 'car-names-form',
  CAR_NAMES_INPUT_ID: 'car-names-input',
  CAR_NAMES_SUBMIT_BUTTON_ID: 'car-names-submit-button',
  TRY_COUNT_FORM_ID: 'try-count-form',
  TRY_COUNT_INPUT_ID: 'try-count-input',
  TRY_COUNT_SUBMIT_BUTTON_ID: 'try-count-submit-button',
  GAME_PROCESS_BOARD_ID: 'game-process-board',
  GAME_END_SECTION_ID: 'game-end-section',
  GAME_WINNERS_TEXT_ID: 'game-winners-text',
  GAME_RESTART_BUTTON_ID: 'game-restart-button',
  CAR_FORWARD_ICON_CLASS: 'forward-icon',
});

export const ERROR_MESSAGE = Object.freeze({
  CAR_NAMES_REQUIRED: '자동차 이름을 입력해주세요.',
  TRY_COUNT_REQUIRED: '시도 횟수를 입력해주세요',
  INVALID_CAR_NAMES: '자동차 이름은 5글자 이하여야 합니다.',
  INVALID_TRY_COUNT: '시도 횟수는 0보다 커야합니다.',
});

export const GAME = Object.freeze({
  ADVANCE: 'advance',
  STOP: 'stop',
  CAR_NAME_SPLITTER: ',',
  CAR_NAME_MAX_LIMIT_LENGTH: 5,
  TRY_COUNT_MIN_LIMIT: 0,
  CAR_FORWARD_STANDARD: 4,
  CAR_FORWARD_MIN_CONDITION: 0,
  CAR_FORWARD_MAX_CONDITION: 9,
});
