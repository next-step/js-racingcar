export const RACING_GAME = Object.freeze({
  TOTAL_ROUNDS: 5,
  MOVEMENT_THRESHOLD: 4,
  DISTANCE_UNIT: 1,
  PROGRESS_TITLE: '\n실행 결과\n',
  GAME_RESULT: (gameProgress, winners) =>
    gameProgress + `${winners.join(',')}가 최종 우승했습니다.`,
});
