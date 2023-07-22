const { MAX_USER, MIN_USER, SKID_MARK, MIN_NAME_LENGTH, MAX_NAME_LENGTH } = require('./racing-rule');

const MESSAGES = Object.freeze({
  REQUEST: {
    ENTER_THE_CARS: '경주할 자동차 이름을 입력하세요 (이름은 쉼표(,)를 기준으로 구분).',
  },

  GAME: {
    carsDistance: (name, distance) => `${name} : ${SKID_MARK.repeat(distance)}`,
  },

  COMMON: {
    RESULT: '실행 결과',
  },

  RESULT: {
    winners: (...names) => `${names.join(', ')}가 최종 우승했습니다.`,
  },

  ERROR: {
    LESS_THAN_MIN_NAME_LENGTH: `${MIN_NAME_LENGTH}자 미만인 이름이 존재합니다!`,
    MORE_THAN_MAX_NAME_LENGTH: `${MAX_NAME_LENGTH}자를 초과한 이름이 존재합니다!`,

    LESS_THAN_MIN_USER: `${MIN_USER}명 이상의 이름을 입력해주세요!`,
    MORE_THAN_MAX_USER: `${MAX_USER}명 이하의 이름을 입력해주세요!`,

    HAS_DUPLICATED_NAME: '중복된 이름이 존재합니다!',
  },
});

module.exports = {
  MESSAGES,
};
