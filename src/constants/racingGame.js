export const RACER = Object.freeze({
  MOVEMENT_THRESHOLD: 4,
  MAX_NAME_LENGTH: 5,
  DEFAULT_DISTANCE: 0,
});

export const REGEX = Object.freeze({
  TOTAL_ROUND: /^[1-9][0-9]*$/,
});

export const RACING_GAME = Object.freeze({
  PROGRESS_TITLE: '\n실행 결과\n',
  RACER,
  REGEX,
});
