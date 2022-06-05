export const CAR_NAME_MAX_LENGTH = 5;
export const MIN_NUMBER_FOR_MOVING = 4;
export const MOVE_INTERVAL = 1000;
export const MOVEMENT = { MIN: 0, MAX: 9 };

export const ERROR_MESSAGE = {
  NAME_LENGTH: `자동차 이름은 ${CAR_NAME_MAX_LENGTH}자 이하만 가능합니다`,
  NAME_DUPLICATE: "중복된 자동차 이름이 있습니다.",
  NAME_EMPTY: "자동차 이름을 입력해주세요.",
};

export const SELECTOR = {
  APP: "#app",
  NAME_INPUT: "#input-name",
  TRY_INPUT: "#input-try",
  NAME_SUBMIT_BUTTON: "#name-submit-button",
  TRY_SUBMIT_BUTTON: "#try-submit-button",
  CAR_CONTAINER: "#car-container",
  CAR_NAME: ".car-name",
  RACING_FORM: "#racing-form",
};
