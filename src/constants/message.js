const READ = Object.freeze({
  CAR_NAME: '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
});

const ERROR = Object.freeze({
  LENGTH_OVERFLOW: (maxLength) => `자동차 이름은 ${maxLength}까지 가능합니다.`,
});

export const MESSAGE = Object.freeze({ READ, ERROR });
