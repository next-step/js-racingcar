const READ = Object.freeze({
  CAR_NAME: '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
  RACE_ROUND: '시도할 회수는 몇회인가요?',
});

const ERROR = Object.freeze({
  LENGTH_OVERFLOW: (maxLength) =>
    `자동차 이름은 ${maxLength}자리까지 가능합니다.`,
});

const ADD_NEW_LINE = (message) => `${message}\n`;
const NEW_LINE = '\n';

export const MESSAGE = Object.freeze({ READ, ERROR, ADD_NEW_LINE, NEW_LINE });
