// html divided into 4 sections
export const SELECTORS = {
  // input section
  CAR_NAME_FORM: "#car-name__form",
  CAR_NAME_FIELDSET: "#car-name",
  CAR_NAME_INPUT: "#car-name__input",
  TRIAL_NUM_FORM: "#trial-num__form",
  TRIAL_NUM_FIELDSET: "#trial-num",
  TRIAL_NUM_INPUT: "#trial-num__input",

  // game section
  GAME_SECTION: "#game",
  CAR_PLAYER_WRAPPER_DIV: ".car-player__wrapper",
  CAR_DIV: ".car",
  CAR_DIV_NAME: ".car-player",
  CAR_DIV_SPINNER: ".spinners",

  // result section
  RESULT_SECTION: "#result",
};

export const ERROR_MESSAGES = {
  WORD_LENGTH_ERROR: "자동차의 이름은 1자이상, 5자 이하로 입력해 주세요.",
  NUM_RANGE_ERROR: "시도 횟수는 1~10사이의 숫자를 입력해 주세요.",
};
