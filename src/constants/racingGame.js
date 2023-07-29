const CARS = Object.freeze({
  DEFAULT_STATE: [],
  MOVEMENT_THRESHOLD: 4,
  MAX_NAME_LENGTH: 5,
  DEFAULT_DISTANCE: 0,
});

const TOTAL_ROUND = Object.freeze({
  VALID_PATTERN: /^[1-9][0-9]*$/,
  VALID_TYPE: '1 이상의 숫자',
});

export const RACING_GAME = Object.freeze({
  PROGRESS_TITLE: '\n실행 결과\n',
  GAME_RESULT: (gameProgress, winners) =>
    `${gameProgress}${winners.join(',')}가 최종 우승했습니다.`,
  CARS,
  TOTAL_ROUND,
});
