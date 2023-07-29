const SETTING = {
  ROUND: 5,
  MAX_NAME_LENGTH: 5,
  MIN_NAME_LENGTH: 1,
};

const MESSAGES = {
  START: '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
  RESULT: '실행 결과',
  FINISH: '가 최종 우승했습니다.',
};

const ERROR = {
  NO_NAME: '이름을 입력해주세요.',
  MAX_NAME: `이름은 ${SETTING.MAX_NAME_LENGTH}자 이하만 가능합니다.`,
  MIN_NAME: `이름은 ${SETTING.MIN_NAME_LENGTH}자 이상만 가능합니다.`,
};

export { MESSAGES, ERROR, SETTING };
