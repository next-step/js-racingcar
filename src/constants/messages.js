const {
  MAX_USER_COUNT,
  MIN_USER_COUNT,
  SKID_MARK,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_ROUND_COUNT,
  MAX_ROUND_COUNT,
  SPLIT_STANDARD,
  SPLIT_STANDARD_KOR,
} = require('./racing-rule');

const MESSAGES = Object.freeze({
  REQUEST: {
    ENTER_THE_CARS: `경주할 자동차 이름을 입력하세요 (이름은 ${SPLIT_STANDARD_KOR}(${SPLIT_STANDARD})를 기준으로 구분).`,
    ENTER_THE_ROUND: '시도할 회수는 몇회인가요?',
  },

  GAME: {
    carsDistance: ({ name, distance }) => `${name} : ${SKID_MARK.repeat(distance)}`,
  },

  COMMON: {
    OUTCOME: '실행 결과',
  },

  RESULT: {
    winners: (...names) => `${names.join(', ')}가 최종 우승했습니다.`,
  },
});

const ERROR_MESSAGES = Object.freeze({
  LESS_THAN_MIN_NAME_LENGTH: `${MIN_NAME_LENGTH}자 미만인 이름이 존재합니다!`,
  MORE_THAN_MAX_NAME_LENGTH: `${MAX_NAME_LENGTH}자를 초과한 이름이 존재합니다!`,

  LESS_THAN_MIN_USER_COUNT: `${MIN_USER_COUNT}명 이상의 이름을 입력해주세요!`,
  MORE_THAN_MAX_USER_COUNT: `${MAX_USER_COUNT}명 이하의 이름을 입력해주세요!`,

  LESS_THAN_MIN_ROUND_COUNT: `${MIN_ROUND_COUNT}회를 넘는 라운드 수를 입력해주세요!`,
  MORE_THAN_MAX_ROUND_COUNT: `${MAX_ROUND_COUNT}회 미만 라운드 수를 입력해주세요!`,

  HAS_DUPLICATED_NAME: '중복된 이름이 존재합니다!',
});

module.exports = {
  MESSAGES,
  ERROR_MESSAGES,
};
