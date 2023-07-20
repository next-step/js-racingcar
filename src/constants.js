const MAX_RANDOM_NUMBER = 9;
const MIN_RANDOM_NUMBER = 0;
const MOVE_STANDARD = 4;

const MAX_NAME_LENGTH = 5;

const DEFAULT_RACING_ROUND = 5;

const MESSAGES = Object.freeze({
  carsDistance: (name, distance) => `${name} : ${'-'.repeat(distance)}`,
  winners: (...names) => `${names.join(', ')}가 최종 우승했습니다.`,
  ENTER_THE_CARS: '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).',
  START: '실행 결과',
  ERROR: {
    OVER_MAX_LENGTH: '5자를 초과한 이름이 존재합니다!',
    EXIST_NAME: '중복된 이름이 존재합니다!',
    INVALID_NAMES: '유효하지 않은 입력값입니다!',
  },
});

exports.DEFAULT_RACING_ROUND = DEFAULT_RACING_ROUND;
exports.MESSAGES = MESSAGES;
exports.MAX_RANDOM_NUMBER = MAX_RANDOM_NUMBER;
exports.MIN_RANDOM_NUMBER = MIN_RANDOM_NUMBER;
exports.MOVE_STANDARD = MOVE_STANDARD;
exports.MAX_NAME_LENGTH = MAX_NAME_LENGTH;
