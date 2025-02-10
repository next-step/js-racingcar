/**
 * 현재 바퀴 수가 끝났다는 안내
 */
export const renderCurrentLapEnd = () => {
  console.log('');
};

/**
 * 게임의 결과를 안내
 */
export const renderGameResult = () => {
  console.log('');
  console.log('실행 결과');
};

/**
 * 게임이 끝났다는 걸 안내
 */
export const renderGameEnd = (winners) => {
  console.log(`${winners}가 최종 우승했습니다.`);
};

/**
 * 자동차 움직임 궤도를 그리는 함수
 *
 * @param {number} location 위치 값
 * @returns 움직인 궤도
 */
export const renderCarMovementLine = (location) => {
  return Array.from({ length: location }, () => '-').join('');
};

/**
 * 해당 바퀴 떄, 자동차가 얼만큼 달리고 있는지 안내
 *
 * @param {string} name 자동차 이름
 * @param {number} location 자동차의 자동차 위치
 */
export const renderCarMovementInfo = (name, location) => {
  const movedTrack = renderCarMovementLine(location);

  console.log(`${name} : ${movedTrack}`);
};
