const READ = Object.freeze({
  CAR_NAME: '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
  TOTAL_ROUND: '시도할 회수는 몇회인가요?',
});

const RACING_GAME = Object.freeze({
  GAME_RESULT: (gameProgress, winners) =>
    `${gameProgress}${winners.join(',')}가 최종 우승했습니다.`,
});

const ERROR = Object.freeze({
  LENGTH_OVERFLOW: (maxLength) =>
    `자동차 이름은 ${maxLength}자리까지 가능합니다.`,
  INVALID_TYPE: (type) => `${type}만 입력이 가능합니다.`,
  DUPLICATED_CAR_NAME: '동일한 이름의 차량은 생성할 수 없습니다.',
  INVALID_TOTAL_ROUND: '1 이상의 숫자',
});

const ADD_NEW_LINE = (message) => `${message}\n`;
const NEW_LINE = '\n';

export const MESSAGE = Object.freeze({
  READ,
  ERROR,
  ADD_NEW_LINE,
  NEW_LINE,
  RACING_GAME,
});
